import { FC, ReactElement } from "react";
import "./Layout.scss";

interface LayoutProps {
  children: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>HEADER</header>
      <main className='layout'>
        <div className='page_wrapper'>{children}</div>
      </main>
      <footer>FOOTER</footer>
    </>
  );
};
