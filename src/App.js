import { useState, Suspense, lazy } from "react";
import "./App.css";
import Loading from "./components/Modules/Loading";

const Users = lazy(() => import("./components/Layout/Users"));

function App() {
  const [data, setData] = useState([]);

  return (
    <Suspense fallback={<Loading />}>
      <Users data={data} setData={setData} />
    </Suspense>
  );
}

export default App;
