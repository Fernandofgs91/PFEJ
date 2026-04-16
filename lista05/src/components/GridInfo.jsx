import "../styles/grid.css";

export default function GridInfo() {
  const items = [
    "PLANO DE DESENVOLVIMENTO INSTITUCIONAL",
    "PESQUISA PÚBLICA PROCESSOS IFTM",
    "LICITAÇÕES E CONTRATOS",
    "RECEITAS E DESPESAS",
    "DADOS ABERTOS",
    "TRANSPARÊNCIA E PRESTAÇÃO DE CONTAS",
    "SERVIDORES",
    "PERGUNTAS FREQUENTES",
  ];

  return (
    <section className="grid-info">
      <div className="container">
        {items.map((text, index) => (
          <div key={index} className="card">
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}