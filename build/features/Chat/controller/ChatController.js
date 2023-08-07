"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatRespository_1 = __importDefault(require("../repository/ChatRespository"));
class ChatController {
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const messages = yield ChatRespository_1.default.getAllMessages({ userOneEmail: data.userOneEmail, userTwoEmail: data.userTwoEmail });
                res.status(200).json({
                    message: "Messages retreived succesfully",
                    data: messages
                });
            }
            catch (err) {
                res.status(200).json({
                    message: `Failed to retreive messages ${err}`,
                });
            }
        });
    }
    saveMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield ChatRespository_1.default.saveMessage({ senderEmail: data.senderEmail, receiverEmail: data.receiverEmail, message: data.message });
                res.status(200).json({
                    message: "Message saved succesfully",
                });
            }
            catch (err) {
                res.status(200).json({
                    message: `Failed to save message ${err}`,
                });
            }
        });
    }
}
exports.default = new ChatController;
