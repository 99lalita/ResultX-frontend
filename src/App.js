import "./App.css";
import HomePage from "./pages/HomePage";
import SignupTemp from "./pages/SignupTemp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup/*" element={<SignupTemp />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
