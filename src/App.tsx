import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import Header from "./components/Header";
import CreateFormPage from "./pages/CreateFormPage";
import EditFormPage from "./pages/EditFormPage";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-form" element={<CreateFormPage />} />
        <Route path="/form/:id/edit" element={<EditFormPage />} />
        <Route path="/:path" element={<FormPage />} />
      </Routes>
    </>
  );
};

export default App;
