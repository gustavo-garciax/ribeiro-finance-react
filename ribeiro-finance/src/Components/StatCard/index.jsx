import "./StatCard.css";

function StatCard() {
  return (
    <div className="stats-container">

      {/* Tarefas */}
      <div className="stat-card">
        <div className="stat-card-icon">
          ✓
        </div>

        <div className="stat-card-info">
          <span>Tarefas pendentes</span>
          <h2>8</h2>
        </div>
      </div>


      {/* Progresso */}
      <div className="stat-card">
        <div className="stat-card-icon">
          ◔
        </div>

        <div className="stat-card-info">
          <span>Progresso geral</span>
          <h2>72%</h2>
        </div>
      </div>


      {/* Matérias */}
      <div className="stat-card">
        <div className="stat-card-icon">
          ▣
        </div>

        <div className="stat-card-info">
          <span>Matérias</span>
          <h2>6</h2>
        </div>
      </div>

    </div>
  );
}

export default StatCard;