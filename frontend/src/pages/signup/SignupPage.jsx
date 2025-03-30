import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const { signup } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={signup}
        className="grid grid-cols-2 gap-4 w-full max-w-2xl"
      >
        <h1 className="text-4xl mb-8 col-span-2 text-center">Signup Form</h1>

        <div className="flex flex-col">
          <label className="text-2xl">Name</label>
          <input
            required
            type="text"
            name="name"
            className="border-2 border-gray-300 rounded-md p-2"
          />

          <label className="text-2xl">Username</label>
          <input
            required
            type="text"
            name="username"
            className="border-2 border-gray-300 rounded-md p-2"
          />

          <label className="text-2xl">Location</label>
          <input
            required
            type="text"
            name="location"
            className="border-2 border-gray-300 rounded-md p-2"
          />

          <label className="text-2xl">Role</label>
          <select
            required
            name="role"
            className="border-2 border-gray-300 rounded-md p-2"
          >
            <option value="regular">Regular</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Email</label>
          <input
            required
            type="email"
            name="email"
            className="border-2 border-gray-300 rounded-md p-2"
          />

          <label className="text-2xl">Password</label>
          <input
            required
            type="password"
            name="password"
            className="border-2 border-gray-300 rounded-md p-2"
          />

          <label className="text-2xl">Gender</label>
          <input
            required
            type="text"
            name="gender"
            className="border-2 border-gray-300 rounded-md p-2"
          />

          <label className="text-2xl">Date of Birth</label>
          <input
            required
            type="date"
            name="dateOfBirth"
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-[#192e4c] text-white rounded-md p-2 hover:cursor-pointer"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
