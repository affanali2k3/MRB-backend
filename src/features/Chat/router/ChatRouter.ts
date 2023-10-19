import BaseRoutes from "../../../router/base/BaseRouter"; // Import the base router class
import ChatController from "../controller/ChatController"; // Import the ChatController
import ChatMiddleware from "../middleware/ChatMiddleware";

// Define a router class for chat-related routes
class ChatRouter extends BaseRoutes {
  // Override the routes method to define specific routes for the ChatRouter
  public routes(): void {
    // Define a POST route to save a message, using the saveMessage method from the ChatController
    this.router.post(
      "/save",
      ChatMiddleware.saveMessageVerify,
      ChatController.saveMessage
    );

    // Define a POST route to get all messages, using the getAllMessages method from the ChatController
    this.router.post(
      "/getAll",
      ChatMiddleware.getMessagesVerify,
      ChatController.getAllMessages
    );
    this.router.get(
      "/chat/get-all",
      ChatMiddleware.getChatsVerify,
      ChatController.getAllChats
    );
    this.router.post(
      "/chat/create",
      ChatMiddleware.saveMessageVerify,
      ChatController.createChat
    );
  }
}

// Export an instance of the ChatRouter class with its defined routes
export default new ChatRouter().router;
