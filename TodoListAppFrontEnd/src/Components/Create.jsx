import { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState();
  const add = () => {
    axios
      .post("http://localhost:5000/add", { task: task })
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <div className="create-form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" onClick={add}>
        Add
      </button>
    </div>
  );
};

export default Create;
