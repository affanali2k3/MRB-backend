import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
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
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getAllStatus(data: GetAgreementStatusData): Promise<AgreementStatus[]> {
    try {
      const agreementStatus: AgreementStatus[] = await AgreementStatus.findAll({ where: { id: data.id } });

      return agreementStatus;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new AgreementStatusRepo();
