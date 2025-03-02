import React, { use } from "react";
import RoundButton from "../components/RoundButton";
import { useNavigate } from "react-router-dom";
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
    <div className="w-96 h-full bg-neutral-900 text-neutral-300 border-l border-neutral-700">
      <h1 className="text-2xl font-bold text-neutral-200">Settings</h1>
      <RoundButton
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
      <p className="text-neutral-200">{user?.email}</p>
      <button
        className="bg-neutral-200 text-neutral-800 px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>{" "}
    </div>
  );
}

export default SettingsBar;
