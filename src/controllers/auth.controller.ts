import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { RegisterUserDTO, LoginUserDTO } from '../models/user.model';
import { signToken } from '../helpers/jwt';
import { AuthRequest } from '../middlewares/auth';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as RegisterUserDTO;

      if (!body.name || !body.email || !body.password) {
        return res
          .status(400)
          .json({ message: 'Nombre, email y contraseña son obligatorios' });
      }

      const user = await userService.register(body);
      const token = signToken(user);

      res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as LoginUserDTO;

      if (!body.email || !body.password) {
        return res
          .status(400)
          .json({ message: 'Email y contraseña son obligatorios' });
      }

      const user = await userService.findByEmail(body.email);
      if (!user) {
        return res.status(401).json({ message: 'Email inválido' });
      }

      const isValid = await userService.validatePassword(user, body.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Contraseña inválida' });
      }

      const token = signToken(user);

      res.json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  me: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
      }

      // por ahora solo devolvemos lo del token, ya suficiente
      res.json({
        userId: req.user.userId,
        role: req.user.role,
      });
    } catch (err) {
      next(err);
    }
  },
};
