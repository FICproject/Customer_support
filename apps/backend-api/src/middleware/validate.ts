import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Express middleware for validating request body with Zod schemas.
 * Returns structured 400 Bad Request with precise field errors if validation fails.
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData; // Assign validated & sanitized data
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
          code: e.code
        }));
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors
        });
      }
      return res.status(500).json({ success: false, error: 'Internal schema parsing error' });
    }
  };
};

/**
 * Express middleware for validating query parameters with Zod schemas.
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = schema.parse(req.query);
      req.query = parsedQuery as any;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e: any) => ({
          param: e.path.join('.'),
          message: e.message
        }));
        return res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
          details: errors
        });
      }
      return res.status(500).json({ success: false, error: 'Internal query parsing error' });
    }
  };
};

