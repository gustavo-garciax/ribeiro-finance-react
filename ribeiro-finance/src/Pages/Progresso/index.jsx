import React, { useEffect, useState } from "react";
import "./Progresso.css";

function Progresso() {

  // ================================
  // DADOS
  // ================================

  const [tarefas, setTarefas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [carregando, setCarregando] = useState(true);


  // ================================
  // BUSCAR TAREFAS E MATÉRIAS
  // ================================

  useEffect(() => {
    const buscarLista = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Erro ${res.status} ao buscar ${url}`);
        return [];
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    };

    Promise.all([
      buscarLista("http://localhost:3000/tarefas"),
      buscarLista("http://localhost:3000/materias"),
    ])
      .then(([tarefasData, materiasData]) => {
        setTarefas(tarefasData);
        setMaterias(materiasData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      })
      .finally(() => setCarregando(false));
  }, []);


  // ================================
  // ESTATÍSTICAS GERAIS
  // ================================

  const totalTarefas = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const pendentes = totalTarefas - concluidas;

  const taxaConclusao = totalTarefas === 0
    ? 0
    : Math.round((concluidas / totalTarefas) * 100);


  // ================================
  // ESTATÍSTICAS POR PRIORIDADE
  // ================================

  const contarPorPrioridade = (prioridade) =>
    tarefas.filter(
      (tarefa) =>
        tarefa.prioridade?.toLowerCase() === prioridade
    ).length;

  const prioridades = [
    { nome: "Alta", chave: "alta", cor: "#FF4757" },
    { nome: "Média", chave: "média", cor: "#FFA600" },
    { nome: "Baixa", chave: "baixa", cor: "#2EC4B6" },
  ];


  // ================================
  // PROGRESSO POR MATÉRIA
  // ================================

  const estatisticasDaMateria = (nome) => {
    const tarefasDaMateria = tarefas.filter(
      (tarefa) => tarefa.materia === nome
    );

    const concluidasDaMateria = tarefasDaMateria.filter(
      (tarefa) => tarefa.concluida
    ).length;

    const totalDaMateria = tarefasDaMateria.length;

    const progresso = totalDaMateria === 0
      ? 0
      : Math.round((concluidasDaMateria / totalDaMateria) * 100);

    return { total: totalDaMateria, concluidas: concluidasDaMateria, progresso };
  };


  // ================================
  // ATIVIDADE DOS ÚLTIMos 7 DIAS
  // ================================

  const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const ultimos7Dias = Array.from({ length: 7 }, (_, i) => {
    const data = new Date();
    data.setDate(data.getDate() - (6 - i));
    return data;
  });

  const atividadeSemanal = ultimos7Dias.map((data) => {
    const dataFormatada = formatarData(data);

    const tarefasDoDia = tarefas.filter(
      (tarefa) => tarefa.data === dataFormatada
    );

    const concluidasNoDia = tarefasDoDia.filter(
      (tarefa) => tarefa.concluida
    ).length;

    const nomeDiaCurto = data
      .toLocaleDateString("pt-BR", { weekday: "short" })
      .replace(".", "");

    return {
      label: nomeDiaCurto,
      total: tarefasDoDia.length,
      concluidas: concluidasNoDia,
    };
  });

  const maiorValorSemana = Math.max(
    1,
    ...atividadeSemanal.map((dia) => dia.total)
  );


  return (
    <main className="progress-page">

      {/* ============================
          CABEÇALHO
      ============================ */}

      <header className="progress-header">

        <div>

          <p className="progress-small-title">
            ACOMPANHAMENTO
          </p>

          <h1>
            Meu Progresso
          </h1>

          <p className="progress-subtitle">
            Veja como está o seu desempenho nos estudos.
          </p>

        </div>

        <div className="progress-counter">

          <strong>
            {taxaConclusao}%
          </strong>

          <span>
            concluído
          </span>

        </div>

      </header>


      {carregando ? (

        <div className="empty-progress">
          <p>Carregando progresso...</p>
        </div>

      ) : totalTarefas === 0 ? (

        <div className="empty-progress">
          📊
          <p>Ainda não há dados suficientes!</p>
          <span>Adicione tarefas para começar a acompanhar seu progresso.</span>
        </div>

      ) : (

        <>

          {/* ============================
              CARDS DE VISÃO GERAL
          ============================ */}

          <section className="overview-grid">

            <div className="overview-card">

              <div className="overview-icon purple">
                📋
              </div>

              <div>
                <strong>{totalTarefas}</strong>
                <span>Total de tarefas</span>
              </div>

            </div>

            <div className="overview-card">

              <div className="overview-icon green">
                ✓
              </div>

              <div>
                <strong>{concluidas}</strong>
                <span>Concluídas</span>
              </div>

            </div>

            <div className="overview-card">

              <div className="overview-icon orange">
                ⏳
              </div>

              <div>
                <strong>{pendentes}</strong>
                <span>Pendentes</span>
              </div>

            </div>

            <div className="overview-card">

              <div className="overview-icon purple">
                📈
              </div>

              <div>
                <strong>{taxaConclusao}%</strong>
                <span>Taxa de conclusão</span>
              </div>

            </div>

          </section>


          {/* ============================
              CONTEÚDO PRINCIPAL
          ============================ */}

          <div className="progress-content">

            {/* ============================
                COLUNA ESQUERDA
            ============================ */}

            <section className="progress-left">

              {/* ATIVIDADE DA SEMANA */}

              <div className="progress-card">

                <div className="card-title">

                  <div className="title-icon">
                    📅
                  </div>

                  <div>
                    <h2>Atividade da semana</h2>
                    <span>Tarefas concluídas nos últimos 7 dias</span>
                  </div>

                </div>

                <div className="week-chart">

                  {atividadeSemanal.map((dia, index) => (

                    <div className="week-bar-column" key={index}>

                      <div className="week-bar-track">

                        <div
                          className="week-bar-fill"
                          style={{
                            height: `${(dia.concluidas / maiorValorSemana) * 100}%`,
                          }}
                        />

                      </div>

                      <span className="week-bar-label">
                        {dia.label}
                      </span>

                      <span className="week-bar-value">
                        {dia.concluidas}
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* PRIORIDADES */}

              <div className="progress-card">

                <div className="card-title">

                  <div className="title-icon">
                    🎯
                  </div>

                  <div>
                    <h2>Tarefas por prioridade</h2>
                    <span>Distribuição de esforço</span>
                  </div>

                </div>

                <div className="priority-list">

                  {prioridades.map((prioridade) => {

                    const quantidade = contarPorPrioridade(prioridade.chave);

                    const porcentagem = totalTarefas === 0
                      ? 0
                      : Math.round((quantidade / totalTarefas) * 100);

                    return (

                      <div className="priority-row" key={prioridade.chave}>

                        <div className="priority-row-header">

                          <span className="priority-row-name">
                            <span
                              className="priority-dot"
                              style={{ backgroundColor: prioridade.cor }}
                            />
                            {prioridade.nome}
                          </span>

                          <span className="priority-row-count">
                            {quantidade} tarefas
                          </span>

                        </div>

                        <div className="progress-track">

                          <div
                            className="progress-fill"
                            style={{
                              width: `${porcentagem}%`,
                              backgroundColor: prioridade.cor,
                            }}
                          />

                        </div>

                      </div>

                    );

                  })}

                </div>

              </div>

            </section>


            {/* ============================
                COLUNA DIREITA — MATÉRIAS
            ============================ */}

            <section className="progress-card materias-progress-card">

              <div className="card-title">

                <div className="title-icon purple">
                  📚
                </div>

                <div>
                  <h2>Progresso por matéria</h2>
                  <span>Andamento de cada disciplina</span>
                </div>

              </div>

              {materias.length === 0 ? (

                <div className="empty-materias-inline">
                  <p>Nenhuma matéria cadastrada ainda.</p>
                </div>

              ) : (

                <div className="materia-progress-list">

                  {materias.map((materia) => {

                    const { total, concluidas: concluidasDaMateria, progresso } =
                      estatisticasDaMateria(materia.nome);

                    return (

                      <div className="materia-progress-row" key={materia.id}>

                        <div className="materia-progress-header">

                          <span className="materia-progress-name">
                            <span
                              className="priority-dot"
                              style={{ backgroundColor: materia.cor || "#6C5DD3" }}
                            />
                            {materia.nome}
                          </span>

                          <span className="materia-progress-count">
                            {concluidasDaMateria}/{total}
                          </span>

                        </div>

                        <div className="progress-track">

                          <div
                            className="progress-fill"
                            style={{
                              width: `${progresso}%`,
                              backgroundColor: materia.cor || "#6C5DD3",
                            }}
                          />

                        </div>

                        <span className="materia-progress-percent">
                          {progresso}%
                        </span>

                      </div>

                    );

                  })}

                </div>

              )}

            </section>

          </div>

        </>

      )}

    </main>
  );
}

export default Progresso;