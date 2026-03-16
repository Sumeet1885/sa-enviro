import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./Styles/theme.css";
import "./Styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
