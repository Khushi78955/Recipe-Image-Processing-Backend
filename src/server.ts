import "dotenv/config";
import app from "./app.js";
import "./config/redis.js";
import "./workers/image.worker.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})