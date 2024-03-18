import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { SenderAgentFormType } from "../../SenderAgentForm/controller/SenderAgentFormController";
import { SenderAgentDirectForm } from "../../SenderAgentForm/model/SenderAgentDirectForm";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { ReceiverAgentFormType, ReceiverAgentFormValues } from "../controller/ReceiverAgentFormController";
import { ReceiverAgentDirectForm } from "../model/ReceiverAgentDirectFormModel";
import { ReceiverAgentOpenForm } from "../model/ReceiverAgentOpenForm";

enum ReceiverAgentFormStatus {
  Awaiting = "Awaiting",
  Accepted = "Accepted",
  Rejected = "Rejected",
}

interface IReceiverAgentFormRepo {
  createForm(values: ReceiverAgentFormValues): Promise<void>;
  getOpenFormsProposalsReceivedByUser({ userId }: { userId: number }): Promise<ReceiverAgentOpenForm[]>;
  getDirectFormsProposalsReceivedByUser({ userId }: { userId: number }): Promise<ReceiverAgentDirectForm[]>;
  getOpenFormsSent({ userId }: { userId: number }): Promise<ReceiverAgentOpenForm[]>;
}

class SenderAgentFormRepo implements IReceiverAgentFormRepo {
  async getOpenFormsProposalsReceivedByUser({ userId }: { userId: number }): Promise<ReceiverAgentOpenForm[]> {
    try {
      const openFormsProposalsReceived: ReceiverAgentOpenForm[] = await ReceiverAgentOpenForm.findAll({
        include: [
          {
            model: SenderAgentOpenForm,
            where: { senderAgent: userId },
            include: [
              {
                model: User,
                include: [
                  {
                    model: AgentAnalytic,
                  },
                ],
              },
            ],
          },
        ],
      });

      return openFormsProposalsReceived;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async getDirectFormsProposalsReceivedByUser({ userId }: { userId: number }): Promise<ReceiverAgentDirectForm[]> {
    try {
      const directFormsProposalsReceived: ReceiverAgentDirectForm[] = await ReceiverAgentDirectForm.findAll({
        include: [
          {
            model: SenderAgentDirectForm,
            where: { senderAgent: userId },
            include: [
              {
                model: User,
                include: [
                  {
                    model: AgentAnalytic,
                  },
                ],
              },
            ],
          },
        ],
      });

      return directFormsProposalsReceived;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async rejectReceivedProposal({
    receiverAgentFormId,
    formType,
  }: {
    receiverAgentFormId: number;
    formType: SenderAgentFormType;
  }): Promise<void> {
    try {
      if (formType == SenderAgentFormType.Direct) {
        const form: ReceiverAgentDirectForm | null = await ReceiverAgentDirectForm.findOne({
          where: { id: receiverAgentFormId },
        });

        if (!form) throw new Error("Cannot reject form because it does not exist");

        form.status = ReceiverAgentFormStatus.Rejected;

        await form.save();
      } else {
        const form: ReceiverAgentOpenForm | null = await ReceiverAgentOpenForm.findOne({
          where: { id: receiverAgentFormId },
        });

        if (!form) throw new Error("Cannot reject form because it does not exist");

        form.status = ReceiverAgentFormStatus.Rejected;

        await form.save();
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async acceptReceivedProposal({
    receiverAgentFormId,
    formType,
  }: {
    receiverAgentFormId: number;
    formType: SenderAgentFormType;
  }): Promise<void> {
    try {
      if (formType == SenderAgentFormType.Direct) {
        const form: ReceiverAgentDirectForm | null = await ReceiverAgentDirectForm.findOne({
          where: { id: receiverAgentFormId },
        });

        if (!form) throw new Error("Cannot accept form because it does not exist");

        form.status = ReceiverAgentFormStatus.Accepted;

        await form.save();
      } else {
        const form: ReceiverAgentOpenForm | null = await ReceiverAgentOpenForm.findOne({
          where: { id: receiverAgentFormId },
        });

        if (!form) throw new Error("Cannot accept form because it does not exist");

        form.status = ReceiverAgentFormStatus.Accepted;

        await form.save();
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  // async changeOpenFormConsideringStatus({ receiverAgentOpenFormId, status }: { receiverAgentOpenFormId: number; status: string }): Promise<void> {
  //   try {
  //     const openFormsProposalsReceived: ReceiverAgentOpenForm | null = await ReceiverAgentOpenForm.findOne({
  //       where: {
  //         id: receiverAgentOpenFormId,
  //       },
  //     });

  //     if (!openFormsProposalsReceived) throw new Error("The form does not exist");

  //     openFormsProposalsReceived.consideringStatus = status;

  //     await openFormsProposalsReceived.save();
  //   } catch (err) {
  //     throw new Error(`${err}`);
  //   }
  // }
  // async changeDirectFormConsideringStatus({ receiverAgentDirectFormId, status }: { receiverAgentDirectFormId: number; status: string }): Promise<void> {
  //   try {
  //     const directFormsProposalsReceived: ReceiverAgentDirectForm | null = await ReceiverAgentDirectForm.findOne({
  //       where: {
  //         id: receiverAgentDirectFormId,
  //       },
  //     });

  //     if (!directFormsProposalsReceived) throw new Error("The form does not exist");

  //     directFormsProposalsReceived.consideringStatus = status;

  //     await directFormsProposalsReceived.save();
  //   } catch (err) {
  //     throw new Error(`${err}`);
  //   }
  // }
  async getOpenFormsSent({ userId }: { userId: number }): Promise<ReceiverAgentOpenForm[]> {
    try {
      const formsSent: ReceiverAgentOpenForm[] = await ReceiverAgentOpenForm.findAll({
        where: {
          receiverAgent: userId,
        },
        include: [
          {
            model: SenderAgentOpenForm,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      });

      return formsSent;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async createForm(values: ReceiverAgentFormValues): Promise<void> {
    try {
      if (values.formType === ReceiverAgentFormType.Direct) {
        const senderAgentForm: SenderAgentDirectForm | null = await SenderAgentDirectForm.findOne({
          where: { id: values.senderAgentFormId },
        });

        if (!senderAgentForm) throw new Error("Form to apply for does not exist");

        if (values.receiverAgent === senderAgentForm.senderAgent) throw new Error("Cannot apply to your own referral");

        const receiverAgentDirectForm = new ReceiverAgentDirectForm();
        receiverAgentDirectForm.receiverAgent = values.receiverAgent;
        receiverAgentDirectForm.senderAgentFormId = values.senderAgentFormId;
        receiverAgentDirectForm.proposal = values.proposal;

        await receiverAgentDirectForm.save();
      } else if (values.formType === ReceiverAgentFormType.Open) {
        const senderAgentForm: SenderAgentOpenForm | null = await SenderAgentOpenForm.findOne({
          where: { id: values.senderAgentFormId },
        });

        if (!senderAgentForm) throw new Error("Form to apply for does not exist");

        console.log(senderAgentForm.dataValues);

        console.log(senderAgentForm.senderAgent);
        console.log(typeof values.receiverAgent);

        if (values.receiverAgent === senderAgentForm.senderAgent) throw new Error("Cannot apply to your own referral");

        const receiverAgentopenForm = new ReceiverAgentOpenForm();

        receiverAgentopenForm.receiverAgent = values.receiverAgent;
        receiverAgentopenForm.senderAgentFormId = values.senderAgentFormId;
        receiverAgentopenForm.proposal = values.proposal;
        receiverAgentopenForm.status = ReceiverAgentFormStatus.Awaiting;

        await receiverAgentopenForm.save();
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new SenderAgentFormRepo();
