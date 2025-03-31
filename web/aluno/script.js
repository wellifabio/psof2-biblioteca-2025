url = "http://localhost:3001";

//Obter títulos da API
fetch(url)
    .then((res) => res.json())
    .then((dados) => {
        document.querySelector("title").innerHTML = dados.titulo;
        document.querySelector("header h1").innerHTML = dados.titulo;
    })

//Enviar dados de cadastro para a API
const cadastro = document.querySelector("#cadastro form");
cadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        ra: cadastro.ra.value,
        nome: cadastro.nome.value,
        telefone: cadastro.telefone.value,
    }
    fetch(url+"/aluno", {
        method: "POST",
        header:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then((res) => res.json())
});
