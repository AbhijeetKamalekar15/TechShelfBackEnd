import express from "express";
import { getBook, updatePrice} from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.put("/updateprice", updatePrice);



  

export default router;