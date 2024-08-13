import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class EnderecoController {
  
  public async create(request: Request, response: Response) {
    try {
      const { cep, logradouro, numero, complemento, bairro, cidade, estado, usuarioId } = request.body;
      const newEndereco = await prisma.endereco.create({
        data: {
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          usuarioId,
        },
      });
      return response.status(201).json({ 
        message: "Endereço criado com sucesso",
        endereco: newEndereco,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getEnderecoById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const endereco = await prisma.endereco.findUnique({
        where: { id: Number(id) },
      });

      if (endereco) {
        return response.status(200).json({
          endereco,
          message: "Endereço localizado",
        });
      } else {
        return response.status(404).json({ 
          message: 'Endereço não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllEnderecos(request: Request, response: Response) {
    try {
      const enderecos = await prisma.endereco.findMany();
      return response.status(200).json({
        enderecos,
        message: "Endereços localizados",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateEndereco(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { cep, logradouro, numero, complemento, bairro, cidade, estado, usuarioId } = request.body;
      const endereco = await prisma.endereco.update({
        where: { id: Number(id) },
        data: {
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          usuarioId,
        },
      });
      return response.status(200).json({
        endereco,
        message: "Endereço atualizado",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteEndereco(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.endereco.delete({
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

export const enderecoController = new EnderecoController();
