import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';


dotenv.config();

const app = express();

app.use(compression())

app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: process.env.DATA_LIMIT }));

app.use(express.urlencoded({ extended: true, limit: process.env.DATA_LIMIT }));

app.use(express.static("public"));

app.use(cookieParser());

// Routes
///////////////////////////////////////////////////////////////
import userRouter from "./routes/user/user.route.js";
import notificationRouter from "./routes/notification/notification.route.js";
import jobRouter from "./routes/post/jobPost.route.js";
import resultRouter from "./routes/post/resultPost.route.js";
import admitCardRouter from "./routes/post/admitCard.route.js";
import answerKeyRouter from "./routes/post/answerKey.route.js";
import admissionRouter from "./routes/post/admission.route.js";
import upcommingRouter from "./routes/post/upcomming.route.js";
import statejobRouter from "./routes/post/statejob.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notifiction", notificationRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/admitCard", admitCardRouter);
app.use("/api/v1/answerKey", answerKeyRouter);
app.use("/api/v1/admission", admissionRouter);
app.use("/api/v1/upcomming", upcommingRouter);
app.use("/api/v1/statejob", statejobRouter);

export { app };