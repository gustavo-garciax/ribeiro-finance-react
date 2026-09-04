import ProgressCard from "../Components/ProgressCard";
import StatCard from "../Components/StatCard";
import TaskCard from "../Components/TaskCard"; 

export default function Home() {
    return (
        <div className="container">

            <main>

                <h1>Olá, Gustavo! 👋</h1>

                <div className="stats">
                    <StatCard />
                </div>

            </main>

            <TaskCard />

            <ProgressCard />
        </div>
    )
}