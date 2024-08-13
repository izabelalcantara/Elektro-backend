import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CarrinhoController {

  public async create(request: Request, response: Response) {
    try {
      const { compradorId, produtos, precoTotal, quantidade } = request.body;
  
      const newCarrinho = await prisma.carrinho.create({
        data: {
          compradorId,
          precoTotal,
          quantidade,
          produtos: {
            create: produtos.map((produto: { produtoId: number; quantidade: number }) => ({
              produtoId: produto.produtoId,
              quantidade: produto.quantidade,
            })),
          },
        },
      });
  
      return response.status(201).json({
        message: "Carrinho criado com sucesso",
        carrinho: newCarrinho,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
  

  public async getCarrinhoById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const carrinho = await prisma.carrinho.findUnique({
        where: { id: Number(id) },
        include: { produtos: true }, 
      });

      if (carrinho) {
        return response.status(200).json({
          carrinho,
          message: "Carrinho localizado",
        });
      } else {
        return response.status(404).json({
          message: 'Carrinho não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllCarrinhos(request: Request, response: Response) {
    try {
      const carrinhos = await prisma.carrinho.findMany({
        include: { produtos: true }, 
      });
      return response.status(200).json({
        carrinhos,
        message: "Carrinhos localizados",
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateCarrinho(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { compradorId, produtos } = request.body;

      const updatedCarrinho = await prisma.carrinho.update({
        where: { id: Number(id) },
        data: {
          compradorId,
        },
      });

      await prisma.produtoNoCarrinho.deleteMany({
        where: { carrinhoId: Number(id) },
      });

      const updatedProdutos = await Promise.all(
        produtos.map(async (produto: { produtoId: number; quantidade: number }) => {
          return prisma.produtoNoCarrinho.create({
            data: {
              carrinhoId: Number(id),
              produtoId: produto.produtoId,
              quantidade: produto.quantidade,
            },
          });
        })
      );

      return response.status(200).json({
        carrinho: updatedCarrinho,
        produtos: updatedProdutos,
        message: "Carrinho atualizado",
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

 


  public async deleteCarrinho(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.carrinho.delete({
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

export const carrinhoController = new CarrinhoController();
