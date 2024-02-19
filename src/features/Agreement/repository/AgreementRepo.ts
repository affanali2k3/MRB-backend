import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { AcceptAgreementData, AgreementStatus, CreateAgreementData, StartAgreementData, UpdateAgreementData } from "../controller/AgreementController";
import { AgreementModel } from "../model/AgreementModel";

interface IAgreementRepo {
  createAgreement(data: CreateAgreementData): Promise<void>;
  updateAgreementBySender(data: UpdateAgreementData): Promise<void>;
  //   updateAgreementByReceiver({ agentId }: { agentId: number }): Promise<void>;

  acceptAgreementBySender(data: AcceptAgreementData): Promise<void>;

  acceptAgreementByReceiver(data: AcceptAgreementData): Promise<void>;

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
      const agreement: AgreementModel = new AgreementModel();

      agreement.referralSenderId = data.referralSenderId;
      agreement.referralReceiverId = data.referralReceiverId;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async updateAgreementBySender(data: UpdateAgreementData): Promise<void> {
    try {
      const agreement: AgreementModel | null = await AgreementModel.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      agreement.referralFeePercentage = data.referralFeePercentage;
      agreement.statusUpdateInterval = data.statusUpdateInterval;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async acceptAgreementBySender(data: AcceptAgreementData): Promise<void> {
    try {
      const agreement: AgreementModel | null = await AgreementModel.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      if (!agreement.referralFeePercentage) throw new Error("The referral fee percentage has to entered before accepting");

      agreement.acceptedBySender = true;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async acceptAgreementByReceiver(data: AcceptAgreementData): Promise<void> {
    try {
      const agreement: AgreementModel | null = await AgreementModel.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      if (!agreement.acceptedBySender) throw new Error("The agreement has to be accepted by the sender first");

      agreement.acceptedByReceiver = true;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async startAgreement(data: StartAgreementData): Promise<void> {
    try {
      const agreement: AgreementModel | null = await AgreementModel.findOne({ where: { id: data.id } });

      if (!agreement) throw new Error("Agreement does not exist");

      if (!agreement.acceptedBySender || !agreement.acceptedByReceiver) throw new Error("The agreement has to be accepted by both sender and receiver before it can be started");

      agreement.status = AgreementStatus.Started;

      await agreement.save();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new AgreementRepo();
