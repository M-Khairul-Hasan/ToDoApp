const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./Models/todoSchema");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://Shanto:Shantonu12@cluster0.f33r5.mongodb.net/todo"
).then(()=>{});

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  task === undefined
    ? console.log("undefined")
    : TodoModel.create({
        task: task,
      })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});
