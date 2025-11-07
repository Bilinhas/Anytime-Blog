import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AllPosts from "./pages/AllPosts";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main style={{ padding: "0 20px" }}>
          <Routes>
            <Route path="/" element={<AllPosts />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />{" "}
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
