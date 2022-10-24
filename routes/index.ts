import { Router } from "express";
import { Test } from "../routes/test";

export class Routes {
    private router: Router = Router();

    constructor() {
        let test = new Test();

        this.router.use("/test/", test.get_router());
    }

    get_router() {
        return this.router;
    }
}