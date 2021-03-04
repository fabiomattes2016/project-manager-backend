import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const authenticate = (request: Request, response: Response, next: NextFunction): Promise<any> | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    throw new AppError('Erro no Token', 401);
  }

  const [ scheme, token ] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError('Token malformatado', 401);
  }

  try {
    const decoded = verify(token, String(process.env.APP_SECRET));
    request.headers.userId = decoded.userId;

    next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
};

export default authenticate;