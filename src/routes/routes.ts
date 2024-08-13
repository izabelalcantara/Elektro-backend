import { Router } from 'express';
import {produtoFavoritoController}  from '../controllers/ProdutoFavorito.controller';
import { vendedorController } from '../controllers/vendedor.controller';
import { userController } from '../controllers/usuario.controller';
import { produtoController } from '../controllers/produto.controller';
import { mensagemController } from '../controllers/Mensagem.controller';
import { enderecoController } from '../controllers/endereco.controller';
import { compradorController } from '../controllers/comprador.controller';
import { compraNoCarrinhoController } from '../controllers/CompraCarrinho.controller';
import { compraController } from '../controllers/Compra.controller';
import { categoriaController } from '../controllers/categoria.controller';
import { carrinhoController } from '../controllers/carrinho.controller';

const router = Router();



//Rotas Produtos favoritos
router.post('/produtos-favoritos', produtoFavoritoController.create);
router.get('/produtos-favoritos/:id', produtoFavoritoController.getProdutoFavoritoById);
router.get('/produtos-favoritos', produtoFavoritoController.getAllProdutosFavoritos);
router.put('/produtos-favoritos/:id', produtoFavoritoController.updateProdutoFavorito);
router.delete('/produtos-favoritos/:id', produtoFavoritoController.deleteProdutoFavorito);

//Rotas vendedor
router.post('/vendedores', vendedorController.create);
router.get('/vendedores/:id', vendedorController.getVendedorById);
router.get('/vendedores', vendedorController.getAllVendedores);
router.put('/vendedores/:id', vendedorController.updateVendedor);
router.delete('/vendedores/:id', vendedorController.deleteVendedor);

//Rotas Usuários
router.post('/usuarios', userController.create);
router.get('/usuarios/:id', userController.getUserById);
router.get('/usuarios', userController.getAllUsers);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);


//Rotas Produtos
router.post('/produtos', produtoController.create);
router.get('/produtos/:id', produtoController.getProdutoById);
router.get('/produtos', produtoController.getAllProdutos);
router.put('/produtos/:id', produtoController.updateProduto);
router.delete('/produtos/:id', produtoController.deleteProduto);

// Rotas Mensagens
router.post('/mensagens', mensagemController.create);
router.get('/mensagens/:id', mensagemController.getMensagemById);
router.get('/mensagens', mensagemController.getAllMensagens);
router.put('/mensagens/:id', mensagemController.updateMensagem);
router.delete('/mensagens/:id', mensagemController.deleteMensagem);

// Rotas Endereços
router.post('/enderecos', enderecoController.create);
router.get('/enderecos/:id', enderecoController.getEnderecoById);
router.get('/enderecos', enderecoController.getAllEnderecos);
router.put('/enderecos/:id', enderecoController.updateEndereco);
router.delete('/enderecos/:id', enderecoController.deleteEndereco);


// Rotas Compradores
router.post('/compradores', compradorController.create);
router.get('/compradores/:id', compradorController.getCompradorById);
router.get('/compradores', compradorController.getAllCompradores);
router.put('/compradores/:id', compradorController.updateComprador);
router.delete('/compradores/:id', compradorController.deleteComprador);

// Rotas Compras no Carrinho
router.post('/compras-no-carrinho', compraNoCarrinhoController.create);
router.get('/compras-no-carrinho/:id', compraNoCarrinhoController.getCompraNoCarrinhoById);
router.get('/compras-no-carrinho', compraNoCarrinhoController.getAllComprasNoCarrinho);
router.put('/compras-no-carrinho/:id', compraNoCarrinhoController.updateCompraNoCarrinho);
router.delete('/compras-no-carrinho/:id', compraNoCarrinhoController.deleteCompraNoCarrinho);

// Rotas Compras
router.post('/compras', compraController.create);
router.get('/compras/:id', compraController.getCompraById);
router.get('/compras', compraController.getAllCompras);
router.put('/compras/:id', compraController.updateCompra);
router.delete('/compras/:id', compraController.deleteCompra);

// Rotas Categorias
router.post('/categorias', categoriaController.create);
router.get('/categorias/:id', categoriaController.getCategoriaById);
router.get('/categorias', categoriaController.getAllCategorias);
router.put('/categorias/:id', categoriaController.updateCategoria);
router.delete('/categorias/:id', categoriaController.deleteCategoria);

// Rotas Carrinhos
router.post('/carrinhos', carrinhoController.create);
router.get('/carrinhos/:id', carrinhoController.getCarrinhoById);
router.get('/carrinhos', carrinhoController.getAllCarrinhos);
router.put('/carrinhos/:id', carrinhoController.updateCarrinho);
router.delete('/carrinhos/:id', carrinhoController.deleteCarrinho);


export default router;

