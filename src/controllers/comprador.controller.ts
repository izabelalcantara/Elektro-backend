import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CompradorController {
  
  public async create(request: Request, response: Response) {
    try {
      const { usuarioId } = request.body;
      const newComprador = await prisma.comprador.create({
        data: {
          usuarioId,
        },
      });
      return response.status(201).json({ 
        message: "Comprador criado com sucesso",
        comprador: newComprador,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getCompradorById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const comprador = await prisma.comprador.findUnique({
        where: { id: Number(id) },
      });

      if (comprador) {
        return response.status(200).json({
          comprador,
          message: "Comprador localizado",
        });
      } else {
        return response.status(404).json({ 
          message: 'Comprador não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllCompradores(request: Request, response: Response) {
    try {
      const compradores = await prisma.comprador.findMany();
      return response.status(200).json({
        compradores,
        message: "Compradores localizados",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateComprador(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { usuarioId } = request.body;
      const comprador = await prisma.comprador.update({
        where: { id: Number(id) },
        data: {
          usuarioId,
        },
      });
      return response.status(200).json({
        comprador,
        message: "Comprador atualizado",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteComprador(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.comprador.delete({
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

export const compradorController = new CompradorController();
