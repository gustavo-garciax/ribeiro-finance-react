import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo e usuário */}
      <div className="perfil">

        <div className="logo">
          <img src="/logo.png" alt="Ribeiro Finance" />
        </div>

        <div className="perfil-info">
          <strong>RIBEIRO FINANCE</strong>
          <span>Administrador</span>
        </div>

      </div>

      {/* Menu */}
      <nav className="menu">

        <Link to="/" className="menu-item">
          <i className="fa-solid fa-chart-column"></i>
          <span>Dashboard</span>
        </Link>

        <Link to="/adicionar-gasto" className="menu-item">
          <i className="fa-solid fa-circle-plus"></i>
          <span>Adicionar gastos</span>
        </Link>

        <Link to="/analises" className="menu-item">
          <i className="fa-solid fa-arrow-trend-up"></i>
          <span>Análises</span>
        </Link>

        <Link to="/metas" className="menu-item">
          <i className="fa-solid fa-bullseye"></i>
          <span>Metas</span>
        </Link>

        <Link to="/configuracoes" className="menu-item">
          <i className="fa-solid fa-gear"></i>
          <span>Configurações</span>
        </Link>

      </nav>

      {/* Logout */}
      <div className="logout">
        <button>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;