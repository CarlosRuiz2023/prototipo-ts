import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

const validarCampos = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
    return;
  }

  next();
};

export { validarCampos };
