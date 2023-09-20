import BaseRoutes from "../../../router/base/BaseRouter";
import LeadsController from "../controller/LeadsController";

class LeadsRouter extends BaseRoutes {
    public routes(): void {
        // Route to save a new lead
        this.router.post("/", LeadsController.saveLead);
        // Route to get all leads
        this.router.get("/", LeadsController.getAllLeads);
        // Route to search for leads based on certain filters
        this.router.get("/search", LeadsController.searchLeads);
    }
}

export default new LeadsRouter().router;