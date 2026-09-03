import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Tarefas from './Pages/Tarefas'

export default function Router() {
  return (
    <BrowserRouter>
        <Sidebar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/tarefas" element={<Tarefas />} />
        </Routes>
    </BrowserRouter>
  )
}
