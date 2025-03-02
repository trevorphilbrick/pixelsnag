import { Outlet } from "react-router-dom";
import SettingsBar from "../components/SettingsBar";

function Settings() {
  return (
    <div className=" h-screen w-screen flex">
      <SettingsBar />
      <Outlet />
    </div>
  );
}

export default Settings;
