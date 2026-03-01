import { trabalhadores } from "./vet.js";

const resultado = document.getElementById("resultado");

const maioridade = trabalhadores
  .filter(pessoa => pessoa.idade >= 18)
  .map(pessoa => `${pessoa.nome} (${pessoa.idade} anos)`);

const homens = trabalhadores
  .filter(pessoa => pessoa.sexo === "M")
  .map(pessoa => pessoa.nome);

const pessoaMaiorSalario = trabalhadores.reduce((maior, atual) =>
  atual.salario > maior.salario ? atual : maior
);

const mulherAcima5000 = trabalhadores
  .some(pessoa => pessoa.sexo === "F" && pessoa.salario > 5000);

const salariosHomens = trabalhadores
  .filter(p => p.sexo === "M")
  .map(p => p.salario);

const mediaHomens = salariosHomens.reduce((acc, val) => acc + val, 0) / salariosHomens.length;

const salariosMulheres = trabalhadores
  .filter(p => p.sexo === "F")
  .map(p => p.salario);

const mediaMulheres = salariosMulheres.reduce((acc, val) => acc + val, 0) / salariosMulheres.length;

resultado.innerHTML = `
  <div class="resposta">
    <h2>1. Maiores de idade (nome e idade):</h2>
    <ul>${maioridade.map(item => `<li>${item}</li>`).join("")}</ul>
  </div>

  <div class="resposta">
    <h2>2. Nomes dos homens:</h2>
    <ul>${homens.map(nome => `<li>${nome}</li>`).join("")}</ul>
  </div>

  <div class="resposta">
    <h2>3. Pessoa com maior salário:</h2>
    <p>
      Nome: ${pessoaMaiorSalario.nome}, 
      Idade: ${pessoaMaiorSalario.idade}, 
      Sexo: ${pessoaMaiorSalario.sexo}, 
      Salário: R$${pessoaMaiorSalario.salario.toLocaleString('pt-BR')}
    </p>
  </div>

  <div class="resposta">
    <h2>4. Há alguma mulher que ganha mais de R$5.000,00?</h2>
    <p>${mulherAcima5000 ? "Sim" : "Não"}</p>
  </div>

  <div class="resposta">
    <h2>5. Média dos salários:</h2>
    <p>Homens: R$${mediaHomens.toFixed(2).replace(".", ",")}</p>
    <p>Mulheres: R$${mediaMulheres.toFixed(2).replace(".", ",")}</p>
  </div>
`;