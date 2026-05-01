import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';

const btnLogin = document.getElementById('btnLogin');
const msg = document.getElementById('mensagem');

// URL do seu arquivo JSON no GitHub
const JSON_URL = 'https://raw.githubusercontent.com/Fernandofgs91/PFEJ/refs/heads/main/Provajax/json/userCript.json';

btnLogin.addEventListener('click', async () => {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;

    // Validação básica
    if (!userIn || !passIn) {
        msg.innerText = "Preencha usuário e senha";
        msg.style.color = "red";
        return;
    }

    try {
        // Requisição Assíncrona (AJAX via Fetch)
        const response = await fetch(JSON_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();

        // Busca o usuário no JSON
        const usuarioEncontrado = users.find(u => u.username === userIn);

        if (usuarioEncontrado) {
            // Verifica a senha usando bcrypt
            if (bcrypt.compareSync(passIn, usuarioEncontrado.password)) {
                msg.innerText = "Login realizado com sucesso!";
                msg.style.color = "green";
                console.log("Senhas iguais - Login autorizado");
                
                // Redirecionar ou executar ação de sucesso
                // window.location.href = "dashboard.html";
            } else {
                msg.innerText = "Senha incorreta";
                msg.style.color = "red";
                console.log("Senhas diferentes - Acesso negado");
            }
        } else {
            msg.innerText = "Usuário não encontrado";
            msg.style.color = "red";
            console.log("Usuário não cadastrado");
        }
    } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
        msg.innerText = "Erro ao conectar com o servidor";
        msg.style.color = "red";
    }
});

// Botão Sair
const btnExit = document.getElementById('btnExit');
if (btnExit) {
    btnExit.addEventListener('click', () => {
        // Limpar campos
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        msg.innerText = '';
        console.log("Sessão encerrada");
    });
}