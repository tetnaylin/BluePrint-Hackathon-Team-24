import express, {Request, Response} from "express";
import jwt from "jsonwebtoken"
import { authenticateStudent } from "./auth";


const EXPRESS_PORT = 3000;
const UNAUTHORIZED = 401;
const app = express();

app.use(express.json());


app.listen(EXPRESS_PORT, () => {
    console.log(`Server listening on port ${EXPRESS_PORT}`);
})

app.get("/login", (req: Request, res: Response) => {
    const { zID, password } = req.body;
    if (!authenticateStudent(zID, password)) return res.status(401);

    const user = {userId: 123} // Replace with function to get user info

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken});
})