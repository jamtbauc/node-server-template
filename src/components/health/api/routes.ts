import { NextFunction, Request, Response, Router } from "express";
import { Logger } from "winston";

export class HealthRoutes {
	private _router: Router;

	constructor(private log: Logger) {
		this._router = Router();
		this.defineRoutes(this.router);
	}

	private async defineRoutes(router: Router): Promise<void> {
		router.get(
			"/testService",
			async (req: Request, res: Response, next: NextFunction) => {
				this.log.info(`GET request to: ${req.url}`);
				try {
					res.status(500).send("OK");
				} catch (err: unknown) {
					next(err);
				}
			}
		);
	}

	// Getter
	public get router(): Router {
		if (this._router !== undefined) {
			return this._router;
		} else {
			throw new Error(`Attempting to get undefined router from HealthRoutes!`);
		}
	}
}
