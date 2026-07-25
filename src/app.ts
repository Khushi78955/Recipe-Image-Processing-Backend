import express from "express";
import path from "path";

import recipeRoutes from "./routes/recipe.routes.js";

const app = express();

app.use(express.json());


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
    res.send("Recipe Image Processing Backend API");
})
app.use("/api/v1/recipes", recipeRoutes);

export default app;