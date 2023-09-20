import { Request, Response } from "express";
import LeadsRepo from "../repository/LeadsRepo"; // Import the LeadsRepo for interacting with leads
import { LeadsModel } from "../model/LeadsModel"; // Import the Leads model

// Create a class to represent a Lead
class Lead {
    constructor(
        id: number,
        type: string,
        houseType: string,
        details: string,
        budget: number,
        timeline: string,
        name: string,
        price: number,
        state: string,
        city: string,
        country: string
    ) {
        // Initialize properties
        this.id = id;
        this.type = type;
        this.houseType = houseType;
        this.details = details;
        this.budget = budget;
        this.timeline = timeline;
        this.name = name;
        this.price = price;
        this.state = state;
        this.city = city;
        this.country = country;
    }

    // Declare properties for the Lead class
    id: number;
    type: string;
    houseType: string;
    details: string;
    budget: number;
    timeline: string;
    name: string;
    price: number;
    state: string;
    city: string;
    country: string;
}

// Create a LeadsController class for handling lead-related operations
class LeadsController {
    async saveLead(req: Request, res: Response) {
        try {
            // Retrieve lead data from request body
            const type: string = req.body.type;
            const houseType: string = req.body.houseType;
            const details: string = req.body.details;
            const budget: number = req.body.budget;
            const timeline: string = req.body.timeline;
            const name: string = req.body.name;
            const price: number = req.body.price;
            const state: string = req.body.state;
            const city: string = req.body.city;
            const country: string = req.body.country;

            // Save the lead to the database
            await LeadsRepo.saveLead({
                type: type,
                houseType: houseType,
                details: details,
                budget: budget,
                timeline: timeline,
                name: name,
                price: price,
                state: state,
                city: city,
                country: country,
            });

            res.status(200).json({
                message: "Lead saved successfully",
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to save lead ${err}`,
            });
        }
    }

    async getAllLeads(req: Request, res: Response) {
        try {
            // Get all leads from the database
            const leads: LeadsModel[] = await LeadsRepo.getAllLeads();

            const leadsList: Lead[] = [];

            // Iterate through leads and create Lead objects
            for (const lead of leads) {
                const leadObj: Lead = new Lead(
                    lead.id,
                    lead.type,
                    lead.houseType,
                    lead.details,
                    lead.budget,
                    lead.timeline,
                    lead.name,
                    lead.price,
                    lead.state,
                    lead.city,
                    lead.country
                );
                leadsList.push(leadObj);
            }

            res.status(200).json({
                message: "Got leads successfully",
                data: leadsList,
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to get leads ${err}`,
            });
        }
    }

    async searchLeads(req: Request, res: Response) {
        try {
            // Retrieve search parameters from request query
            const type: string | undefined = req.query.type as string | undefined;
            const houseType: string | undefined = req.query.houseType as string | undefined;
            const budget: number | undefined = req.query.budget as number | undefined;
            const state: string | undefined = req.query.state as string | undefined;
            const city: string | undefined = req.query.city as string | undefined;
            const country: string | undefined = req.query.country as string | undefined;

            // Search for leads based on the provided filters
            const leads: LeadsModel[] = await LeadsRepo.searchLeads({
                type: type,
                houseType: houseType,
                budget: budget,
                state: state,
                city: city,
                country: country,
            });

            const leadsList: Lead[] = [];

            // Iterate through leads and create Lead objects
            for (const lead of leads) {
                const leadObj: Lead = new Lead(
                    lead.id,
                    lead.type,
                    lead.houseType,
                    lead.details,
                    lead.budget,
                    lead.timeline,
                    lead.name,
                    lead.price,
                    lead.state,
                    lead.city,
                    lead.country
                );
                leadsList.push(leadObj);
            }

            res.status(200).json({
                message: "Searched leads successfully",
                data: leadsList,
            });
        } catch (err) {
            res.status(500).json({
                message: `Failed to search leads ${err}`,
            });
        }
    }
}

export default new LeadsController(); // Export an instance of the LeadsController class