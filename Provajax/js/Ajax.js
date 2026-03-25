Ajax.jsimport bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';

// URL do seu arquivo JSON no GitHub (use o link do botão "Raw")
const URL_JSON_HASHED = 'https://fernandofgs91.github.io/PFEJ/Listatasala/json/clientes.json';

// Função para gerar o JSON com hashes (Use uma vez no console para criar seu arquivo)
async function gerarHashesParaOArquivo(dadosPuros) {
    const novosDados = dadosPuros.map(user => {
        const salt = bcrypt.genSaltSync(10);
        return {
            username: user.username,
            hash: bcrypt.hashSync(user.password, salt)
        };
    });
    console.log("Copie este JSON para o arquivo usuarios.json no GitHub:");
    console.log(JSON.stringify(novosDados, null, 2));
}

// Função Principal de Autenticação
async function autenticar() {
    const userIn = document.getElementById('user').value;
    const passIn = document.getElementById('pass').value;
    const msg = document.getElementById('mensagem');

    try {
        const response = await fetch(URL_JSON_HASHED);
        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(u => u.username === userIn);

        if (usuarioEncontrado && bcrypt.compareSync(passIn, usuarioEncontrado.hash)) {
            msg.style.color = "green";
            msg.innerText = "Login realizado com sucesso!";
        } else {
            msg.style.color = "red";
            msg.innerText = "Usuário ou senha incorretos.";
        }
    } catch (error) {
        msg.innerText = "Erro ao conectar ao servidor.";
        console.error(error);
    }
}

// Torna a função disponível para o botão (já que o script é type="module")
window.autenticar = autenticar;