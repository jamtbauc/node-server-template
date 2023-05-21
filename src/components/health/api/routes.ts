import { NextFunction, Request, Response, Router } from "express";
import { LogService } from "../../../lib/logging/log.service";

export class HealthRoutes {
    private router: Router;

    constructor(private log: LogService) {
        this.router = Router();
        this.defineRoutes();
    }

    public async getRouter(): Promise<Router> {
        return this.router;
    }

    private async defineRoutes(): Promise<void> {
        this.router.get("/testService", async (req: Request, res: Response, next: NextFunction) => {
            await this.log.info(`GET request to: ${req.url}`);
            try {
                res.status(500).send("OK");
            } catch (err: unknown) {
                next(err);
            }
        });
    }
}