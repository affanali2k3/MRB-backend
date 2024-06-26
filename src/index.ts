import express, { Application, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import Database from "./config/database";
import UserRouter from "./features/UserProfile/router/UserRouter";
import UserAssociatesRouter from "./features/UserAssociates/router/UserAssociatesRouter";
import SearchRouter from "./features/Search/router/SearchRouter";
import ChatRouter from "./features/Chat/router/ChatRouter";
import PostRouter from "./features/Post/router/PostRouter";
import path from "path";
import LikeRouter from "./features/Like/router/LikeRouter";
import CommentRouter from "./features/Comment/router/CommentRouter";
import FeedRouter from "./features/Feed/router/FeedRouter";
import SenderAgentFormRouter from "./features/SenderAgentForm/router/SenderAgentFormRouter";
import ReceiverAgentFormRouter from "./features/ReceiverAgentForm/router/ReceiverAgentFormRouter";
import AgentInviteeRouter from "./features/AgentInvitee/router/AgentInviteeRouter";
import AgentInviteCodeRouter from "./features/AgentInviteCode/router/AgentInviteCodeRouter";
import AgentAnalyticRouter from "./features/AgentAnalytics/router/AgentAnalyticRouter";
import AgentReviewRouter from "./features/AgentReviews/router/AgentReviewRouter";
import ReferralCenterRouter from "./features/ReferralCenter/router/ReferralCenterRouter";
import RegistrationRouter from "./features/Registration/router/RegistrationRouter";
import RecommendRouter from "./features/Recommendation/router/RecommendRouter";
import UserPreferencesRouter from "./features/UserPreference/router/UserPreferencesRouter";
import NotificationsRouter from "./features/Notifications/router/NotificationsRouter";
import AgreementRouter from "./features/Agreement/router/AgreementRouter";
import AgreementStatusRouter from "./features/AgreementStatus/router/AgreementStatusRouter";

class App {
  public app: Application;
  public server: http.Server;
  public io: Server;
  public activeClientsOnSocket: Map<string, string>;

  // Initialize the application
  constructor() {
    this.app = express(); // Initialize Express
    this.server = http.createServer(this.app); // Create HTTP server using Express app
    this.io = new Server(this.server); // Initialize Socket.IO
    this.databaseSync(); // Sync database models
    this.plugins(); // Configure Express plugins
    this.routes(); // Define API routes
    this.activeClientsOnSocket = new Map<string, string>(); // Initialize a Map to track active clients
    this.setupSocketIO(); // Set up Socket.IO for real-time communication
  }

  protected plugins(): void {
    this.app.use(express.json()); // Parse JSON requests
    this.app.use(express.static(path.join(__dirname, "storage"))); // Serve static files from 'storage' directory
    this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
  }

  protected databaseSync(): void {
    const db = new Database(); // Initialize the database connection
    db.sequelize?.sync(); // Sync database models
  }

  protected routes(): void {
    // Define a default route
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });

    // Define various API routes using routers
    this.app.use("/api/v1/user", UserRouter);
    this.app.use("/api/v1/associate", UserAssociatesRouter);
    this.app.use("/api/v1/search", SearchRouter);
    this.app.use("/api/v1/chat", ChatRouter);
    this.app.use("/api/v1/post", PostRouter);
    this.app.use("/api/v1/like", LikeRouter);
    this.app.use("/api/v1/comment", CommentRouter);
    this.app.use("/api/v1/feed", FeedRouter);
    this.app.use("/api/v1/senderAgentForm", SenderAgentFormRouter);
    this.app.use("/api/v1/receiverAgentForm", ReceiverAgentFormRouter);
    this.app.use("/api/v1/agentInviteCode", AgentInviteCodeRouter);
    this.app.use("/api/v1/agentInvitee", AgentInviteeRouter);
    this.app.use("/api/v1/agent-analytics", AgentAnalyticRouter);
    this.app.use("/api/v1/agent-reviews", AgentReviewRouter);
    this.app.use("/api/v1/referral-center", ReferralCenterRouter);
    this.app.use("/api/v1/registration", RegistrationRouter);
    this.app.use("/api/v1/recommend", RecommendRouter);
    this.app.use("/api/v1/preferences", UserPreferencesRouter);
    this.app.use("/api/v1/notifications", NotificationsRouter);
    this.app.use("/api/v1/agreement", AgreementRouter);
    this.app.use("/api/v1/agreement-status", AgreementStatusRouter);
  }

  protected setupSocketIO(): void {
    // Set up Socket.IO event handlers
    this.io.on("connection", (socket: Socket) => {
      console.log("A user connected");
      this.activeClientsOnSocket.set(socket.id, ""); // Add the newly connected user to the Map

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });

      socket.on("user-connected", (email: string) => {
        console.log("A user connected");
        this.activeClientsOnSocket.set(email, socket.id); // Update the Map with user's email and socket ID
      });

      socket.on(
        "message",
        async ({ message, senderEmail, receiverEmail }: { message: string; senderEmail: string; receiverEmail: string }) => {
          console.log("Message received:", message);
          console.log("Sender email:", senderEmail);
          console.log("Receiver Email:", receiverEmail);
        }
      );
    });
  }
}

const port: number = 8080;
const server = new App().server;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log("✅ Server started successfully!");
});
