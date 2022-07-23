import { FC, ReactElement } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./Layout.scss";

interface LayoutProps {
  children: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='layout'>
        <div className='page_wrapper'>{children}</div>
      </main>
      <Footer />
    </>
  );
};
