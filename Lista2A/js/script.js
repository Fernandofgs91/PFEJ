window.addEventListener('DOMContentLoaded', () => {

    const vetIdades = [10, 21, 25, 31, 40, 41];

    const txtIdade = Number(prompt("Informe uma idade a ser usada como parâmetro"));

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

    // Exibição moderna (sem document.write)
    const resultado = `
        <p>Soma das idades = ${somarIdades(vetIdades)}</p>
        <p>Média das idades = ${mediaIdades(vetIdades).toFixed(2)}</p>
        <p>Idades ímpares = ${idadesImpares(vetIdades).join(', ')}</p>
        <p>Todos são maiores de idade? ${todosMaioresDeIdade(vetIdades)}</p>
        <p>Todos são maiores que a idade digitada? ${todosMaiores(vetIdades, txtIdade)}</p>
        <p>Idades maiores ou iguais à idade digitada: ${vetorIdadeParam.join(', ')}</p>
        <p>Média das idades iguais ou maiores à idade digitada: ${mediaIdades(vetorIdadeParam).toFixed(2)}</p>
    `;

    document.body.innerHTML = resultado;

});