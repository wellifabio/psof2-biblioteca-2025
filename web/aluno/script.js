url = "http://localhost:3001";

//Objetos tipo formulário do DOM
const detalhes = document.querySelector("#det form");
const cadastro = document.querySelector("#cad form");
const emprestimos = document.querySelector("#det tbody");

//Obter títulos da API
fetch(url)
    .then((res) => res.json())
    .then((dados) => {
        document.querySelector("title").innerHTML = dados.titulo;
        document.querySelector("header h1").innerHTML = dados.titulo;
    })

//Enviar dados de cadastro para a API
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

//Preencher o formulário de detalhes com os dados do aluno
function showDetalhes(ra) {
    det.classList.remove('oculto');
    fetch(url + '/alunos/' + ra)
        .then((res) => res.json())
        .then((dados) => {
            detalhes.ra.value = dados[0].ra;
            detalhes.nome.value = dados[0].nome;
            detalhes.telefone.value = dados[0].telefone;
            emprestimos.innerHTML = "";
            dados[0].emprestimos.forEach((emp) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td data-label="ID">${emp.id}</td>
                    <td data-label="Data">${emp.livro.titulo}</td>
                    <td data-label="Livro">${emp.livro.autor}</td>
                    <td data-label="Devolução">${new Date(emp.retirada).toLocaleDateString('pt-br')}</td>
                    <td data-label="Devolução">${emp.devolucao != null?new Date(emp.devolucao).toLocaleDateString('pt-br'):"Emprestado"}</td>
                `;
                emprestimos.appendChild(tr);
            });
        });
}

//Alterar os dados do aluno na API
detalhes.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        ra: detalhes.ra.value,
        nome: detalhes.nome.value,
        telefone: detalhes.telefone.value,
    }
    fetch(url + "/alunos/" + dados.ra, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then((res) => res.status)
        .then((status) => {
            if (status == 202) {
                window.location.reload();
            } else {
                alert("Erro ao enviar dados para a API!");
            }
        });
});

//Deletar aluno da API
function excluir() {
    const ra = detalhes.ra.value;
    fetch(url + "/alunos/" + ra, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.status)
        .then((status) => {
            if (status == 204) {
                window.location.reload();
            } else {
                alert("Erro ao enviar dados para a API!");
            }
        });
}