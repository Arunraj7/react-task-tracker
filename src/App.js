import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTask = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTask();
    }, []);

    //Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();
        // console.log(data);
        return data;
    };

    //Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:3000/tasks/${id}`);
        const data = await res.json();
        // console.log(data);
        return data;
    };

    //Add Task

    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 10000) + 1;
        // const newTask = { id, ...task };
        // setTasks([...tasks, newTask]);

        const res = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();
        setTasks([...tasks, data]);
    };

    //Delete Tasks
    const deleteTask = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        });

        // console.log("delete", id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    //Toggle Remainder
    const toggleRemainder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, remainder: !taskToToggle.remainder };

        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, remainder: data.remainder } : task
            )
        );
    };

    return (
        <Router>
            <div className="container">
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />

                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}
                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleRemainder}
                                />
                            ) : (
                                "No tasks to show"
                            )}
                        </>
                    )}
                />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
