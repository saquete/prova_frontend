import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Produto extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`https://prova-p1-backend.herokuapp.com/produtos/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto, index } = this.state;
 
        if (produto.ativo) {
            produto.ativo = "Produto Ativo";
        } else {
            produto.ativo = "Produto Inativo";
        }
 
        return (
            <div className="produto-info">
                <h1><label htmlFor="nome"> Nome do Produto: </label> {produto.nome} </h1>
                <h1> {produto.ativo} </h1>
                <h1><label htmlFor="preco">  Preço do Produto: </label> {produto.preco} </h1>
                <h1><label htmlFor="quantidade">Quantidade do Produto: </label> {produto.quantidade} </h1>
                <h1> <label htmlFor="descricao">  Descrição do Produto: </label>{produto.descricao} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
