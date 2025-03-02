import React, { use } from "react";
import RoundButton from "../components/RoundButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SupabaseContext } from "../contexts/SupabaseContext";

function SettingsBar() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { auth } = use(SupabaseContext);

  const handleLogout = async () => {
    const { error } = await auth.signOut();
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-96 min-w-96 h-full flex flex-col bg-neutral-900 text-neutral-300 border-r border-neutral-700 p-4 relevant">
      <div className="flex items-center mb-4">
        <RoundButton
          className="mr-4"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          }
          onClick={() => navigate("/")}
          text="Back"
        />
        <h1 className="text-2xl font-bold text-neutral-200">Settings</h1>
      </div>
      <div className="">
        <Link
          to="/account/feedback"
          className="text-neutral-200 hover:text-neutral-100 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          Feedback
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 pb-4 px-4 flex flex-col gap-4 w-96">
        <p className="text-neutral-200">{user?.email}</p>
        <button
          className="bg-neutral-200 text-neutral-800 px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsBar;
