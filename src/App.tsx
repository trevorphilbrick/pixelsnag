import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Editor from "./screens/Editor";
import Info from "./screens/Info";
import { useEnvVariable } from "./hooks/useEnvVariable";
import { SupabaseProvider } from "./contexts/SupabaseContext";
import { useAuth } from "./hooks/useAuth";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import Feedback from "./components/Feedback";

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && location.pathname === "/") {
    return <Navigate to="/editor" replace />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/editor" replace /> : <Login />}
      />
      <Route
        path="/editor"
        element={
          <AuthenticatedRoute>
            <Editor />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/info"
        element={
          <AuthenticatedRoute>
            <Info />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <AuthenticatedRoute>
            <Settings />
          </AuthenticatedRoute>
        }
      >
        <Route index element={<Navigate to="/account/feedback" replace />} />
        <Route path="/account/feedback" element={<Feedback />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const supabaseUrl = useEnvVariable("SUPABASE_API");
  const supabaseKey = useEnvVariable("SUPABASE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    return <div>Loading...</div>;
  }

  return (
    <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
      <Router>
        <AppRoutes />
      </Router>
    </SupabaseProvider>
  );
}
