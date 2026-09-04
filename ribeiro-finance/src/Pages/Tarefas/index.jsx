import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Tarefas.css";

function Tarefas() {

  // ================================
  // DATA ATUAL E FORMATAÇÃO LOCAL
  // ================================

  const hoje = new Date();

  const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const [dataSelecionada, setDataSelecionada] = useState(
    formatarData(hoje)
  );


  // ================================
  // CAMPOS DA NOVA TAREFA
  // ================================

  const [novaTarefa, setNovaTarefa] = useState("");
  const [horario, setHorario] = useState("");
  const [prioridade, setPrioridade] = useState("Média");


  // ================================
  // TAREFAS
  // ================================

  const [tarefas, setTarefas] = useState([]);


  // ================================
  // BUSCAR TAREFAS DO DB.JSON
  // ================================

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []);


  // ================================
  // VERIFICAR TAREFAS NO DIA
  // ================================

  const temTarefaNoDia = (date) => {
    const dataFormatada = formatarData(date);

    return tarefas.some(
      (tarefa) => tarefa.data === dataFormatada
    );
  };


  // ================================
  // ADICIONAR TAREFA
  // ================================

  const adicionarTarefa = async (e) => {
    e.preventDefault();

    if (!novaTarefa.trim()) {
      return;
    }

    const tarefa = {
      titulo: novaTarefa,
      data: dataSelecionada,
      horario: horario || "Sem horário",
      prioridade: prioridade,
      concluida: false
    };

    try {
      const resposta = await fetch(
        "http://localhost:3000/tarefas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tarefa)
        }
      );

      const novaTarefaCriada = await resposta.json();

      setTarefas([...tarefas, novaTarefaCriada]);

      setNovaTarefa("");
      setHorario("");
      setPrioridade("Média");

    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };


  // ================================
  // CONCLUIR TAREFA
  // ================================

  const alternarTarefa = async (id) => {

    const tarefa = tarefas.find(
      (tarefa) => tarefa.id === id
    );

    if (!tarefa) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/tarefas/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            concluida: !tarefa.concluida
          })
        }
      );

      const tarefaAtualizada = await resposta.json();

      setTarefas(
        tarefas.map((tarefa) =>
          tarefa.id === id
            ? tarefaAtualizada
            : tarefa
        )
      );

    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };


  // ================================
  // REMOVER TAREFA
  // ================================

  const removerTarefa = async (id) => {

    try {
      await fetch(
        `http://localhost:3000/tarefas/${id}`,
        {
          method: "DELETE"
        }
      );

      setTarefas(
        tarefas.filter(
          (tarefa) => tarefa.id !== id
        )
      );

    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    }
  };


  // ================================
  // FILTRAR TAREFAS DA DATA
  // ================================

  const tarefasDoDia = tarefas.filter(
    (tarefa) => tarefa.data === dataSelecionada
  );

  const pendentes = tarefasDoDia.filter(
    (tarefa) => !tarefa.concluida
  );

  const concluidas = tarefasDoDia.filter(
    (tarefa) => tarefa.concluida
  );


  // ================================
  // FORMATAÇÃO DA DATA SELECIONADA
  // ================================

  const [ano, mes, dia] = dataSelecionada.split("-");

  const dataBonita = new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia)
  );

  const nomeDia = dataBonita.toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
  );


  return (
    <main className="tasks-page">

      {/* ============================
          CABEÇALHO
      ============================ */}

      <header className="tasks-header">

       

        <div className="tasks-counter">

          <strong>
            {pendentes.length}
          </strong>

          <span>
            pendentes
          </span>

        </div>

      </header>


      {/* ============================
          CONTEÚDO
      ============================ */}

      <div className="tasks-content">

        {/* ============================
            COLUNA ESQUERDA
        ============================ */}

        <section className="tasks-left">

          {/* CALENDÁRIO CUSTOMIZADO */}

          <div className="task-card calendar-card">

            <div className="card-title">

              <div className="title-icon">
                📅
              </div>

              <div>

                <h2>
                  Calendário
                </h2>

                <span>
                  Escolha um dia
                </span>

              </div>

            </div>

            <Calendar
              onChange={(val) =>
                setDataSelecionada(
                  formatarData(val)
                )
              }
              value={dataBonita}
              locale="pt-BR"
              tileClassName={({ date }) =>
                temTarefaNoDia(date)
                  ? "dia-com-tarefa"
                  : null
              }
            />

            <div className="selected-date">

              <span>
                {nomeDia}
              </span>

              <strong>
                {tarefasDoDia.length} tarefas
              </strong>

            </div>

          </div>


          {/* ADICIONAR TAREFA */}

          <div className="task-card add-task-card">

            <div className="card-title">

              <div className="title-icon purple">
                +
              </div>

              <div>

                <h2>
                  Nova tarefa
                </h2>

                <span>
                  Adicione uma atividade
                </span>

              </div>

            </div>

            <form onSubmit={adicionarTarefa}>

              <label>
                Tarefa
              </label>

              <input
                type="text"
                placeholder="Ex: Estudar Física"
                value={novaTarefa}
                onChange={(e) =>
                  setNovaTarefa(e.target.value)
                }
              />

              <div className="form-row">

                <div>

                  <label>
                    Horário
                  </label>

                  <input
                    type="time"
                    value={horario}
                    onChange={(e) =>
                      setHorario(e.target.value)
                    }
                  />

                </div>

                <div>

                  <label>
                    Prioridade
                  </label>

                  <select
                    value={prioridade}
                    onChange={(e) =>
                      setPrioridade(e.target.value)
                    }
                  >
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                  </select>

                </div>

              </div>

              <button
                type="submit"
                className="add-task-button"
              >
                <span>+</span>
                Adicionar tarefa
              </button>

            </form>

          </div>

        </section>


        {/* ============================
            COLUNA DIREITA
        ============================ */}

        <section className="tasks-right">

          <div className="tasks-list-header">

            <div>

              <span>
                {nomeDia}
              </span>

              <h2>
                Tarefas do dia
              </h2>

            </div>

            <div className="task-total">
              {tarefasDoDia.length}
            </div>

          </div>


          {/* PENDENTES */}

          <div className="task-section">

            <div className="section-label">

              <span className="status-dot orange"></span>

              Pendentes

              <span>
                {pendentes.length}
              </span>

            </div>

            {pendentes.length === 0 ? (

              <div className="empty-tasks">

                🎉

                <p>
                  Nenhuma tarefa pendente!
                </p>

              </div>

            ) : (

              pendentes.map((tarefa) => (

                <div
                  className="task-item"
                  key={tarefa.id}
                >

                  <button
                    className="check-button"
                    onClick={() =>
                      alternarTarefa(tarefa.id)
                    }
                  >
                    ✓
                  </button>

                  <div className="task-info">

                    <strong>
                      {tarefa.titulo}
                    </strong>

                    <div className="task-meta">

                      <span>
                        🕐 {tarefa.horario}
                      </span>

                      <span
                        className={`priority ${tarefa.prioridade.toLowerCase()}`}
                      >
                        {tarefa.prioridade}
                      </span>

                    </div>

                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      removerTarefa(tarefa.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))

            )}

          </div>


          {/* CONCLUÍDAS */}

          {concluidas.length > 0 && (

            <div className="task-section completed-section">

              <div className="section-label">

                <span className="status-dot green"></span>

                Concluídas

                <span>
                  {concluidas.length}
                </span>

              </div>

              {concluidas.map((tarefa) => (

                <div
                  className="task-item completed"
                  key={tarefa.id}
                >

                  <button
                    className="check-button checked"
                    onClick={() =>
                      alternarTarefa(tarefa.id)
                    }
                  >
                    ✓
                  </button>

                  <div className="task-info">

                    <strong>
                      {tarefa.titulo}
                    </strong>

                    <div className="task-meta">

                      <span>
                        🕐 {tarefa.horario}
                      </span>

                      <span className="completed-text">
                        Concluída
                      </span>

                    </div>

                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      removerTarefa(tarefa.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default Tarefas;