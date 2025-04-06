import { useActionState, useCallback } from "react";
import { loginUser } from "../../services/RestAPI/RestAPIList";
import { setToStorage } from "../../services/storage/Storage";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/Socket/SocketService";

// TODO: We can create custom Input and Button component to prevent code duplication
// TODO: We can separate login logics to a custom hook for better code structure

const Login: React.FC = () => {
  const navigate = useNavigate();

  const doLogin = useCallback(
    async (prevData: unknown, formData: FormData) => {
      try {
        const username = formData.get("Username") as string;
        const password = formData.get("Password") as string;
        if (!username || !password) return { error: "All fields are required" };
        const res = await loginUser(username, password);
        setToStorage("token", res.token);
        setToStorage("user", res.user);
        socket.auth = { token: res.token };
        socket.connect();
        navigate("/");
      } catch (e) {
        return { error: "Username or password incorrect" };
      }
    },
    [navigate]
  );

  const [state, formAction, isPending] = useActionState(doLogin, undefined);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form action={formAction}>
          <input
            type="text"
            placeholder="Username"
            name={"Username"}
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name={"Password"}
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.error && (
            <p className="text-red-300 text-center mb-4">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
