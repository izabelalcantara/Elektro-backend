import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoriaController {
  
  public async create(request: Request, response: Response) {
    try {
      const { nome } = request.body;
      const newCategoria = await prisma.categoria.create({
        data: {
          nome,
        },
      });
      return response.status(201).json({ 
        message: "Categoria criada com sucesso",
        categoria: newCategoria,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getCategoriaById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const categoria = await prisma.categoria.findUnique({
        where: { id: Number(id) },
      });

      if (categoria) {
        return response.status(200).json({
          categoria,
          message: "Categoria localizada",
        });
      } else {
        return response.status(404).json({ 
          message: 'Categoria não encontrada',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllCategorias(request: Request, response: Response) {
    try {
      const categorias = await prisma.categoria.findMany();
      return response.status(200).json({
        categorias,
        message: "Categorias localizadas",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateCategoria(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome } = request.body;
      const categoria = await prisma.categoria.update({
        where: { id: Number(id) },
        data: {
          nome,
        },
      });
      return response.status(200).json({
        categoria,
        message: "Categoria atualizada",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteCategoria(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.categoria.delete({
        where: { id: Number(id) },
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
}

export const categoriaController = new CategoriaController();
