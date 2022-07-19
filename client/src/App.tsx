import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import ScrollToTop from "./hooks/scrollToTop";
import useRoutes from "./hooks/useRoutes";
import { setupStore } from "./store/store";

const store = setupStore();

function App() {
  const routes = useRoutes();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>{routes}</Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
