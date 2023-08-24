import { Request, Response } from "express"; // Import necessary modules
import AgentInviteeRepo from "../repository/AgentInviteeRepo";


// Controller class for handling like-related operations
class AgentInviteeController {
    // Method to save a like
    async saveInvitee(req: Request, res: Response) {
        try {
            const inviterEmail: string = req.body.inviterEmail; // Extract like-related data from the request body
            const inviteeEmail: string = req.body.inviteeEmail; // Extract like-related data from the request body

            await AgentInviteeRepo.saveInvitee({ inviterEmail: inviterEmail, inviteeEmail: inviteeEmail }); // Call the LikeRepository to save the like

            // Respond with success message
            res.status(200).json({
                message: 'Agent invitee created successfully'
            });
        } catch (err) {
            // Respond with error message
            res.status(500).json({
                message: `Failed to create agent invitee ${err}`
            });
        }
    }

    async deleteInvitee(req: Request, res: Response) {
        try {
            const inviteId: number = parseInt(req.params.inviteId); // Extract like-related data from the request body

            await AgentInviteeRepo.deleteInvitee({ inviteId: inviteId }); // Call the LikeRepository to save the like

            // Respond with success message
            res.status(200).json({
                message: 'Agent invitee deleted successfully'
            });
        } catch (err) {
            // Respond with error message
            res.status(500).json({
                message: `Failed to delete agent invitee  ${err}`
            });
        }
    }
    // Method to save a like
    async getAllInviteesForUser(req: Request, res: Response) {
        try {
            const userEmail: string = req.params.userEmail; // Extract like-related data from the request body

            await AgentInviteeRepo.getAllInviteesForUser({ userEmail: userEmail }); // Call the LikeRepository to save the like

            // Respond with success message
            res.status(200).json({
                message: 'Got Agent invitees successfully'
            });
        } catch (err) {
            // Respond with error message
            res.status(500).json({
                message: `Failed to get agent invitees ${err}`
            });
        }
    }


}

export default new AgentInviteeController; // Export an instance of the LikeController class
