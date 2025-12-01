// src/controllers/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../models/product.model';

export const productController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.findAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      const product = await productService.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateProductDTO;

      if (!body.name || body.price == null) {
        return res.status(400).json({ message: 'name y price son obligatorios' });
      }

      const newProduct = await productService.create(body);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      const body = req.body as UpdateProductDTO;
      const updated = await productService.update(id, body);

      if (!updated) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      const deleted = await productService.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};