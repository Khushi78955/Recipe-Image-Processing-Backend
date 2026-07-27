# 🍽️ Recipe Image Processing Backend

A production-ready REST API built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, **Prisma**, **BullMQ**, **Redis**, and **Sharp**.

This project allows users to upload recipe images, create recipes, and process images asynchronously in the background. Uploaded images are resized and optimized using Sharp while BullMQ and Redis handle background jobs.

---

## 🚀 Features

- RESTful Recipe API
- Image Upload using Multer
- Background Image Processing with BullMQ
- Redis-backed Job Queue
- Image Optimization with Sharp
- Thumbnail Generation
- PostgreSQL Database
- Prisma ORM
- Zod Request Validation
- Swagger API Documentation
- Helmet Security Middleware
- Compression Middleware
- Rate Limiting
- Pagination
- Search Recipes
- Filter Recipes
- Sort Recipes
- Static Image Serving

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma
- Redis
- BullMQ
- Sharp
- Multer
- Zod
- Swagger (OpenAPI)
- Helmet
- Compression
- Express Rate Limit

---

## 📁 Project Structure

```
src/
│
├── config/
├── controllers/
├── middlewares/
├── queues/
├── routes/
├── services/
├── workers/
├── db/
├── app.ts
└── server.ts

prisma/
uploads/
```

---

## ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=3000

DATABASE_URL=postgresql://username:password@localhost:5432/recipe_image_processing_db

REDIS_URL=redis://127.0.0.1:6379
```

---

## 📦 Installation

Clone the repository.

```bash
git clone https://github.com/Khushi78955/Recipe-Image-Processing-Backend.git
```

Move into the project.

```bash
cd Recipe-Image-Processing-Backend
```

Install dependencies.

```bash
npm install
```

---

## 🗄 Database Setup

Create a PostgreSQL database.

```sql
CREATE DATABASE recipe_image_processing_db;
```

Run Prisma migrations.

```bash
npx prisma migrate dev
```

Generate Prisma Client.

```bash
npx prisma generate
```

---

## ▶️ Run Redis

If using Homebrew:

```bash
brew services start redis
```

Or run manually.

```bash
redis-server
```

---

## ▶️ Start Development Server

```bash
npm run dev
```

---

## 📖 API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

---

## 📌 API Endpoints

### Upload

```
POST /api/v1/recipes/upload
```

Upload an image before creating a recipe.

---

### Recipes

```
GET    /api/v1/recipes
GET    /api/v1/recipes/:id
POST   /api/v1/recipes
PUT    /api/v1/recipes/:id
DELETE /api/v1/recipes/:id
```

Supports:

- Pagination
- Search
- Sorting
- Filtering

---

## 🖼 Image Processing Pipeline

1. Upload image
2. Store original image
3. Create recipe
4. Add processing job to BullMQ
5. Worker picks up the job
6. Sharp creates:
   - Optimized Image
   - Thumbnail
7. Database updated with processed image paths

---

## 📂 Upload Directories

```
uploads/

├── originals/
├── processed/
└── thumbnails/
```

---

## 🔒 Security

- Helmet
- Rate Limiting
- Request Validation using Zod
- Environment Variable Validation
- Safe File Upload Handling

---

## ⚡ Performance

- Compression Middleware
- Background Job Processing
- Redis Queue
- Optimized Image Processing

---

## 🧪 Example Workflow

1. Upload an image.
2. Receive generated filename.
3. Create a recipe using the uploaded filename.
4. Worker processes the image.
5. Recipe status changes from:

```
pending
```

to

```
completed
```

---

## 👨‍💻 Author

**Khushi**

GitHub:
https://github.com/Khushi78955

---

## 📄 License

This project is licensed under the MIT License.
