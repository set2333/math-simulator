import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store, StoreContext } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
