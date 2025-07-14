import { useState, useEffect } from "react";

function App() {
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  useEffect(() => {
    // Set up countdown timer
    const timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer);
          // Redirect back to the main app with authentication success parameter
          window.location.href = "http://localhost:5173?auth=success";
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="auth-container">
      <header>
        <h1>Authentication App</h1>
      </header>

      <div className="card">
        <h2>Authentication in progress...</h2>

        <p>
          Redirecting back to the main app in {secondsRemaining} second
          {secondsRemaining !== 1 ? "s" : ""}
        </p>
      </div>

      <p className="info">
        This simulates a third-party authentication provider
      </p>
    </div>
  );
}

export default App;
