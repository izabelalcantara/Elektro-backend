import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CompraNoCarrinhoController {

  public async create(request: Request, response: Response) {
    try {
      const { produtoId, carrinhoId, quantidade } = request.body;
      const newCompraNoCarrinho = await prisma.produtoNoCarrinho.create({
        data: {
          produtoId,
          carrinhoId,
          quantidade,
        },
      });
      return response.status(201).json({
        message: "Compra no carrinho criada com sucesso",
        compraNoCarrinho: newCompraNoCarrinho,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getCompraNoCarrinhoById(request: Request, response: Response) {
    try {
      const { produtoId, carrinhoId } = request.params;
      const compraNoCarrinho = await prisma.produtoNoCarrinho.findUnique({
        where: {

           carrinhoId_produtoId: {
            produtoId: Number(produtoId),
            carrinhoId: Number(carrinhoId),
          },
        },
      });
  
      if (compraNoCarrinho) {
        return response.status(200).json({
          compraNoCarrinho,
          message: "Compra no carrinho localizada",
        });
      } else {
        return response.status(404).json({
          message: 'Compra no carrinho não encontrada',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
  
  public async getAllComprasNoCarrinho(request: Request, response: Response) {
    try {
      const comprasNoCarrinho = await prisma.produtoNoCarrinho.findMany();
      return response.status(200).json({
        comprasNoCarrinho,
        message: "Compras no carrinho localizadas",
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateCompraNoCarrinho(request: Request, response: Response) {
    try {
      const { produtoId, carrinhoId } = request.params;
      const { quantidade } = request.body;
      const compraNoCarrinho = await prisma.produtoNoCarrinho.update({
        where: {
          carrinhoId_produtoId: {
            produtoId: Number(produtoId),
            carrinhoId: Number(carrinhoId),
          }
        },
        data: {
          quantidade,
        },
      });
      return response.status(200).json({
        compraNoCarrinho,
        message: "Compra no carrinho atualizada",
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteCompraNoCarrinho(request: Request, response: Response) {
    try {
      const { produtoId, carrinhoId } = request.params;
      await prisma.produtoNoCarrinho.delete({
        where: {
          carrinhoId_produtoId: {
            produtoId: Number(produtoId),
            carrinhoId: Number(carrinhoId),
          }
        },
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

export const compraNoCarrinhoController = new CompraNoCarrinhoController();
