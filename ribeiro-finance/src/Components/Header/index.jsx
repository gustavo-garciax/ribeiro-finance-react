import "./Header.css"

function Header() {
  return (
    <header className="header">

      <div className="header-left">
        <span className="header-brand">StudyFlow</span>
      </div>

      <div className="header-right">

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Pesquisar..."
          />
        </div>

        <button className="header-button">
          🔔
        </button>

        <button className="header-button">
          🌙
        </button>

        <div className="header-profile">
          <div className="profile-avatar">
            G
          </div>

          <div className="profile-info">
            <strong>Gustavo</strong>
            <span>Estudante</span>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;