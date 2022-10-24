import { Request, Response, Router } from "express";

export class Test {
    router: Router = Router();

     constructor() {
        this.router.get("/", (req: Request, res: Response): void => {
            res.send("Test root route visited!");
        });

        this.router.get("/info", (req: Request, res: Response): void => {
            res.send("Test info page reached!");
        });
    }

    get_router() {
        return this.router;
    }
}