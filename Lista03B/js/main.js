window.addEventListener("DOMContentLoaded", () => {
    const filtros = document.getElementById("filtros");
    const txtAlunos = document.getElementById("txtAlunos");
  
    const carregarDados = async () => {
      try {
        const resposta = await fetch("https://wilton-filho.github.io/PFJS-GitHub/bases/alunos.json");
        if (!resposta.ok) throw new Error("Erro ao carregar dados dos estudantes.");
        return await resposta.json();
      } catch (error) {
        txtAlunos.textContent = "Erro ao carregar os dados.";
        console.error(error);
      }
    };
  
    const formatarAluno = aluno => {
      const somaNotas = aluno.notaBim1 + aluno.notaBim2;
      return `<p>${aluno.nome}: ${aluno.notaBim1} (bimestre 1) e ${aluno.notaBim2} (bimestre 2) = ${somaNotas}</p>`;
    };
  
    const exibirAlunos = lista => {
      txtAlunos.innerHTML = lista.map(formatarAluno).join("");
    };
  
    const exibirMensagem = mensagem => {
      txtAlunos.textContent = mensagem;
    };
  
    const isAprovado = aluno => aluno.notaBim1 + aluno.notaBim2 >= 60;
  
    filtros.addEventListener("change", async () => {
      const dados = await carregarDados();
      if (!dados) return;
  
      const opcao = filtros.value;
  
      switch (opcao) {
        case "Todos os estudantes":
          exibirAlunos(dados);
          break;
  
        case "Estudantes homens":
          exibirAlunos(dados.filter(aluno => aluno.sexo === "M"));
          break;
  
        case "Estudantes mulheres":
          exibirAlunos(dados.filter(aluno => aluno.sexo === "F"));
          break;
  
        case "Estudantes aprovados":
          exibirAlunos(dados.filter(isAprovado));
          break;
  
        case "Estudantes reprovados":
          exibirAlunos(dados.filter(aluno => !isAprovado(aluno)));
          break;
  
        case "Todos os alunos aprovados?":
          const todosAprovados = dados.every(isAprovado);
          exibirMensagem(todosAprovados ? "Sim, todos foram aprovados!" : "Não, nem todos foram aprovados.");
          break;
  
        case "Nota média da turma":
          const media = dados
            .map(aluno => aluno.notaBim1 + aluno.notaBim2)
            .reduce((acc, nota) => acc + nota, 0) / dados.length;
          exibirMensagem(`Nota média da turma: ${media.toFixed(2)}`);
          break;
  
        default:
          exibirMensagem("Selecione uma opção válida.");
      }
    });
  });
  