import { Link } from "react-router-dom";
import "../styles/grid.css";

export default function GridCards() {
  const items = [
    "PLANO DE DESENVOLVIMENTO INSTITUCIONAL",
    "PESQUISA PÚBLICA PROCESSOS IFTM",
    "LICITAÇÕES E CONTRATOS",
    "RECEITAS E DESPESAS",
    "DADOS ABERTOS",
    "TRANSPARÊNCIA E PRESTAÇÃO DE CONTAS",
    "SERVIDORES",
    "PERGUNTAS FREQUENTES"
  ];

  return (
    <section className="grid-info">
      <div className="container">
        {items.map((item, index) => (
          <Link key={index} to="/pagina2" className="card-link">
            <div className="card">
              {item}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
