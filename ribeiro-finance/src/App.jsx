import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import StatCard from "./Components/StatCard";
import TaskCard from "./Components/TaskCard";
import ProgressCard from "./Components/ProgressCard";


function App() {
  return (
    <>
      <Sidebar />

      <Header />

      <main>

        <h1>Olá, Gustavo! 👋</h1>

        <div className="stats">
          <StatCard />
        </div>

      </main>

      <TaskCard />

      <ProgressCard />

    </>
  );
}

export default App;