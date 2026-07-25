import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Recipe Image Processing API",
            version: "1.0.0",
            description: "API documentation for the Recipe Image Processing Backend",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                Recipe: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        title: {
                            type: "string",
                            example: "Chicken Curry",
                        },
                        description: {
                            type: "string",
                            example: "Delicious homemade chicken curry.",
                        },
                        imageUrl: {
                            type: "string",
                            example: "1785008629532-zgg1r0rj4bc.jpeg",
                        },
                        processedImage: {
                            type: "string",
                            nullable: true,
                            example: "uploads/processed/1785008629532-zgg1r0rj4bc.jpeg",
                        },
                        thumbnailImage: {
                            type: "string",
                            nullable: true,
                            example: "uploads/thumbnails/1785008629532-zgg1r0rj4bc.jpeg",
                        },
                        status: {
                            type: "string",
                            example: "completed",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;