import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <form onSubmit={login} className="flex flex-col">
        <h1 className="text-4xl mb-8">Login Form</h1>
        <label className="text-2xl">Email</label>
        <input
          required
          type="email"
          name="email"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
        />
        <label className="text-2xl">Password</label>
        <input
          required
          type="password"
          name="password"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
        />
        <button
          type="submit"
          className="bg-[#192e4c] text-white rounded-md p-2 m-2 hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
