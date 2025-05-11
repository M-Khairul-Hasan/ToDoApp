import { useEffect, useState } from "react";
import Create from "./Create.jsx";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);
  const edit = (id) => {
    axios
      .put("http://localhost:5000/update/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };
  const taskdelete = (id) => {
    axios
      .delete("http://localhost:5000/delete/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />

      {todos.length === 0 ? (
        <h2>No Record</h2>
      ) : (
        todos.map((item, i) => (
          <div className="task" key={i}>
            <div className="checkbox" onClick={() => edit(item._id)}>
              {item.done ? (
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={item.done ? "line-thr" : ""}>{item.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => taskdelete(item._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
