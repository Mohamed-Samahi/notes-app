import { UserAuth } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (user?.email) {
    return children;
  } else {
    return;
  }
};

export default ProtectedRoute;
