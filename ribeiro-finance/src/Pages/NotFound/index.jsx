
import "./NotFound.css"

export default function index() {
    return (
        <main class="error-page">
            <div class="glow glow-1"></div>
            <div class="glow glow-2"></div>

            <section class="error-card">
                <div class="icon">📚</div>

                <span class="badge">ERRO 404</span>

                <h1>Ops! Essa página sumiu das anotações.</h1>

                <p>
                    Parece que essa página foi perdida entre seus resumos,
                    anotações e materiais de estudo.
                </p>

                <a href="/" class="button">
                    ← Voltar para os estudos
                </a>

                <div class="study-decoration">
                    <span>📝</span>
                    <span>💡</span>
                    <span>📖</span>
                </div>
            </section>
        </main>

    )
}
