import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class VendedorController {
  
  public async create(request: Request, response: Response) {
    try {
      const { usuarioId } = request.body;
      const newVendedor = await prisma.vendedor.create({
        data: {
          usuarioId,
        },
      });
      return response.status(201).json({ 
        message: "Vendedor criado com sucesso",
        vendedor: newVendedor,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getVendedorById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const vendedor = await prisma.vendedor.findUnique({
        where: { id: Number(id) },
      });

      if (vendedor) {
        return response.status(200).json({
          vendedor,
          message: "Vendedor localizado",
        });
      } else {
        return response.status(404).json({ 
          message: 'Vendedor não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllVendedores(request: Request, response: Response) {
    try {
      const vendedores = await prisma.vendedor.findMany();
      return response.status(200).json({
        vendedores,
        message: "Vendedores localizados",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateVendedor(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { usuarioId } = request.body;
      const vendedor = await prisma.vendedor.update({
        where: { id: Number(id) },
        data: {
          usuarioId,
        },
      });
      return response.status(200).json({
        vendedor,
        message: "Vendedor atualizado",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteVendedor(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.vendedor.delete({
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

export const vendedorController = new VendedorController();
