import React, { useState } from "react";
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
  // TAREFAS FIXAS
  // ================================

  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: "Estudar Matemática",
      data: formatarData(hoje),
      horario: "08:00",
      prioridade: "Alta",
      concluida: false
    },
    {
      id: 2,
      titulo: "Revisar conteúdo da aula",
      data: formatarData(hoje),
      horario: "14:00",
      prioridade: "Média",
      concluida: false
    },
    {
      id: 3,
      titulo: "Fazer exercícios de programação",
      data: formatarData(hoje),
      horario: "18:30",
      prioridade: "Alta",
      concluida: false
    },
    {
      id: 4,
      titulo: "Ler capítulo do livro",
      data: formatarData(hoje),
      horario: "20:00",
      prioridade: "Baixa",
      concluida: true
    }
  ]);


  // ================================
  // VERIFICAR TAREFAS NO DIA
  // ================================

  const temTarefaNoDia = (date) => {
    const dataFormatada = formatarData(date);
    return tarefas.some((tarefa) => tarefa.data === dataFormatada);
  };


  // ================================
  // ADICIONAR TAREFA
  // ================================

  const adicionarTarefa = (e) => {
    e.preventDefault();

    if (!novaTarefa.trim()) {
      return;
    }

    const tarefa = {
      id: Date.now(),
      titulo: novaTarefa,
      data: dataSelecionada,
      horario: horario || "Sem horário",
      prioridade: prioridade,
      concluida: false
    };

    setTarefas([...tarefas, tarefa]);

    setNovaTarefa("");
    setHorario("");
    setPrioridade("Média");
  };


  // ================================
  // CONCLUIR TAREFA
  // ================================

  const alternarTarefa = (id) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? {
              ...tarefa,
              concluida: !tarefa.concluida
            }
          : tarefa
      )
    );
  };


  // ================================
  // REMOVER TAREFA
  // ================================

  const removerTarefa = (id) => {
    setTarefas(
      tarefas.filter((tarefa) => tarefa.id !== id)
    );
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
  const dataBonita = new Date(Number(ano), Number(mes) - 1, Number(dia));

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
        <div>
          <p className="tasks-small-title">
            ORGANIZAÇÃO
          </p>

          <h1>
            Minhas Tarefas
          </h1>

          <p className="tasks-subtitle">
            Organize seus estudos e mantenha tudo em dia.
          </p>
        </div>

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
              onChange={(val) => setDataSelecionada(formatarData(val))}
              value={dataBonita}
              locale="pt-BR"
              tileClassName={({ date }) =>
                temTarefaNoDia(date) ? "dia-com-tarefa" : null
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