import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { Agreement } from "../../Agreement/model/AgreementModel";
import { NotificationTypes } from "../../Notifications/controller/NotificationController";
import NotificationsRepo from "../../Notifications/repository/NotificationsRepo";
import { CreateAgreementStatusData, GetAgreementStatusData } from "../controller/AgreementStatusController";
import { AgreementStatus } from "../model/AgreementStatusModel";

interface IAgreementStatusRepo {
  create(data: CreateAgreementStatusData): Promise<void>;
  getAllStatus(data: GetAgreementStatusData): Promise<AgreementStatus[]>;
}

class AgreementStatusRepo implements IAgreementStatusRepo {
  async create(data: CreateAgreementStatusData): Promise<void> {
    try {
      const agreementStatus: AgreementStatus = new AgreementStatus();

      agreementStatus.agreementId = data.agreementId;
      agreementStatus.status = data.status;

      await agreementStatus.save();

      const agreement: Agreement | null = await Agreement.findOne({ where: { id: agreementStatus.agreementId } });

      if (agreement) {
        NotificationsRepo.createNotification({
          userId: agreement.referralSenderId,
          type: NotificationTypes.AGREEMENT_UPDATED,
          referenceId: agreementStatus.agreementId,
        });
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getAllStatus(data: GetAgreementStatusData): Promise<AgreementStatus[]> {
    try {
      const agreementStatus: AgreementStatus[] = await AgreementStatus.findAll({ where: { agreementId: data.id } });

      return agreementStatus;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new AgreementStatusRepo();
