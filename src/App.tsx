import { Outlet } from "react-router";
import Navbar from "./components/Layout/shared/Navbar";
import Footer from "./components/Layout/shared/Footer";


const App = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-dvh">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;