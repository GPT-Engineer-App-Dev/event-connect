import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventDetails from "./pages/EventDetails.jsx"; // Import the new EventDetails component
import Login from "./pages/Login.jsx"; // Import the Login component
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/event/:id" element={<EventDetails />} /> {/* Add route for event details */}
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
