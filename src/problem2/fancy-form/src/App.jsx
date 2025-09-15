import "./App.css";
import "./index.css";
import FancyContainer from "./components/FancyContainer";

function App() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      <div className="app-bg absolute inset-0 z-0" />
      <FancyContainer />
    </div>
  );
}

export default App;
