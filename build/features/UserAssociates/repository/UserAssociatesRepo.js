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
const User_1 = require("../../UserProfile/model/User");
const UserAssociates_1 = require("../model/UserAssociates");
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
    declineRequest({ senderEmail, receiverEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const association = yield UserAssociates_1.UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });
                if (!association)
                    throw new Error("There is no friend request");
                association.status = "Rejected";
                association.save();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    cancelRequest({ senderEmail, receiverEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const association = yield UserAssociates_1.UserAssociates.findOne({ where: { userEmail: senderEmail, associateEmail: receiverEmail } });
                if (!association)
                    throw new Error("There is no friend request");
                association.destroy();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    getAllAssociates({ userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersWithAcceptedAssociates = yield User_1.User.findAll({
                    where: {
                        user_email: {
                            [sequelize_1.Op.in]: (0, sequelize_1.literal)(`(
                      SELECT associate_email
                      FROM user_associates
                      WHERE user_email = '${userEmail}' AND association_status = 'Accepted'
                      UNION
                      SELECT user_email
                      FROM user_associates
                      WHERE associate_email = '${userEmail}' AND association_status = 'Accepted'
                      )
                    `),
                        },
                    },
                });
                return usersWithAcceptedAssociates;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    removeAssociate({ userEmail, associateEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAssociates = yield UserAssociates_1.UserAssociates.findOne({
                    where: sequelize_1.Sequelize.or({ userEmail: userEmail, associateEmail: associateEmail }, { userEmail: associateEmail, associateEmail: userEmail })
                });
                if (!userAssociates)
                    throw new Error("There is no association");
                userAssociates.destroy();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    checkRequestStatusWithUser({ userEmail, associateEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAssociates = yield UserAssociates_1.UserAssociates.findOne({
                    where: sequelize_1.Sequelize.or({ userEmail: userEmail, associateEmail: associateEmail }, { userEmail: associateEmail, associateEmail: userEmail })
                });
                if (!userAssociates)
                    return null;
                return userAssociates;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
}
exports.UserAssociatesRepo = UserAssociatesRepo;
