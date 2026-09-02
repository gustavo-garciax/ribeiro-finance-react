import { useState } from "react";
import "./TaskCard.css";

function TaskCard() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Estudar Matemática",
            subject: "Matemática",
            date: "Hoje",
            completed: false,
        },
        {
            id: 2,
            title: "Fazer trabalho de História",
            subject: "História",
            date: "Hoje",
            completed: false,
        },
        {
            id: 3,
            title: "Revisar Português",
            subject: "Português",
            date: "Hoje",
            completed: false,
        },
        {
            id: 4,
            title: "Estudar Física",
            subject: "Física",
            date: "Hoje",
            completed: false,
        },


    ]);

    function toggleTask(id) {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    return (
        <div className="task-card">

            <div className="task-card-header">
                <div>
                    <h2>Tarefas de hoje</h2>
                    <span>
                        {tasks.filter((task) => !task.completed).length} tarefas pendentes
                    </span>
                </div>

                <button>Ver todas</button>
            </div>

            <div className="task-list">

                {tasks.map((task) => (
                    <div
                        className={`task-item ${task.completed ? "completed" : ""
                            }`}
                        key={task.id}
                    >

                        <button
                            className="task-check"
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.completed && "✓"}
                        </button>

                        <div className="task-info">
                            <strong>{task.title}</strong>

                            <span>
                                {task.subject} • {task.date}
                            </span>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default TaskCard;