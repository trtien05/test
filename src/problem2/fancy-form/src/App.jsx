import "./App.css";
import SwapForm from "./components/SwapForm";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-white relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
      `,
            backgroundSize:
              "48px 48px, 48px 48px, 100% 100%, 100% 100%",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            <div >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
                Swap Anytime,
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl  font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-8 tracking-tight leading-tight">
                Anywhere
              </h1>
            </div>
            <div className="swap-form-container w-full flex justify-center">
              <SwapForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
