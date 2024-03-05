import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import AgreementStatusRepo from "../../AgreementStatus/repository/AgreementStatusRepo";
import { NotificationTypes } from "../../Notifications/controller/NotificationController";
import NotificationsRepo from "../../Notifications/repository/NotificationsRepo";
import {
  AcceptAgreementData,
  AgreementStatus,
  BrokerSignAgreementData,
  CreateAgreementData,
  StartAgreementData,
  UpdateReceiverAgreementData,
  UpdateSenderAgreementData,
} from "../controller/AgreementController";
import { Agreement } from "../model/AgreementModel";

interface IAgreementRepo {
  createAgreement(data: CreateAgreementData): Promise<void>;
  updateAgreementBySender(data: UpdateSenderAgreementData): Promise<void>;

  updateAgreementByReceiver(data: UpdateReceiverAgreementData): Promise<void>;

  // acceptAgreementBySender(data: AcceptAgreementData): Promise<void>;

  // acceptAgreementByReceiver(data: AcceptAgreementData): Promise<void>;

  /*
    There is a difference between create and start agreement. Create is a means to come on terms and sign the agreement. Then after
    signing they can deliberately start the agreement
  */
  startAgreement(data: StartAgreementData): Promise<void>;

  /*
    Close agreement does not mean they end it on bad terms. It means the deal was done succesfully like a deal closing
  */
  //   closeAgreement({ agentId }: { agentId: number }): Promise<void>;
}

class AgreementRepo implements IAgreementRepo {
  async createAgreement(data: CreateAgreementData): Promise<void> {
    try {
      const agreement: Agreement = new Agreement();

      agreement.referralSenderId = data.referralSenderId;
      agreement.referralReceiverId = data.referralReceiverId;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async updateAgreementBySender(data: UpdateSenderAgreementData): Promise<void> {
    try {
      const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      agreement.referralFeePercentage = data.referralFeePercentage;
      agreement.statusUpdateInterval = data.statusUpdateInterval;
      agreement.senderBrokerName = data.senderBrokerName;
      agreement.senderBrokerEmail = data.senderBrokerEmail;
      agreement.senderSignature = data.signature;

      await agreement.save();

      await NotificationsRepo.createNotification({
        userId: agreement.referralReceiverId,
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async updateAgreementByReceiver(data: UpdateReceiverAgreementData): Promise<void> {
    try {
      const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      agreement.receiverBrokerName = data.receiverBrokerName;
      agreement.receiverBrokerEmail = data.receiverBrokerEmail;
      agreement.receiverSignature = data.signature;

      await agreement.save();

      await NotificationsRepo.createNotification({
        userId: agreement.referralSenderId,
        type: NotificationTypes.AGREEMENT_UPDATED,
        referenceId: agreement.id,
      });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  // async acceptAgreementBySender(data: AcceptAgreementData): Promise<void> {
  //   try {
  //     const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

  //     if (!agreement) throw new Error("Agreement does not exist");

  //     if (!agreement.referralFeePercentage) throw new Error("The referral fee percentage has to entered before accepting");

  //     agreement.acceptedBySender = true;

  //     await agreement.save();
  //   } catch (err) {
  //     throw new Error(`${err}`);
  //   }
  // }
  // async acceptAgreementByReceiver(data: AcceptAgreementData): Promise<void> {
  //   try {
  //     const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

  //     if (!agreement) throw new Error("Agreement does not exist");

  //     if (!agreement.acceptedBySender) throw new Error("The agreement has to be accepted by the sender first");

  //     agreement.acceptedByReceiver = true;

  //     await agreement.save();
  //   } catch (err) {
  //     throw new Error(`${err}`);
  //   }
  // }
  async senderBrokerSignAgreement(data: BrokerSignAgreementData): Promise<void> {
    try {
      const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      agreement.senderBrokerSignature = data.signature;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async receiverBrokerSignAgreement(data: BrokerSignAgreementData): Promise<void> {
    try {
      const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      agreement.receiverBrokerSignature = data.signature;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async startAgreement(data: StartAgreementData): Promise<void> {
    try {
      const agreement: Agreement | null = await Agreement.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      if (data.agentId !== agreement.referralSenderId) throw new Error("Only referral sender can start the agreement");

      // if (!agreement.acceptedBySender || !agreement.acceptedByReceiver)
      //   throw new Error("The agreement has to be accepted by both sender and receiver before it can be started");

      if (
        !agreement.senderSignature ||
        !agreement.receiverSignature ||
        !agreement.senderBrokerSignature ||
        !agreement.receiverBrokerSignature
      ) {
        throw new Error("Agreement must be signed by all parties for it to be started");
      }

      agreement.status = AgreementStatus.Started;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new AgreementRepo();
