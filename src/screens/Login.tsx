import meshGradient from "../images/mesh-gradient-1.png";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState, use } from "react";
import { SupabaseContext } from "../contexts/SupabaseContext";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { auth } = use(SupabaseContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    try {
      const validatedFields = loginSchema.safeParse({ email, password });
      if (!validatedFields.success) {
        setError("Invalid fields");
        setIsLoading(false);
        setIsError(true);
        return;
      }
      const { data, error } = await auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        setIsSuccess(true);
        setIsError(false);
        setError("");
        setEmail("");
        setPassword("");
        setIsLoading(false);
        navigate("/editor");
      } else {
        setError("No user data returned");
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred");
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);

      return;
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div
        className="w-1/2 h-full bg-cover bg-center shadow-lg"
        style={{ backgroundImage: `url(${meshGradient})` }}
      ></div>
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold text-neutral-300 mb-8 self-start">
            Login
          </h1>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-neutral-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-neutral-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none mb-4 shadow-inset"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {isSuccess && <p className="text-green-500">Login successful</p>}
          {isError && <p className="text-red-500">Login failed</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
