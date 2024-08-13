import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProdutoFavoritoController {

  // Criar um Produto Favorito
  public async create(request: Request, response: Response) {
    try {
      const { usuarioId, produtoId } = request.body;
      const newFavorito = await prisma.produtoFavorito.create({
        data: {
          usuarioId,
          produtoId,
        },
      });
      return response.status(201).json({
        message: "Produto favorito criado com sucesso",
        favorito: newFavorito,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  // Obter Produto Favorito por ID
  public async getProdutoFavoritoById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const favorito = await prisma.produtoFavorito.findUnique({
        where: { id: Number(id) },
        include: {
          usuario: true,
          produto: true,
        },
      });

      if (favorito) {
        return response.status(200).json({
          favorito,
          message: "Produto favorito localizado",
        });
      } else {
        return response.status(404).json({
          message: 'Produto favorito não encontrado',
        });
      }
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  // Obter todos os Produtos Favoritos
  public async getAllProdutosFavoritos(request: Request, response: Response) {
    try {
      const favoritos = await prisma.produtoFavorito.findMany({
        include: {
          usuario: true,
          produto: true,
        },
      });
      return response.status(200).json({
        favoritos,
        message: "Produtos favoritos localizados",
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  // Atualizar um Produto Favorito
  public async updateProdutoFavorito(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { usuarioId, produtoId } = request.body;
      const favorito = await prisma.produtoFavorito.update({
        where: { id: Number(id) },
        data: {
          usuarioId,
          produtoId,
        },
      });
      return response.status(200).json({
        favorito,
        message: "Produto favorito atualizado",
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  // Deletar um Produto Favorito
  public async deleteProdutoFavorito(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.produtoFavorito.delete({
        where: { id: Number(id) },
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
}

export const produtoFavoritoController = new ProdutoFavoritoController();
