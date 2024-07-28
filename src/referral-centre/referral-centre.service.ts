import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { AgentAnalytic } from 'src/agent-analytic/agent-analytic.model';
import { ReferralOpenForm } from 'src/referral-form/referral-open-form';
import { User } from 'src/user/user.model';
import { SearchForLeadsDto } from './dto/create-referral-centre.dto';

@Injectable()
export class ReferralCentreService {
  constructor(
    @InjectModel(ReferralOpenForm)
    private referralOpenFormModel: typeof ReferralOpenForm,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(AgentAnalytic)
    private agentAnalyticModel: typeof AgentAnalytic,
  ) {}

  async searchForLeads(data: SearchForLeadsDto): Promise<ReferralOpenForm[]> {
    try {
      const whereClause: WhereOptions<ReferralOpenForm> = {};

      if (data.state !== undefined && data.state !== 'All') {
        whereClause.state = data.state;
      }
      if (data.city !== undefined && data.city !== 'All') {
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
        whereClause.isBuyer = data.clientType === 'buyer';
      }
      if (data.houseType !== undefined) {
        whereClause.typeOfHouse = data.houseType;
      }

      const results = await this.referralOpenFormModel.findAll({
        where: whereClause,
        include: [
          {
            model: this.userModel,
            attributes: ['name', 'id'],
            include: [
              {
                model: this.agentAnalyticModel,
              },
            ],
          },
        ],
      });

      return results;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
