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

        <a href="#" className="menu-item active">
          <span className="menu-icon">⌂</span>
          <span>Dashboard</span>
        </a>

        <a href="#" className="menu-item">
          <span className="menu-icon">✓</span>
          <span>Tarefas</span>
        </a>

        <a href="#" className="menu-item">
          <span className="menu-icon">▣</span>
          <span>Matérias</span>
        </a>

        <a href="#" className="menu-item">
          <span className="menu-icon">◴</span>
          <span>Progresso</span>
        </a>

        <span className="menu-label settings-label">
          OUTROS
        </span>

        <a href="#" className="menu-item">
          <span className="menu-icon">⚙</span>
          <span>Configurações</span>
        </a>

      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          G
        </div>

        <div className="user-info">
          <strong>Gustavo</strong>
          <span>Estudante</span>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;