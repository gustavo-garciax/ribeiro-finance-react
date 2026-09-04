import { useEffect, useState } from "react";
import "./ProgressCard.css";

function ProgressCard() {

  const [tarefas, setTarefas] = useState([]);


  // ================================
  // BUSCAR TAREFAS
  // ================================

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setTarefas(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  }, []);


  // ================================
  // TAXA DE CONCLUSÃO GERAL
  // ================================

  const totalTarefas = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const progresso = totalTarefas === 0
    ? 0
    : Math.round((concluidas / totalTarefas) * 100);


  return (
    <div className="progress-card">
      <div className="progress-header">
        <div>
          <h2>Progresso dos estudos</h2>
          <span>Seu desempenho geral</span>
        </div>

        <strong>{progresso}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      <div className="progress-footer">
        <span>Tarefas concluídas</span>
        <span>{concluidas} de {totalTarefas}</span>
      </div>
    </div>
  );
}

export default ProgressCard;