import "../styles/crides.css";

function Gridcolo() {
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    titulo: "Título da caixa",
    texto:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores exercitationem, corrupti facilis ut sint tempora quo, eius et hic debitis quos quia illo sunt corporis accusantium vitae quidem tempore nihil.",
  }));

  return (
    <div className="grid-container2">
      {items.map((item) => (
        <div key={item.id} className="card1">
          <h3>{item.titulo}</h3>
          <p>{item.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default Gridcolo;