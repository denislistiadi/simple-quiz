import { useEffect, useReducer, useState } from "react";
import Nama from "./components/Nama";
import Quiz from "./components/Quiz";
import Icon from "./assets/icon.svg";
import Ranking from "./components/Ranking";
import { data } from "./data";
import { userReducer } from "./reducer/user";
import Score from "./components/Score";
import Loading from "./components/Loading";

const getRandom = (max: any) => {
  return Math.floor(Math.random() * Math.floor(max));
};

function App() {
  const host = "https://the-trivia-api.com/api/";
  const initialState = { name: "", point: 0 };
  const [category, setCategory] = useState("Arts_and_Literature");
  const [categoryList, setCategoryList] = useState([]);
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [name, setName] = useState("you");
  const [difficulty, setDifficulty] = useState("easy");
  const [question, setQuestion] = useState<any>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setChoice] = useState([]);
  const [timer, setTimer] = useState(0);
  const [hideName, setHideName] = useState(true);
  const [hideTimer, setHideTimer] = useState(false);
  const [hideQuiz, setHideQuiz] = useState(false);
  const [hideScore, setHideScore] = useState(false);
  const [hideLeaderboard, setHideLeaderboard] = useState(false);
  const [loading, setLoading] = useState(true);

  // handle Loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  // fetch category list
  useEffect(() => {
    fetch(`${host}categories`)
      .then((res: any) => res.json())
      .then((data: any) => setCategoryList(data))
      .catch((err) => console.log(err));
  }, []);

  // set Timer
  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    if (hideTimer && timer === 0) {
      if (questionIndex + 1 <= question.length) {
        setQuestionIndex(questionIndex + 1);
        setTimer(30);
      } else {
        setHideScore(true);
        setHideQuiz(false);
        setHideTimer(false);
        setLoading(true);
      }
    }

    return () => {
      clearInterval(timeout);
    };
  }, [timer]);

  // random choice
  useEffect(() => {
    if (question.length > 0) {
      const questionItem: any = question[questionIndex];
      let answers: any = [...questionItem.incorrectAnswers];
      answers.splice(
        getRandom(questionItem.incorrectAnswers.length),
        0,
        questionItem.correctAnswer
      );
      setChoice(answers);
    }
  }, [question, questionIndex]);

  let details = [];
  for (const property in categoryList) {
    details.push(property);
  }

  // fetch data question
  const fetchQuestion = () => {
    fetch(
      `${host}questions?categories=${category}&limit=10&region=ID&difficulty=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  // start Quiz
  const startQuiz = (e: any) => {
    e.preventDefault();
    dispatch({ type: "SET_NAME", payload: name });
    fetchQuestion();
    setHideName(false);
    setHideTimer(true);
    setHideQuiz(true);
    setTimer(30);
    setLoading(true);
  };

  // handle click Answer
  const handleClickAnswer = (item: any) => {
    const questionItem: any = question[questionIndex];

    if (item === questionItem.correctAnswer) {
      dispatch({ type: "SET_POINT", payload: 10 });
    }

    if (questionIndex + 1 < question.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setHideQuiz(false);
      setHideScore(true);
      setHideTimer(false);
    }
    setTimer(30);
    setLoading(true);
  };

  // to leaderboard
  const toBeLeaderbard = () => {
    data.push(state);
    setHideScore(false);
    setHideLeaderboard(true);
    setLoading(true);
  };

  return (
    <div className="bg-[url('/src/assets/background.webp')] bg-cover  bg-no-repeat font-monospace m-auto h-full ">
      <div className="py-16 max-w-md mx-auto min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-gray-100 mx-4">
          Simple Quiz
        </h1>
        <div className="bg-white m-auto max-w-md mx-4 pt-12 relative rounded-2xl shadow-xl">
          {hideTimer && !loading && (
            <p className="absolute px-2 py-1 rounded-full bg-fuchsia-500 text-white text-lg top-4 left-4">
              {timer < 10 ? "0" + timer : timer}
            </p>
          )}
          <img
            src={Icon}
            width={162}
            height={116}
            className="absolute right-0 hidden sm:block -top-14"
          />
          {hideName && !loading && (
            <Nama
              changeName={(e: any) => setName(e.target.value)}
              cangeCategory={(e: any) =>
                setCategory(
                  e.target.value.replace("&", "and").replaceAll(" ", "_")
                )
              }
              category={details[0]}
              cangeDifficulty={(e: any) => setDifficulty(e.target.value)}
              difficulty={"easy"}
              categories={details}
              start={(e: any) => startQuiz(e)}
            />
          )}
          {hideQuiz && question.length > 0 && !loading && (
            <Quiz
              question={question[questionIndex].question}
              choices={choice}
              click={handleClickAnswer}
            />
          )}
          {hideScore && !loading && (
            <Score score={state.point} click={() => toBeLeaderbard()} />
          )}
          {hideLeaderboard && !loading && <Ranking data={data} />}

          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default App;
