import "./Card.css";

function Card({ titulo, valor, icone, classe }) {
    return (
        <article className="card">

            <i className={`${icone} ${classe || ""}`}></i>

            <p>{titulo}</p>

            <h2>{valor}</h2>

        </article>
    );
}

export default Card;