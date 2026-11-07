import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">Página não encontrada</p>
      <Link to="/" className="not-found__link">
        Voltar ao Dashboard
      </Link>
    </div>
  )
}
