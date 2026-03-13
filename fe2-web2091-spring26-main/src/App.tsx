import { Toaster } from "react-hot-toast";
import { Link, Routes, Route } from "react-router-dom";
import Lab1 from "./pages/Lab1";
import Lab2 from "./pages/Lab2";
import Lab3 from "./pages/Lab3";

function App() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

          <Link to="/" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>

            <Link to="/list" className="hover:text-gray-200">
              Lab1
            </Link>

            <Link to="/add" className="hover:text-gray-200">
              Lab2
            </Link>
            <Link to="/form" className="hover:text-gray-200">
              Lab3
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="hover:text-gray-200">
              Đăng nhập
            </Link>

            <Link to="/register" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4">

        <Routes>

          {/* Trang chủ */}
          <Route
            path="/"
            element={
              <h1 className="text-4xl font-bold text-center">
                Chào mừng đến với WEB2091
              </h1>
            }
          />

          {/* Lab 1 */}
          <Route path="/list" element={<Lab1 />} />

          {/* Lab 2 */}
          <Route path="/add" element={<Lab2 />} />

          {/* Lab 3 */}
          <Route path="/form" element={<Lab3 />} />

        </Routes>

      </div>

      <Toaster />
    </>
  );
}

export default App;