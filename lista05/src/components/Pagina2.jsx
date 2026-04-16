import { Link } from "react-router-dom";
import "../styles/pagina2.css";

export default function Pagina2() {
  const cards = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    titulo: `Título da caixa ${i + 1}`,
    descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores exercitationem, corrupti facilis ut sint tempora quo, eius et, hic debitis quos quia illo sunt corporis accusantium vitae quidem tempore nihil."
  }));

  return (
    <div className="pagina2">
      <header className="header-pagina2">
        <Link to="/" className="voltar-btn">← Voltar para Página Inicial</Link>
        <h1>Página 2 - Conteúdo Detalhado</h1>
      </header>

      <main className="conteudo-pagina2">
        <div className="grid-cards">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <h2>{card.titulo}</h2>
              <p>{card.descricao}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}