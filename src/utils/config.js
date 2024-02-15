// O config é o arquivo que vai ser responsável pelas requisições HTTP do nosso projeto.
// Ele vai conter várias requisições: de GET, PUSH, DELETE
// URL DA NOSSA API
export const api = 'http://localhost:5000/api'
// URL DO UPLOAD (as imagens do projeto virão para cá)
export const uploads = "http://localhost:5000/uploads"
// Vou precisar saber quale é o método da requisição, quais dados estão sendo enviados, o token, porque vamos ter requisições autenticadas ou não, e também imagens
export const requestConfig = (method, data, token = null, image = null) => {
    // criamos uma variável 'config' que não foi iniciada com nada
    let config
    // Aqui eu estou dizendo que o config vai ser formado por um objeto (Form Data)
    if (image) {
        config = {
            method,
            body: data,
            headers: {}
        }
        // Verifico se o método é um DELETE ou se eu não tenho dados (como por exemplo na função de like)
    } else if (method === "DELETE" || data === null) {

        config = {
            method,
            headers: {},
        };
        // Quando vierem DADOS eu vou trabalhar da seguinte forma
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }
    }
    // Verifico se veio o token
    if (token) {
        // Coloco o token nos headers
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Esse é o objeto de configuração das requisições que vai dar um adianto muito grande pra gente, já que o projeto tem muitas funcionalidades.
    return config;
}