import { Router } from "express";
import { Logger } from "winston";
import { HealthRoutes } from "../../health/api/routes";

export class Routes {
    private _router: Router;

    constructor(private log: Logger) {
        this._router = Router();
        this.defineRoutes(this.router);
    }

    private async defineRoutes(router: Router): Promise<void> {
        router.use("/health", new HealthRoutes(this.log).router);
    }

    // Getter
    public get router(): Router {
        if (this._router) {
            return this._router;
        } else {
            throw new Error(`Attempting to get undefined router from Routes!`);
        }
    }
}
