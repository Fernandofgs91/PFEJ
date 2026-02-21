window.addEventListener('DOMContentLoaded', () => {

    const vetIdades = [10, 21, 25, 31, 40, 41];
    
    // Captura o input e garante que seja um número válido (se não for, assume 0)
    const promptInput = prompt("Informe uma idade!");
    const txtIdade = promptInput !== null ? Number(promptInput) : 0;

    // Soma
    const somarIdades = vet => 
        vet.reduce((total, idade) => total + idade, 0);

    // Média
    const mediaIdades = vet => 
        vet.length ? somarIdades(vet) / vet.length : 0;

    // Ímpares
    const idadesImpares = vet => 
        vet.filter(idade => idade % 2 !== 0);

    // Todos maiores de 18?
    const todosMaioresDeIdade = vet => 
        vet.every(idade => idade >= 18);

    // Todos maiores que a idade digitada?
    const todosMaiores = (vet, idadeParametro) => 
        vet.every(idade => idade >= idadeParametro);

    // Maiores ou iguais à idade digitada
    const maioresOuIguais = (vet, idadeParametro) => 
        vet.filter(idade => idade >= idadeParametro);

    const vetorIdadeParam = maioresOuIguais(vetIdades, txtIdade);

    // Construção do template
    const resultadoHTML = `
        <section>
            <p>Soma das idades = <span class="result">${somarIdades(vetIdades)}</span></p>
            <p>Média das idades = <span class="result">${mediaIdades(vetIdades).toFixed(2)}</span></p>
            <p>Idades ímpares = <span class="result">${idadesImpares(vetIdades).join(', ')}</span></p>
            <p>Todos são maiores de 18? <span class="result">${todosMaioresDeIdade(vetIdades) ? 'Sim' : 'Não'}</span></p>
            <p>Todos são maiores que ${txtIdade}? <span class="result">${todosMaiores(vetIdades, txtIdade) ? 'Sim' : 'Não'}</span></p>
            <p>Idades maiores ou iguais a ${txtIdade}: <span class="result">${vetorIdadeParam.length > 0 ? vetorIdadeParam.join(', ') : 'Nenhuma'}</span></p>
            <p>Média dessas idades: <span class="result">${mediaIdades(vetorIdadeParam).toFixed(2)}</span></p>
        </section>
    `;

    // A MÁGICA ACONTECE AQUI: Injeta apenas na div correta
    const container = document.getElementById('resultados');
    if (container) {
        container.innerHTML = resultadoHTML;
    }
});
