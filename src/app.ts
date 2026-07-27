import express from "express";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import recipeRoutes from "./routes/recipe.routes.js";

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later.",
    },
});
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(express.json());


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
    res.send("Recipe Image Processing Backend API");
})
app.use("/api/v1/recipes", recipeRoutes);

export default app;