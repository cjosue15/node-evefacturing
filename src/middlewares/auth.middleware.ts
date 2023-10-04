import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";
import { UserModel } from "../data";

export class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: "Invalid token" });

      // TODO: Validate if the user is active

      req.body.user = user;

      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
