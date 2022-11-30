import { Router } from "express";
import { Log } from "../lib/log";
import { Test } from "../routes/test";

export class Routes {
    private router: Router = Router();

    constructor(private log: Log) {
        let test = new Test();

        this.router.use("/test/", test.get_router());
    }

    get_router() {
        return this.router;
    }
}