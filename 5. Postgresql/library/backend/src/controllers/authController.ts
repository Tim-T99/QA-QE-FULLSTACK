import { NextFunction, Request, Response } from 'express';
import asyncHandler from "../middlewares/asyncHandler"
import pool from '../config/db.config';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/helpers/generateToken';


export const createUser = asyncHandler(  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role_id } = req.body

        //check if email exists
        const emailCheck = await pool.query("SELECT email FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({
                message: "User already exists"
            })
            return
        }

          //before inserting into users, we need to hash the passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //insert the user 
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, role_id) VALUES($1, $2, $3, $4) RETURNING *", [name, email, hashedPassword, role_id]
        )
        //generate JWT token for user access 
    generateToken(res, newUser.rows[0].id, newUser.rows[0].role_id)
     

    res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0]
    });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.user_id, users.name, users.email, users.password, users.role_id, user_roles.role_name
         FROM users
         JOIN user_roles ON users.role_id = user_roles.role_id
         WHERE email = $1`, 
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //query the user  
    const user = userQuery.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //generate JWT token 
    await generateToken(res, user.id, user.role_id);
    // await console.log("😐😐", req.cookies)


    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        }
    });

    //next();
}) 

export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //We need to immedietly invalidate the access token and the refreh token 
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.status(200).json({ message: "User logged out successfully" });
});

//update user 
export const updateUser = asyncHandler(   async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body

        const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        const result = await pool.query(
            "UPDATE users SET name=$1, email=$2, password=$3, updated_at=NOW() WHERE user_id=$4 RETURNING *",
            [name, email, password, id]
        );
        res.json({ message: "User updated", user: result.rows[0] });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export const deleteUser = asyncHandler(  async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        await pool.query("DELETE FROM public.users WHERE user_id = $1", [id]);
        res.json({ message: "User deleted successful" });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})