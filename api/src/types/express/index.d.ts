import { IUser } from "../../models/User";

import { Request } from "express";

export interface AuthRequest extends Request {
  user: IUser;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
