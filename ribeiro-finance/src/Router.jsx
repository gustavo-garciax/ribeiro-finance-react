import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Tarefas from './Pages/Tarefas'
import Materias from './Pages/Materias'
import "./Global.css"
import Progresso from './Pages/Progresso'

export default function Router() {
  return (
    <BrowserRouter>
        <Sidebar />

        <div className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/tarefas" element={<Tarefas />} />
                <Route path="/materias" element={<Materias />} />
                <Route path="/progresso" element={<Progresso />} />
            </Routes>
        </div>
    </BrowserRouter>
  )
}