import type { Request, Response, NextFunction } from "express";

import type * as zod from "zod";
import { fromError } from 'zod-validation-error';

type RequetsSection = "body" | "query" | "params";

export const validate =
  (schema: zod.ZodTypeAny, section: RequetsSection) =>
  (req: Request, res: Response, next: NextFunction) => {

    if(!["body", "query", "params"].includes(section)) {
      return res.status(400).json({ error: "Invalid request section" });
    }

    try {
      schema.parse(req[section]);

      next();
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: fromError(error).toString() });
    }
  };
