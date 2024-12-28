import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
    try{
        const book = await Book.find();
        res.status(200).json(book);
    }catch(error){
        console.log("Error: ",error);
        res.status(500).json(error);
    }
}

// const updatedEmployee = await Employee.findOneAndUpdate(
//     { _id: id }, // Find the employee with the given ID
//     { name, position, salary }, // The fields to update
//     { new: true } // Return the updated document
//   );

export const updatePrice = async (req, res) => {
    try {
        const { name } = req.body;

        // Find the book and update its price by adding 1
        const book = await Book.findOneAndUpdate(
            { name: name },                 // Find book by name
            { $inc: { price: 1 } },         // Increment the price by 1
            { new: true }                   // Return the updated document
        );

        if (!book) {
            return res.status(400).json({ message: "Book does not exist" });
        } else {
            return res.status(200).json({book:{price: book.price}});  // Return the updated book
        }
    } catch (error) {
        return res.status(500).json({ message: "Error in updating" });
    }
};
