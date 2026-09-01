import Header from "./Components/Header"
import Sidebar from "./Components/Sidebar"
import "./Global.css"
function App() {
  return (
    <div className="container">
      <Sidebar />

      <Header />
    </div>
  )
}

export default App