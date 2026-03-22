import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List of users
     */
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAll();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User found
     *       404:
     *         description: User not found
     */
    static async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getById(req.params.id as string);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: User created
     */
    static async createUser(req: Request, res: Response) {
        try {
            const result = await UserService.register(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Login user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id
     *               - password
     *             properties:
     *               id:
     *                 type: string
     *                 description: Email, username, or phone
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     */
    static async login(req: Request, res: Response) {
        try {
            const { id, password } = req.body;
            const result = await UserService.login(id, password);
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const user = await UserService.update(req.params.id as string, req.body);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const user = await UserService.delete(req.params.id as string);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json({ message: "User deleted" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
