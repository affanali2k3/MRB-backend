import { LeadsModel } from "../model/LeadsModel";

interface ILeadsRepo {
    saveLead({ type, houseType, details, budget, timeline, name, price, state, city, country }: {
        type: string, houseType: string, details: string, budget: number, timeline: string,
        name: string, price: number, state: string, city: string, country: string
    }): Promise<void>;
    getAllLeads(): Promise<LeadsModel[]>;
    searchLeads({ type, houseType, budget, state, city, country }: {
        type?: string, houseType?: string, budget?: number, state?: string, city?: string, country?: string
    }): Promise<LeadsModel[]>;
}

class LeadsRepo implements ILeadsRepo {
    // Method to save a new lead
    async saveLead({ type, houseType, details, budget, timeline, name, price, state, city, country }: {
        type: string, houseType: string, details: string, budget: number, timeline: string,
        name: string, price: number, state: string, city: string, country: string
    }): Promise<void> {
        try {
            const lead = new LeadsModel();

            // Set attributes of the new lead
            lead.type = type;
            lead.houseType = houseType;
            lead.details = details;
            lead.budget = budget;
            lead.timeline = timeline;
            lead.name = name;
            lead.price = price;
            lead.state = state;
            lead.city = city;
            lead.country = country;

            // Save the lead to the database
            await lead.save();
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    // Method to retrieve all leads
    async getAllLeads(): Promise<LeadsModel[]> {
        try {
            const leads: LeadsModel[] = await LeadsModel.findAll();
            return leads;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    // Method to search for leads based on certain filters
    async searchLeads({ type, houseType, budget, state, city, country }: {
        type?: string, houseType?: string, budget?: number, state?: string, city?: string, country?: string
    }): Promise<LeadsModel[]> {
        try {
            const whereClause: any = {};

            if (type) whereClause.type = type;
            if (houseType) whereClause.houseType = houseType;
            if (budget) whereClause.budget = budget;
            if (state) whereClause.state = state;
            if (city) whereClause.city = city;
            if (country) whereClause.country = country;

            const leads: LeadsModel[] = await LeadsModel.findAll({ where: whereClause });
            return leads;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}

export default new LeadsRepo();