 async function carregarDepoimentos() {
            const container = document.getElementById('container');

            try {
                const resposta = await fetch('json/clientes.json');
                const data = await resposta.json();
                const clientes = data.clientes;  // Acesse o array dentro da chave "clientes"

                container.innerHTML = clientes.map(cliente => `
                <div class="card">
                    <div class="nome">${cliente.nome}</div>
                    <div class="depoimento">"${cliente.depoimento}"</div>
                    <div class="estrelas">${'★'.repeat(cliente.rating)}${'☆'.repeat(5 - cliente.rating)}</div>
                </div>
            `).join('');

            } catch {
                container.innerHTML = '<div class="erro">❌ Erro ao carregar depoimentos</div>';
            }
        }

        carregarDepoimentos();