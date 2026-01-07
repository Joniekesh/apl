import { Router } from "express";
import { sayHello } from "../controllers/helloController";

const router: Router = Router();

router.get("/", sayHello);

export default router;
