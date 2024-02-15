// Requisição HTTP e tem a ver com as requisições do usuário
// Fornecer os dados para a API e acessar os endPoints
// Todos Services que vão aparecer no projeto vão conter as requisições e os dados que elas precisam fornecer para o backend e acessar os endpoints da API. Esse é o papel o Service.

import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
    // Executa a função que criada no config e como o cadastro também é um post já vir os dados da própria requisição. Já forma um request.
    const config = requestConfig("POST", data)

    // Verificar se deu erro ou não na requisição.
    try {
        // Vou mandar a minha URL da API + a URL dessa função 
        const res = await fetch(api + "/users/register", config)
            //then onde eu recebo os dados e vou transformar ele em um objeto JavaScript
            .then((res) => res.json())
            //Se der algo de errado vai cair no cath e retornar um erro
            .catch((err) => err);

        // Se eu receber uma resposta eu recebo um usuário e esse usuário é o ID e o token, então vou salvar esses dados na LocalStorage e vou transformar a resposta em string novamente.
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
    } catch (error) {
        console.log(error)
    }
}
// Vou criar um objeto e criar as funções também 
const authService = {
    register
}

export default authService;