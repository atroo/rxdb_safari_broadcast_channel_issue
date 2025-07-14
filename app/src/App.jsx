import { useState, useEffect } from "react";

const PAGE_TITLE = "RxDB Leader Election Test";

function App({ db }) {
  const [isLeader, setIsLeader] = useState(false);

  // Update document title based on isLeader state
  useEffect(() => {
    document.title = isLeader ? `👑 LEADER - ${PAGE_TITLE}` : PAGE_TITLE;
  }, [isLeader]);

  // Check leader election status
  const checkLeaderStatus = async () => {
    try {
      const elector = db.leaderElector();

      const isLeader = elector.isLeader;
      const hasLeader = await elector.hasLeader();

      const msg = `Leader election status: isLeader=${isLeader}, hasLeader=${hasLeader}`;
      console.log(msg);
    } catch (err) {
      console.error("Error checking leader status:", err);
    }
  };

  // Set up leader election listener
  useEffect(() => {
    // Update when this tab becomes leader
    db.waitForLeadership()
      .then(() => {
        console.log("This tab is now the leader!");
        setIsLeader(true);
        checkLeaderStatus();
      })
      .catch((err) => {
        console.error("Error waiting for leadership:", err);
      });

    // Check initial status
    checkLeaderStatus();

    // Check status every 5 seconds
    const interval = setInterval(checkLeaderStatus, 5000);
    return () => clearInterval(interval);
  }, [db]);

  // Handle login button click
  const handleLogin = () => {
    // Redirect to auth app (app2)
    window.location.href = "http://localhost:5174";
  };

  return (
    <div className="app-container">
      <header>
        <h1>{PAGE_TITLE}</h1>
      </header>

      <div className="card">
        <div className="leader-status">
          <h2>Status: {isLeader ? "👑 LEADER" : "NOT LEADER"}</h2>

          <div className="status-details">
            <p>
              <strong>Tab ID:</strong> {db.token}
            </p>
          </div>

          <button onClick={checkLeaderStatus}>Refresh Status</button>
          <button onClick={handleLogin}>Simulate Login</button>

          <p className="info">
            Open this page in multiple tabs or browsers to test leader election.
            <br />
            <small>Browser tab IDs should elect exactly one leader.</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
