import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "NextJS",
            day: "Jul 1 at 19:02",
            remainder: true,
        },
        {
            id: 2,
            text: "Firestore",
            day: "Jul 2  at 19:02",
            remainder: true,
        },
        {
            id: 3,
            text: "NextJS API",
            day: "Jul 3 at 19:02",
            remainder: false,
        },
    ]);

    //Delete Tasks
    const deleteTask = (id) => {
        // console.log("delete", id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    //Toggle Remainder
    const toggleRemainder = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, remainder: !task.remainder } : task
            )
        );
    };

    return (
        <div className="container">
            <Header />
            {tasks.length > 0 ? (
                <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleRemainder}
                />
            ) : (
                "No tasks to show"
            )}
        </div>
    );
}

export default App;
