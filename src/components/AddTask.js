import { useState } from "react";
const AddTask = ({onAdd}) => {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [remainder, setRemainder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Please Add Task");
        }
        onAdd({ text, day, remainder });
        setText("");
        setDay("");
        setRemainder(false);
    };

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label className="">Task</label>
                <input
                    type="text"
                    placeholder="Add Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="">Day & Time</label>
                <input
                    type="text"
                    placeholder="Add Day & Time"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label className="">Set Remainder</label>
                <input
                    type="checkbox"
                    checked={remainder}
                    value={remainder}
                    onChange={(e) => setRemainder(e.target.value)}
                />
            </div>
            <div className="form-control">
                <input
                    type="submit"
                    value="Save Task"
                    className="btb btn-block"
                />
            </div>
        </form>
    );
};

export default AddTask;
