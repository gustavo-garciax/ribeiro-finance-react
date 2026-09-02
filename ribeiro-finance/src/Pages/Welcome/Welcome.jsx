import { useState } from "react";
import "./Welcome.css";

function Welcome({ onComplete }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) return;

    localStorage.setItem("studyflow_name", name.trim());

    onComplete(name.trim());
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">

        <div className="welcome-logo">
          S
        </div>

        <span className="welcome-small">
          BEM-VINDO AO STUDYFLOW
        </span>

        <h1>
          Vamos começar?
        </h1>

        <p>
          Primeiro, queremos saber como podemos te chamar.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="name">
            Seu nome
          </label>

          <input
            id="name"
            type="text"
            placeholder="Digite seu nome..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />

          <button type="submit">
            Começar meus estudos
            <span>→</span>
          </button>

        </form>

      </div>
    </div>
  );
}

export default Welcome;