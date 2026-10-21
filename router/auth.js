import express from "express";
const router = express.Router();
import {Login, register} from "../controller/auth.js"
import { protect } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateZod.js";
import { createUserSchema } from "../schemas/userSchema.js";

router.post('/register',validate(createUserSchema),register)
router.post("/login",Login)

router.get('/profile',protect,(req,res)=>{
    console.log(req.user)
    res.json(req.user)
})
export default router;
