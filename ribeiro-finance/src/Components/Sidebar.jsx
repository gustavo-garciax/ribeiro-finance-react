import { NavLink } from 'react-router-dom'
import { useFinance } from '../contexts/FinanceContext'
import { formatCurrency } from '../utils/formatters'
import { 
  MdDashboard, 
  MdAdd, 
  MdShowChart, 
  MdTrackChanges, 
  MdSettings 
} from 'react-icons/md'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import './Sidebar.css'

export default function Sidebar() {
  const { getTotalExpenses } = useFinance()
  const [mobileOpen, setMobileOpen] = useState(false)

  const totalExpenses = getTotalExpenses()

  const navItems = [
    { path: '/', icon: <MdDashboard />, label: 'Dashboard' },
    { path: '/adicionar', icon: <MdAdd />, label: 'Adicionar Gasto' },
    { path: '/analises', icon: <MdShowChart />, label: 'Análises' },
    { path: '/metas', icon: <MdTrackChanges />, label: 'Metas' },
    { path: '/configuracoes', icon: <MdSettings />, label: 'Configurações' },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <h1 className="sidebar__brand">RibeiroFinance</h1>
          <p className="sidebar__subtitle">Controle seus gastos</p>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              <span className="sidebar__link-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__total-card">
            <span className="sidebar__total-label">Total este mês</span>
            <span className="sidebar__total-value">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}
