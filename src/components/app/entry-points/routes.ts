import { Router } from "express";
import { LogService } from "../../../lib/logging/log.service";

export class Routes {
    private router: Router;

    constructor(private log: LogService) {
        this.router = Router();
        this.defineRoutes();
    }

    private async defineRoutes(): Promise<void> {}

    public async getRouter(): Promise<Router> {
        return this.router;
    }
}
