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
const UserAssociatesRepo_1 = require("../repository/UserAssociatesRepo");
class UserAssociatesController {
    sendRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                yield new UserAssociatesRepo_1.UserAssociatesRepo().sendRequest({ senderEmail: reqBody.senderEmail, receiverEmail: reqBody.receiverEmail });
                res.status(200).json({ message: `Request sent succesfully` });
            }
            catch (err) {
                res.status(500).send({ message: `Failed to send request ${err}` });
            }
        });
    }
    acceptRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                yield new UserAssociatesRepo_1.UserAssociatesRepo().acceptRequest({ senderEmail: reqBody.senderEmail, receiverEmail: reqBody.receiverEmail });
                res.status(200).json({ message: `Request accepted succesfully` });
            }
            catch (err) {
                res.status(500).send({ message: `Failed to accept request ${err}` });
            }
        });
    }
    declineRequest() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    cancelRequest() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new UserAssociatesController;
