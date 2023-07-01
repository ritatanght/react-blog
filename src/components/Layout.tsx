import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="w-11/12 mx-auto py-4 max-w-screen-xl">
        <section className="lg:grid grid-cols-4 gap-4 items-start">
          <div className="col-span-3">
            <Outlet />
          </div>
          <Aside />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
