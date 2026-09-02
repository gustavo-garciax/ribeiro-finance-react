import "./ProgressCard.css";

function ProgressCard() {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <div>
          <h2>Progresso dos estudos</h2>
          <span>Seu desempenho nesta semana</span>
        </div>

        <strong>72%</strong>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="progress-footer">
        <span>Meta semanal</span>
        <span>72 de 100 pontos</span>
      </div>
    </div>
  );
}

export default ProgressCard;