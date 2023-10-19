import { Op, WhereOptions } from "sequelize";
import { AgentAnalytic } from "../../AgentAnalytics/model/AgentAnalyticsModel";
import { SenderAgentOpenForm } from "../../SenderAgentForm/model/SenderAgentOpenForm";
import { User } from "../../UserProfile/model/User";
import { FiltersSearchData } from "../controller/ReferralCenterController";

interface IReferralCenterRepo {
  searchForLeads(data: FiltersSearchData): Promise<SenderAgentOpenForm[]>;
}

class ReferralCenterRepo implements IReferralCenterRepo {
  async searchForLeads(
    data: FiltersSearchData
  ): Promise<SenderAgentOpenForm[]> {
    try {
      const whereClause: WhereOptions<SenderAgentOpenForm> = {};

      if (data.state !== undefined && data.state !== "All") {
        whereClause.state = data.state;
      }
      if (data.city !== undefined && data.city !== "All") {
        console.log("Here2");

        whereClause.city = data.city;
      }
      if (data.minTimeAmount !== undefined) {
        whereClause.timeAmount = {
          [Op.gte]: data.minTimeAmount,
        };
      }
      if (data.maxTimeAmount !== undefined) {
        whereClause.timeAmount = {
          [Op.lte]: data.maxTimeAmount,
        };
      }
      if (data.minCost !== undefined) {
        whereClause.price = {
          [Op.gte]: data.minCost,
        };
      }
      if (data.maxCost !== undefined) {
        whereClause.price = {
          [Op.lte]: data.maxCost,
        };
      }
      if (data.clientType !== undefined) {
        if (data.clientType === "buyer") {
          whereClause.isBuyer = true;
        } else {
          whereClause.isBuyer = false;
        }
      }
      if (data.houseType !== undefined) {
        whereClause.typeOfHouse = data.houseType;
      }

      console.log(data);

      const results = await SenderAgentOpenForm.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            attributes: [User.USER_NAME, User.ID],
            include: [
              {
                model: AgentAnalytic,
              },
            ],
          },
        ],
      });

      return results;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export default new ReferralCenterRepo();
