import { Request, Response } from "express"
import { User } from "../models/User"
import { UserRepo } from "../repository/UserRepo";
import fs from "fs";

class UserController {
    async create(req: Request, res: Response) {
        try {
            const newUser = new User();

            const { email } = req.body;
            Object.assign(newUser, { email });

            await new UserRepo().create(newUser.dataValues);
            res.status(200).json({
                message: "User created successfully"
            })
        } catch (err) {
            res.status(500).json({
                message: `Cannot create user ${err}`
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await new UserRepo().delete(req.body.userSsn);
            res.status(200).json({
                message: "User deleted successfully"
            })
        } catch (err) {
            res.status(500).json({
                message: "Cannot delete user"
            })
        }
    }

    async update(req: Request, res: Response) {
        try {
            let userBucket
            if (req.file !== undefined) {
                userBucket = `./storage/${req.body.ssn}/${req.file?.filename}`
            }

            const updatedUser = new User();
            const { email, ssn, phone, occupation, name, gender, licence } = req.body;
            Object.assign(updatedUser, { email, ssn, phone, occupation, photo: userBucket, name, gender, licence });

            await new UserRepo().update(updatedUser);
            res.status(200).json({
                message: "User updated successfully"
            })
        } catch (err) {
            res.status(500).json({
                message: `Cannot update user because ${err}`
            })
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            console.log(req.params);
            const user = await new UserRepo().getByEmail(req.params.email);
            let file;
            try {
                file = fs.readFileSync(user.photo);
            } catch { }

            res.status(200).json({
                message: "Got user successfully",
                data: user,
                photo: file === undefined ? null : file.toString('base64')
            })
        } catch (err) {
            res.status(500).json({
                message: `Cannot get user ${err}`
            })
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await new UserRepo().getAll();
            res.status(200).json({
                message: "Got all users successfully",
                data: users
            })
        } catch (err) {
            res.status(500).json({
                message: "Cannot get users"
            })
        }
    }
}

export default new UserController;