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
exports.UserAssociatesRepo = void 0;
const UserAssociates_1 = require("../models/UserAssociates");
const sequelize_1 = require("sequelize"); // Import the error class
class UserAssociatesRepo {
    sendRequest({ senderEmail, receiverEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAssociation = new UserAssociates_1.UserAssociates();
                newAssociation.userEmail = senderEmail;
                newAssociation.associateEmail = receiverEmail;
                newAssociation.status = 'Pending';
                yield UserAssociates_1.UserAssociates.create(Object.assign({}, newAssociation.dataValues));
            }
            catch (err) {
                if (err instanceof sequelize_1.UniqueConstraintError)
                    throw new Error("Request already sent");
                throw new Error(`${err}`);
            }
        });
    }
    acceptRequest({ senderEmail, receiverEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const association = yield UserAssociates_1.UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });
                if (!association)
                    throw new Error("There is no friend request");
                association.status = "Accepted";
                association.save();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.UserAssociatesRepo = UserAssociatesRepo;
