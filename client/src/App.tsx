import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Layout } from "./components/Layout/Layout";
import useAuth from "./hooks/auth.hook";
import ScrollToTop from "./hooks/scrollToTop.hook";

function App() {
  const { token } = useAuth();
  const isAuth = !!token;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <AppRoutes isAuth={isAuth} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
