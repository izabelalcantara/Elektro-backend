import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class UserController {
  
  public async create(request: Request, response: Response) {
    try {
      const { cpf, primeiroNome, sobrenome, email, senha, telefone,  } = request.body;
      const newUser = await prisma.usuario.create({
        data: {
          cpf,
          primeiroNome,
          sobrenome,
          email,
          senha,
          telefone,
          
        },
      });
      return response.status(201).json({ 
        message: "Usuário criado com sucesso",
        user: newUser,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.usuario.findUnique({
        where: { id: Number(id) },
        include: {
          endereco: true,
          vendedor: true,
          comprador: true,
          mensagensEnviadas: true,
          mensagensRecebidas: true,
        },
      });

      if (user) {
        return response.status(200).json({
          user,
          message: "Usuário localizado",
        });
      } else {
        return response.status(404).json({ 
          message: 'Usuário não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllUsers(request: Request, response: Response) {
    try {
      const users = await prisma.usuario.findMany({
        include: {
          endereco: true,
          vendedor: true,
          comprador: true,
          mensagensEnviadas: true,
          mensagensRecebidas: true,
        },
      });
      return response.status(200).json({
        users,
        message: "Usuários localizados",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { cpf, primeiroNome, sobrenome, email, senha, telefone, imagemPerfil } = request.body;
      const user = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
          cpf,
          primeiroNome,
          sobrenome,
          email,
          senha,
          telefone,
          imagemPerfil,
        },
      });
      return response.status(200).json({
        user,
        message: "Usuário atualizado",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.usuario.delete({
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

export const userController = new UserController();
