import { Request, Response } from "express"; // Import necessary modules
import AgentInviteCodeRepo from "../repository/AgentInviteCodeRepo";

// Controller class for handling like-related operations
class AgentInviteCodeController {
  // Method to save a like
  async createCode(req: Request, res: Response) {
    try {
      const userEmail: string = req.body.userEmail; // Extract like-related data from the request body
      await AgentInviteCodeRepo.createCode({ userEmail: userEmail }); // Call the LikeRepository to save the like

      // Respond with success message
      res.status(200).json({
        message: "Agent invite code created successfully",
      });
    } catch (err) {
      // Respond with error message
      res.status(500).json({
        message: `Failed to create agent invite code ${err}`,
      });
    }
  }
  // Method to save a like
  async shareCode(req: Request, res: Response) {
    try {
      const sharedEmail: string = req.body.sharedEmail; // Extract like-related data from the request body
      const codeId: number = req.body.codeId; // Extract like-related data from the request body

      await AgentInviteCodeRepo.shareCode({
        sharedEmail: sharedEmail,
        codeId: codeId,
      }); // Call the LikeRepository to save the like

      // Respond with success message
      res.status(200).json({
        message: "Agent invite code shared successfully",
      });
    } catch (err) {
      // Respond with error message
      res.status(500).json({
        message: `Failed to share agent invite code ${err}`,
      });
    }
  }
  // Method to save a like
  async deleteCode(req: Request, res: Response) {
    try {
      const codeId: number = parseInt(req.params.codeId); // Extract like-related data from the request body

      await AgentInviteCodeRepo.deleteCode({ codeId: codeId }); // Call the LikeRepository to save the like

      // Respond with success message
      res.status(200).json({
        message: "Agent invite code deleted successfully",
      });
    } catch (err) {
      // Respond with error message
      res.status(500).json({
        message: `Failed to delete agent invite code ${err}`,
      });
    }
  }
  // Method to save a like
  async getAllCodesForUser(req: Request, res: Response) {
    try {
      const userEmail: string = req.params.userEmail; // Extract like-related data from the request body

      await AgentInviteCodeRepo.getAllCodesForUser({ userEmail: userEmail }); // Call the LikeRepository to save the like

      // Respond with success message
      res.status(200).json({
        message: "Got Agent invite codes successfully",
      });
    } catch (err) {
      // Respond with error message
      res.status(500).json({
        message: `Failed to get agent invite codes ${err}`,
      });
    }
  }
}

export default new AgentInviteCodeController(); // Export an instance of the LikeController class
