import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TaskCard.css";

function TaskCard() {

  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const hoje = new Date();

  const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const hojeFormatado = formatarData(hoje);

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setTarefas(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Erro ao buscar tarefas:", error))
      .finally(() => setCarregando(false));
  }, []);

  const tarefasDeHoje = tarefas
    .filter((tarefa) => tarefa.data === hojeFormatado)
    .slice(0, 4);

  const pendentesHoje = tarefas.filter(
    (tarefa) => tarefa.data === hojeFormatado && !tarefa.concluida
  ).length;

  const toggleTask = async (id) => {

    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    try {
      const resposta = await fetch(
        `http://localhost:3000/tarefas/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ concluida: !tarefa.concluida }),
        }
      );

      const tarefaAtualizada = await resposta.json();

      setTarefas(
        tarefas.map((t) => (t.id === id ? tarefaAtualizada : t))
      );

    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div className="home-task-card">

      <div className="home-task-card-header">
        <div>
          <h2>Tarefas de hoje</h2>
          <span>
            {pendentesHoje} tarefas pendentes
          </span>
        </div>

        <Link to="/tarefas">
          <button>Ver todas</button>
        </Link>
      </div>

      <div className="home-task-list">

        {carregando ? (

          <p>Carregando...</p>

        ) : tarefasDeHoje.length === 0 ? (

          <p>Nenhuma tarefa para hoje. 🎉</p>

        ) : (

          tarefasDeHoje.map((task) => (
            <div
              className={`home-task-item ${task.concluida ? "completed" : ""}`}
              key={task.id}
            >

              <button
                className="home-task-check"
                onClick={() => toggleTask(task.id)}
              >
                {task.concluida && "✓"}
              </button>

              <div className="home-task-info">
                <strong>{task.titulo}</strong>

                <span>
                  {task.materia || "Sem matéria"} • {task.horario}
                </span>
              </div>

            </div>
          ))

        )}

      </div>

    </div>
  );
}

export default TaskCard;