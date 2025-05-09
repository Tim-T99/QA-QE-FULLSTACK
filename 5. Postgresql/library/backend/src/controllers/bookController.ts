//This will handle the logic of events 
import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { UserRequest } from "@app/utils/types/userTypes";

// Create books
// export const createBook = asyncHandler( async (req: Request, res: Response) => {
//     try {
//         const { title, author, isbn, year, pages, publisher, description, image, price, created_by } = req.body
    
//         //check if book exists
//         const titleCheck = await pool.query("SELECT book_id FROM books WHERE title = $1", [title])
    
//         if (titleCheck.rows.length > 0) {
//             res.status(400).json({
//                 message: "book already exists"
//             })
//             return
//         }
//         //insert book 
//         const bookResult = await pool.query(
//             "INSERT INTO books (title, author, isbn, year, pages, publisher, description, image, price, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [title, author, isbn, year, pages, publisher, description, image, price, created_by]
//         )
//         res.status(201).json({
//             message: "Book successfully uploaded",
//             book: bookResult.rows[0]
//         })
//       } catch (error) {
//         console.error("Error uploading book:", error);
//             res.status(500).json({ message: "Internal server error" });
//       }
// });

export const createBook = asyncHandler(async (req: UserRequest, res: Response) => {
    //Modify the createEvent function inside eventController.ts so that user_id is dynamically obtained from the logged-in user.
    //     ✅ Now, user_id is automatically set from the token instead of being manually provided.
    // ✅ Ensures only Organizer or Admin roles can create events.
    try {
        // Extract user_id from the authenticated user's token
        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        const user_id = req.user.id; // User ID from token
        const { title, author, isbn, year, pages, publisher, description, image, price, created_by } = req.body;

        // Ensure that only an Organizer or the Adim can create an event
    
        if (req.user.role_name !== "Admin" && req.user.role_name !== "Librarian") {
            res.status(403).json({ message: "Access denied: Only Admins or Librarians can create books" });
            return;
        }

        // check if book exists
        const titleCheck = await pool.query("SELECT book_id FROM books WHERE title = $1", [title])
    
        if (titleCheck.rows.length > 0) {
            res.status(400).json({
                message: "book already exists"
            })
            return
        }

        // Insert book into the database
        const eventResult = await pool.query(
            `INSERT INTO events (title, author, isbn, year, pages, publisher, description, image, price, created_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [title, author, isbn, year, pages, publisher, description, image, price, created_by]
        );

        res.status(201).json({
            message: "Book created successfully",
            event: eventResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//get all books 
export const getBooks = asyncHandler( async (req: Request, res: Response) => {

    try {
        const result = await pool.query("SELECT * FROM books")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//single book
export const getBookById = asyncHandler( async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT * FROM books WHERE book_id=$1", [id])
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "Book not found"
            })
            return
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error("Error getting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



//update single book 
export const updateBook = asyncHandler( async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, author, isbn, year, pages, publisher, description, image, price, created_by } = req.body;
    try {
        //before updating, check if the event is available 
        const resultCCheck = await pool.query("SELECT * FROM books WHERE book_id=$1", [id])
        if (resultCCheck.rows.length === 0) {
            res.status(404).json({
                message: "Book not found"
            })
            return
        }

        const result = await pool.query(
            "UPDATE books SET title=$1, author =$2, isbn =$3, year=$4, pages=$5, publisher=$6, description=$7, image=$8, price=$9, created_by=$10, updated_at=NOW() WHERE book_id=$11 RETURNING *",
            [title, author, isbn, year, pages, publisher, description, image, price, created_by, id]
        );
        res.json({ message: "Book updated", event: result.rows[0] });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//Delete event 
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        //before deleting, check if the book is available 
        const resultCCheck = await pool.query("SELECT * FROM books WHERE book_id=$1", [id])
        if (resultCCheck.rows.length === 0) {
            res.status(404).json({
                message: "Book not found"
            })
            return
        }
        await pool.query("DELETE FROM books  WHERE book_id=$1", [id])
        res.json({ message: "Book deleted successfully" });

    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})