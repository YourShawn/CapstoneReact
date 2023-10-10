import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="banner" style={{ backgroundImage: "url(/banner.jpg)" }}>
        <h1>Health care</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
