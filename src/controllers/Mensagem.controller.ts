import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MensagemController {
  
  public async create(request: Request, response: Response) {
    try {
      const { remetenteId, destinatarioId, conteudo } = request.body;
      
      if (isNaN(remetenteId) || isNaN(destinatarioId)) {
        return response.status(400).json({ message: 'IDs inválidos.' });
      }
  
      const newMensagem = await prisma.mensagem.create({
        data: {
          remetente: { connect: { id: Number(remetenteId) } }, 
          destinatario: { connect: { id: Number(destinatarioId) } }, 
          conteudo,
        },
      });
  
      return response.status(201).json({
        message: "Mensagem criada com sucesso",
        mensagem: newMensagem,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
  
  

  public async getMensagemById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const mensagem = await prisma.mensagem.findUnique({
        where: { id: Number(id) },
      });

      if (mensagem) {
        return response.status(200).json({
          mensagem,
          message: "Mensagem localizada",
        });
      } else {
        return response.status(404).json({ 
          message: 'Mensagem não encontrada',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllMensagens(request: Request, response: Response) {
    try {
      const mensagens = await prisma.mensagem.findMany();
      return response.status(200).json({
        mensagens,
        message: "Mensagens localizadas",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateMensagem(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { conteudo } = request.body;
      const mensagem = await prisma.mensagem.update({
        where: { id: Number(id) },
        data: {
          conteudo,
        },
      });
      return response.status(200).json({
        mensagem,
        message: "Mensagem atualizada",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteMensagem(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.mensagem.delete({
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

export const mensagemController = new MensagemController();
