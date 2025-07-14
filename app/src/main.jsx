import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import RxDB and required addons
import { createRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";

// Add the leader election plugin to RxDB
addRxPlugin(RxDBLeaderElectionPlugin);

// Initialize RxDB before rendering the React app
async function init() {
  try {
    console.log("Initializing RxDB...");

    // Create the database with localStorage storage
    const db = await createRxDatabase({
      name: "rxdb-leader-election-test",
      storage: getRxStorageLocalstorage(),
      multiInstance: true, // Enable multi-instance mode (required for leader election)
    });

    // Expose db and elector on window object for debugging
    window.db = db;
    window.elector = db.leaderElector();

    console.log("Database initialized successfully");
    console.log("Tab ID:", db.token);
    console.log("Waiting for leadership...");

    // Render React app with db passed as prop
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App db={db} />
      </StrictMode>
    );
  } catch (err) {
    console.error("Failed to initialize RxDB:", err);

    // Render error state
    createRoot(document.getElementById("root")).render(
      <div className="error-container">
        <h1>Error Initializing Database</h1>
        <p>{err.toString()}</p>
      </div>
    );
  }
}

init();
