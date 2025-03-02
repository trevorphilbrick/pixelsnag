import { use } from "react";
import { useAuth } from "../hooks/useAuth";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { useNavigate } from "react-router-dom";
import SettingsBar from "../components/SettingsBar";

function Settings() {
  return (
    <div className=" h-screen w-screen">
      <SettingsBar />
    </div>
  );
}

export default Settings;
