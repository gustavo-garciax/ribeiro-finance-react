import { Link } from "react-router-dom";
import "./Sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">S</div>
        <span>StudyFlow</span>
      </div>

      <nav className="sidebar-menu">

        <span className="menu-label">MENU</span>

        <Link to="/" className="menu-item active">
          <span className="menu-icon">⌂</span>
          <span>Dashboard</span>
        </Link>

        <Link to="/tarefas" className="menu-item active">
          <span className="menu-icon">✓</span>
          <span>Tarefas</span>
        </Link>

        <Link to="/materias" className="menu-item active">
          <span className="menu-icon">▣</span>
          <span>Matérias</span>
        </Link>

        <Link to="/progresso" className="menu-item active">
          <span className="menu-icon">◴</span>
          <span>Progresso</span>
        </Link>


      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          G
        </div>

        <div className="user-info">
          <strong>Gustavo</strong>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;