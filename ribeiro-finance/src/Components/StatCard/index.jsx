import { useEffect, useState } from "react";
import "./StatCard.css";

function StatCard() {

  const [tarefas, setTarefas] = useState([]);
  const [materias, setMaterias] = useState([]);


  // ================================
  // BUSCAR DADOS
  // ================================

  useEffect(() => {
    const buscarLista = async (url) => {
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    };

    Promise.all([
      buscarLista("http://localhost:3000/tarefas"),
      buscarLista("http://localhost:3000/materias"),
    ]).then(([tarefasData, materiasData]) => {
      setTarefas(tarefasData);
      setMaterias(materiasData);
    });
  }, []);


  // ================================
  // DATA DE HOJE (mesmo formato usado em Tarefas.jsx)
  // ================================

  const hoje = new Date();

  const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const hojeFormatado = formatarData(hoje);


  // ================================
  // ESTATÍSTICAS
  // ================================

  const tarefasPendentesHoje = tarefas.filter(
    (tarefa) => tarefa.data === hojeFormatado && !tarefa.concluida
  ).length;

  const totalTarefas = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const progressoGeral = totalTarefas === 0
    ? 0
    : Math.round((concluidas / totalTarefas) * 100);


  return (
    <div className="stats-container">

      {/* Tarefas */}
      <div className="stat-card">
        <div className="stat-card-icon">
          ✓
        </div>

        <div className="stat-card-info">
          <span>Tarefas pendentes hoje</span>
          <h2>{tarefasPendentesHoje}</h2>
        </div>
      </div>


      {/* Progresso */}
      <div className="stat-card">
        <div className="stat-card-icon">
          ◔
        </div>

        <div className="stat-card-info">
          <span>Progresso geral</span>
          <h2>{progressoGeral}%</h2>
        </div>
      </div>


      {/* Matérias */}
      <div className="stat-card">
        <div className="stat-card-icon">
          ▣
        </div>

        <div className="stat-card-info">
          <span>Matérias</span>
          <h2>{materias.length}</h2>
        </div>
      </div>

    </div>
  );
}

export default StatCard;