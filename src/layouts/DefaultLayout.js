import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import BackToTop from "../components/user/BackToTop";
import React from "react";

function DefaultLayout({ children }) {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="mt-4 flex-1">
        <div> {React.cloneElement(children)}</div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default DefaultLayout;
