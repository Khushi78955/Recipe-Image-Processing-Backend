import "dotenv/config";
import app from "./app.js";
import "./config/redis.js";
import "./workers/image.worker.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})