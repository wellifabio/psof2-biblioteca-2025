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
    fetch(url + "/alunos", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.status)
        .then((status) => {
            if (status == 201) {
                window.location.reload();
            } else {
                alert("Erro ao enviar dados para a API!");
            }
        });
});

//Obter lista de alunos da API
fetch(url + "/alunos")
    .then((res) => res.json())
    .then((dados) => {
        const corpo = document.querySelector("main tbody");
        dados.forEach((aluno) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td data-label="RA">${aluno.ra}</td>
                <td data-label="Nome">${aluno.nome}</td>
                <td data-label="Telefone">${aluno.telefone}</td>
                <td data-label="Detelhes">
                    <button onclick="showDetalhes('${aluno.ra}')">
                        Detalhes
                    </button>
                </td>
            `;
            corpo.appendChild(tr);
        });
    });

function showDetalhes(ra) {
    const detalhes = document.querySelector("#detalhes form");
    fetch(url + '/alunos/' + ra)
        .then((res) => res.json())
        .then((dados) => {
            detalhes.ra.value = dados[0].ra;
            detalhes.nome.value = dados[0].nome;
            detalhes.telefone.value = dados[0].telefone;
        });
}