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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const MessageModel_1 = require("../model/MessageModel");
class ChatRepo {
    getAllMessages({ userOneEmail, userTwoEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield MessageModel_1.Message.findAll({
                    where: sequelize_1.Sequelize.or({ senderEmail: userOneEmail, receiverEmail: userTwoEmail }, { senderEmail: userTwoEmail, receiverEmail: userOneEmail })
                });
                return messages;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    saveMessage({ senderEmail, receiverEmail, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = new MessageModel_1.Message();
                newMessage.senderEmail = senderEmail;
                newMessage.receiverEmail = receiverEmail;
                newMessage.message = message;
                yield newMessage.save();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.default = new ChatRepo;
