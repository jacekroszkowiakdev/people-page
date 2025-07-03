import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import membersRoutes from "./routes/members.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/members", membersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
