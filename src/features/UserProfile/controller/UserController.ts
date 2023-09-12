import { Request, Response } from "express";
import { User } from "../model/User";
import {UserRepo} from "../repository/UserRepo"; // Assuming you have imported the correct path
import fs from "fs";
import path from "path";

class UserController {
    
    // Endpoint to create a new user
    async create(req: Request, res: Response) {
        
        try {
            const newUser = new User();
            const { email } = req.body;
            Object.assign(newUser, { email });

            await new UserRepo().create(newUser.dataValues);
            res.status(200).json({
                message: "User created successfully"
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot create user ${err}`
            });
        }
    }

    // Endpoint to delete a user
    async delete(req: Request, res: Response) {
        try {
            await new UserRepo().delete(req.body.userSsn);
            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                message: "Cannot delete user"
            });
        }
    }

    // Endpoint to update user information
    async update(req: Request, res: Response) {
        try {
            let userBucket;
            if (req.file !== undefined) {
                userBucket = `./storage/${req.body.email}/${req.file?.filename}`;
            }

            const updatedUser = new User();
            const { address, licenceState, licenceNumber, previousDeals, email, phone, occupation, name, gender, licence } = req.body;
            var { yearLicenced, completedDeals } = req.body;

            yearLicenced = parseInt(yearLicenced);
            completedDeals = parseInt(completedDeals);

            if (Number.isNaN(yearLicenced) || Number.isNaN(completedDeals)) {
                throw new Error('error');
            }

            Object.assign(updatedUser, { address, licenceState, licenceNumber, yearLicenced, completedDeals, previousDeals, email, phone, occupation, photo: userBucket, name, gender, licence });

            await new UserRepo().update(updatedUser);
            res.status(200).json({
                message: "User updated successfully"
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot update user because ${err}`
            });
        }
    }
    
    // Endpoint to get the user's avatar
    async getUserAvatar(req: Request, res: Response) {
        try {
            const userId: string = req.params.userId;
            res.sendFile(path.join('C:/Users/Affan/Desktop/MRB/backend/storage/', userId, 'avatar.png'));
        } catch (err) {
            res.status(500).json({
                message: `Failed to get user avatar ${err}`
            });
        }
    }
    
    // Endpoint to get user information by email
    async getUserByEmail(req: Request, res: Response) {
        try {
            const user = await new UserRepo().getByEmail(req.params.email);
            let file;
            try {
                file = fs.readFileSync(user.photo);
            } catch { }

            res.status(200).json({
                message: "Got user successfully",
                data: user,
                photo: file === undefined ? null : file.toString('base64')
            });
        } catch (err) {
            res.status(500).json({
                message: `Cannot get user ${err}`
            });
        }
    }
    
    // Endpoint to get all users
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await new UserRepo().getAll();
            res.status(200).json({
                message: "Got all users successfully",
                data: users
            });
        } catch (err) {
            res.status(500).json({
                message: "Cannot get users"
            });
        }
    }

}

export default new UserController();
