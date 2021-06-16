import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';
 
class DeletarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {},
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`https://prova-p1-backend.herokuapp.com/produtos/`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Usuário</legend>
                    <div className="produto-delete">
                        <label htmlFor="nome">{this.state.produto.nome} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>
 
                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/produtos`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { id } = this.props.match.params;
 
        fetch(`https://prova-p1-backend.herokuapp.com/produtos/${id}`, {
            method: "delete"
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default DeletarProduto;