import Router from "./routes/router";
import { initAxios } from "./services/RestAPI/Initializer";

initAxios();

function App() {
  return <Router />;
}

export default App;
