import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rucks Plug API",
            version: "1.0.0",
            description: "A professional finance-related backend API for Rucks Plug.",
        },
        servers: [
            {
                url: "http://localhost:5000/api/v1",
                description: "Development server",
            },
        ],
        tags: [
            { name: "Users", description: "User management and authentication" },
            { name: "Investments", description: "Investment tracking" },
            { name: "Loans", description: "Loan management" },
            { name: "Collateral", description: "Collateral management" },
            { name: "Repayments", description: "Repayment tracking" },
            { name: "Reports", description: "Financial reporting and analysis" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/modules/**/*.ts", "./src/routes.ts"], // files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
