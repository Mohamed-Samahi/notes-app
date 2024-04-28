import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

import { UserContextProvider } from "./context/UserContext";
import { lazy, Suspense } from "react";

const UserNotes = lazy(() => import("./pages/UserNotes"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <UserContextProvider>
      <div className="flex flex-col items-center w-screen h-screen">
        <Header />
        <div className="flex-1 flex-grow w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<Loading />}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loading />}>
                    <UserNotes />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
