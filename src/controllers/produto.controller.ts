import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProdutoController {
  
  public async create(request: Request, response: Response) {
    try {
      const { nome, descricao, valor, quantidade, categoriaId, vendedorId } = request.body;
      const newProduto = await prisma.produto.create({
        data: {
          nome,
          descricao,
          valor,
          quantidade,
          categoriaId,
          vendedorId,
        },
      });
      return response.status(201).json({ 
        message: "Produto criado com sucesso",
        produto: newProduto,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getProdutoById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
      });

      if (produto) {
        return response.status(200).json({
          produto,
          message: "Produto localizado",
        });
      } else {
        return response.status(404).json({ 
          message: 'Produto não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllProdutos(request: Request, response: Response) {
    try {
      const produtos = await prisma.produto.findMany();
      return response.status(200).json({
        produtos,
        message: "Produtos localizados",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateProduto(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, descricao, valor, quantidade, categoriaId, vendedorId } = request.body;
      const produto = await prisma.produto.update({
        where: { id: Number(id) },
        data: {
          nome,
          descricao,
          valor,
          quantidade,
          categoriaId,
          vendedorId,
        },
      });
      return response.status(200).json({
        produto,
        message: "Produto atualizado",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteProduto(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.produto.delete({
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

export const produtoController = new ProdutoController();
