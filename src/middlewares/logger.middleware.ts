import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, url } = req;

    res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        
        // Color coding for status
        let statusColor = "\x1b[32m"; // Green
        if (status >= 400 && status < 500) statusColor = "\x1b[33m"; // Yellow
        if (status >= 500) statusColor = "\x1b[31m"; // Red

        const resetColor = "\x1b[0m";
        const timestamp = new Date().toISOString();

        console.log(
            `[${timestamp}] ${method} ${url} ${statusColor}${status}${resetColor} - ${duration}ms`
        );
    });

    next();
};
