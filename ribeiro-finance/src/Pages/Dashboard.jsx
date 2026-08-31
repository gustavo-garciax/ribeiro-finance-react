import Sidebar from "../Components/Sidebar";
import Card from "../components/Card";

function Dashboard() {
  return (
    <main className="dashboard">
      <h1>Dashboard</h1>

      <section className="cards">

        <Card
          titulo="Total de gastos"
          valor="R$ 0,00"
          icone="fa-solid fa-arrow-trend-down"
        />

        <Card
          titulo="Categorias"
          valor="0"
           icone="fa-solid fa-table-list"
        />

        <Card
          titulo="Transações"
          valor="0"
          icone="fa-solid fa-money-bills"
        />

      </section>
    </main>
  );
}

export default Dashboard;