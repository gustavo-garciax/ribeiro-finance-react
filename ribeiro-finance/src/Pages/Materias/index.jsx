import React, { useEffect, useState } from "react";
import "./Materias.css";

// Paleta de cores disponível para identificar cada matéria
const CORES_DISPONIVEIS = [
  "#6C5DD3", // roxo (padrão)
  "#2EC4B6", // verde
  "#FFA600", // laranja
  "#FF4757", // vermelho
  "#4C9AFF", // azul
  "#F7B2AD", // rosa
];

function Materias() {

  // ================================
  // MATÉRIAS E TAREFAS
  // ================================

  const [materias, setMaterias] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);


  // ================================
  // CAMPOS DA NOVA MATÉRIA
  // ================================

  const [nomeMateria, setNomeMateria] = useState("");
  const [professor, setProfessor] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [cor, setCor] = useState(CORES_DISPONIVEIS[0]);

  // Controla edição
  const [editandoId, setEditandoId] = useState(null);


  // ================================
  // BUSCAR MATÉRIAS E TAREFAS DO DB.JSON
  // ================================

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/materias").then((res) => res.json()),
      fetch("http://localhost:3000/tarefas").then((res) => res.json()),
    ])
      .then(([materiasData, tarefasData]) => {
        setMaterias(materiasData);
        setTarefas(tarefasData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      })
      .finally(() => setCarregando(false));
  }, []);


  // ================================
  // ESTATÍSTICAS POR MATÉRIA
  // ================================

  const estatisticasDaMateria = (nome) => {
    const tarefasDaMateria = tarefas.filter(
      (tarefa) => tarefa.materia === nome
    );

    const concluidas = tarefasDaMateria.filter(
      (tarefa) => tarefa.concluida
    ).length;

    const total = tarefasDaMateria.length;

    const progresso = total === 0
      ? 0
      : Math.round((concluidas / total) * 100);

    return { total, concluidas, progresso };
  };


  // ================================
  // ADICIONAR / ATUALIZAR MATÉRIA
  // ================================

  const limparFormulario = () => {
    setNomeMateria("");
    setProfessor("");
    setCargaHoraria("");
    setCor(CORES_DISPONIVEIS[0]);
    setEditandoId(null);
  };

  const salvarMateria = async (e) => {
    e.preventDefault();

    if (!nomeMateria.trim()) {
      return;
    }

    const materia = {
      nome: nomeMateria,
      professor: professor || "Sem professor definido",
      cargaHoraria: cargaHoraria || "0h",
      cor: cor,
    };

    try {
      if (editandoId) {

        const resposta = await fetch(
          `http://localhost:3000/materias/${editandoId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(materia),
          }
        );

        const materiaAtualizada = await resposta.json();

        setMaterias(
          materias.map((m) =>
            m.id === editandoId ? materiaAtualizada : m
          )
        );

      } else {

        const resposta = await fetch(
          "http://localhost:3000/materias",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(materia),
          }
        );

        const materiaCriada = await resposta.json();

        setMaterias([...materias, materiaCriada]);
      }

      limparFormulario();

    } catch (error) {
      console.error("Erro ao salvar matéria:", error);
    }
  };


  // ================================
  // EDITAR MATÉRIA (preenche o formulário)
  // ================================

  const editarMateria = (materia) => {
    setEditandoId(materia.id);
    setNomeMateria(materia.nome);
    setProfessor(materia.professor);
    setCargaHoraria(materia.cargaHoraria);
    setCor(materia.cor || CORES_DISPONIVEIS[0]);

    // Leva o usuário até o formulário
    document
      .getElementById("form-materia")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  // ================================
  // REMOVER MATÉRIA
  // ================================

  const removerMateria = async (id) => {
    try {
      await fetch(`http://localhost:3000/materias/${id}`, {
        method: "DELETE",
      });

      setMaterias(materias.filter((materia) => materia.id !== id));

      if (editandoId === id) {
        limparFormulario();
      }

    } catch (error) {
      console.error("Erro ao remover matéria:", error);
    }
  };


  return (
    <main className="materias-page">

      {/* ============================
          CABEÇALHO
      ============================ */}

      <header className="materias-header">

        <div>

          <p className="materias-small-title">
            ORGANIZAÇÃO
          </p>

          <h1>
            Minhas Matérias
          </h1>

          <p className="materias-subtitle">
            Acompanhe o andamento de cada disciplina.
          </p>

        </div>

        <div className="materias-counter">

          <strong>
            {materias.length}
          </strong>

          <span>
            {materias.length === 1 ? "matéria" : "matérias"}
          </span>

        </div>

      </header>


      {/* ============================
          CONTEÚDO
      ============================ */}

      <div className="materias-content">

        {/* ============================
            FORMULÁRIO
        ============================ */}

        <section
          id="form-materia"
          className="materia-card form-card"
        >

          <div className="card-title">

            <div className="title-icon purple">
              {editandoId ? "✎" : "+"}
            </div>

            <div>

              <h2>
                {editandoId ? "Editar matéria" : "Nova matéria"}
              </h2>

              <span>
                {editandoId
                  ? "Atualize as informações"
                  : "Adicione uma disciplina"}
              </span>

            </div>

          </div>

          <form onSubmit={salvarMateria}>

            <label>
              Nome da matéria
            </label>

            <input
              type="text"
              placeholder="Ex: Física"
              value={nomeMateria}
              onChange={(e) => setNomeMateria(e.target.value)}
            />

            <div className="form-row">

              <div>

                <label>
                  Professor
                </label>

                <input
                  type="text"
                  placeholder="Ex: Ana Souza"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                />

              </div>

              <div>

                <label>
                  Carga horária
                </label>

                <input
                  type="text"
                  placeholder="Ex: 4h/semana"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                />

              </div>

            </div>

            <label>
              Cor de identificação
            </label>

            <div className="color-picker">

              {CORES_DISPONIVEIS.map((corDisponivel) => (

                <button
                  type="button"
                  key={corDisponivel}
                  className={`color-swatch ${
                    cor === corDisponivel ? "selected" : ""
                  }`}
                  style={{ backgroundColor: corDisponivel }}
                  onClick={() => setCor(corDisponivel)}
                  aria-label={`Selecionar cor ${corDisponivel}`}
                />

              ))}

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="add-materia-button"
              >
                <span>{editandoId ? "✓" : "+"}</span>
                {editandoId ? "Salvar alterações" : "Adicionar matéria"}
              </button>

              {editandoId && (

                <button
                  type="button"
                  className="cancel-button"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>

              )}

            </div>

          </form>

        </section>


        {/* ============================
            LISTA DE MATÉRIAS
        ============================ */}

        <section className="materias-list">

          {carregando ? (

            <div className="empty-materias">
              <p>Carregando matérias...</p>
            </div>

          ) : materias.length === 0 ? (

            <div className="empty-materias">
              📚
              <p>Nenhuma matéria cadastrada ainda!</p>
              <span>Adicione a primeira usando o formulário ao lado.</span>
            </div>

          ) : (

            <div className="materias-grid">

              {materias.map((materia) => {

                const { total, concluidas, progresso } =
                  estatisticasDaMateria(materia.nome);

                return (

                  <div className="materia-item" key={materia.id}>

                    <div
                      className="materia-color-bar"
                      style={{ backgroundColor: materia.cor || CORES_DISPONIVEIS[0] }}
                    />

                    <div className="materia-item-content">

                      <div className="materia-item-header">

                        <div>

                          <h3>{materia.nome}</h3>

                          <span className="materia-professor">
                            {materia.professor}
                          </span>

                        </div>

                        <div className="materia-actions">

                          <button
                            className="icon-button"
                            onClick={() => editarMateria(materia)}
                            aria-label="Editar matéria"
                          >
                            ✎
                          </button>

                          <button
                            className="icon-button delete"
                            onClick={() => removerMateria(materia.id)}
                            aria-label="Remover matéria"
                          >
                            ×
                          </button>

                        </div>

                      </div>

                      <div className="materia-meta">

                        <span>
                          🕐 {materia.cargaHoraria}
                        </span>

                        <span>
                          ✓ {concluidas}/{total} tarefas
                        </span>

                      </div>

                      <div className="progress-track">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${progresso}%`,
                            backgroundColor: materia.cor || CORES_DISPONIVEIS[0],
                          }}
                        />

                      </div>

                      <div className="progress-label">
                        {progresso}% concluído
                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default Materias;