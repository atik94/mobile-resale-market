import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Particle from "./components/Particle";
import router from "./Routes/Routes/Routes";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
      {/* <Particle /> */}
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
