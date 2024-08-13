import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CompraController {
  
  public async create(request: Request, response: Response) {
    try {
      const { compradorId, carrinhoId, valorTotal, dataCompra } = request.body;
  
      
      const newCompra = await prisma.compra.create({
        data: {
          compradorId,
          carrinhoId,
          valorTotal,    
          dataCompra: new Date(dataCompra),  
        },
      });
  
      return response.status(201).json({
        message: "Compra criada com sucesso",
        compra: newCompra,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getCompraById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const compra = await prisma.compra.findUnique({
        where: { id: Number(id) },
      });

      if (compra) {
        return response.status(200).json({
          compra,
          message: "Compra localizada",
        });
      } else {
        return response.status(404).json({ 
          message: 'Compra não encontrada',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllCompras(request: Request, response: Response) {
    try {
      const compras = await prisma.compra.findMany();
      return response.status(200).json({
        compras,
        message: "Compras localizadas",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateCompra(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { compradorId, valorTotal, dataCompra } = request.body;
      const compra = await prisma.compra.update({
        where: { id: Number(id) },
        data: {
          compradorId,
          valorTotal,
          dataCompra: new Date(dataCompra),
        },
      });
      return response.status(200).json({
        compra,
        message: "Compra atualizada",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteCompra(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.compra.delete({
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

export const compraController = new CompraController();
