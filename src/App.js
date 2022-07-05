import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Community from "./pages/Community";
import PostWrite from "./pages/PostWrite";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/community" exact element={<Community />} />
        <Route path="/postwrite" exact element={<PostWrite />} />
        <Route path="/posts/:index" element={<PostDetail />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
