import express from "express";
const app = express();
app.use(express.json());

import recipeRoutes from "./routes/recipe.routes.js";

app.get("/", (req, res) => {
    res.send("Recipe Image Processing Backend API");
})
app.use("/api/v1/recipes", recipeRoutes);

export default app;