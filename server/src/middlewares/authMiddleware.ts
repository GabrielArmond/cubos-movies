import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/express';

const prisma = new PrismaClient();

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        if (!process.env.JWT_SECRET) {
          res.status(500).json({ message: 'JWT secret not configured' });
          return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
        });

        if (!user) {
          res.status(401).json({ message: 'User not found' });
          return;
        }

        req.user = {
          ...user,
          password: '',
        };

        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token provided' });
      return;
    }
  },
);
