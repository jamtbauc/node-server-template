import { Router } from "express";
import { LogService } from "../../../lib/logging/log.service";
import { HealthRoutes } from "../../health/api/routes";

export class Routes {
    private router: Router;

    constructor(private log: LogService) {
        this.router = Router();
        this.defineRoutes();
    }

    private async defineRoutes(): Promise<void> {
        this.router.use("/health", await new HealthRoutes(this.log).getRouter());
    }

    public async getRouter(): Promise<Router> {
        return this.router;
    }
}