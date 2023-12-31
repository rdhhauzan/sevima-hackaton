const express = require(`express`);
const app = express();
const port = process.env.PORT || 3000;
const cors = require(`cors`);
const Controller = require("./controllers/index");
const authentication = require("./middlewares/authentication");
const adminAuthorization = require("./middlewares/authorization");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", Controller.RegisterUser);
app.post("/login", Controller.loginUser);

app.use(authentication);

// ! Start admin routes
app.get("/admin/quizzes", adminAuthorization, Controller.adminShowQuiz);
app.post("/admin/quizzes", adminAuthorization, Controller.adminAddQuiz);
app.get(
  "/admin/quizzes/:id",
  adminAuthorization,
  Controller.adminShowSpecificQuiz
);
app.put("/admin/quizzes/:id", adminAuthorization, Controller.editQuiz);
app.delete("/admin/quizzes/:id", adminAuthorization, Controller.deleteQuiz);

app.get(
  "/admin/quizzes/:quizId/questions",
  adminAuthorization,
  Controller.getQuestionForSpecificQuiz
);
app.post(
  "/admin/quizzes/:quizId/questions",
  adminAuthorization,
  Controller.addQuestionForSpecificQuiz
);
app.get(
  "/admin/quizzes/:quizId/questions/:questionId",
  adminAuthorization,
  Controller.getSpecificQuestioninSpecificQuiz
);
app.put(
  "/admin/quizzes/:quizId/questions/:questionId",
  adminAuthorization,
  Controller.editSpecificQuestioninSpecificQuiz
);
app.delete(
  "/admin/quizzes/:quizId/questions/:questionId",
  adminAuthorization,
  Controller.deleteSpecificQuestioninSpecificQuiz
);

app.get("/admin/users", adminAuthorization, Controller.adminGetAllUsers);
app.get("/admin/users/:id", adminAuthorization, Controller.getSpecificUser);
app.get(
  "/admin/avg/quizzes",
  adminAuthorization,
  Controller.getAllQuizzesAverageScore
);
// ! End admin routes

app.get("/quizzes", Controller.showQuiz);
app.get("/quizzes/:id", Controller.showSpecificQuiz);
app.get("/quizzes/:id/questions", Controller.getQuestionBySpecificQuiz);
app.post("/quizzes/:quizId/answers", Controller.calculateTheScore);
app.get("/users/profile", Controller.userProfile);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
