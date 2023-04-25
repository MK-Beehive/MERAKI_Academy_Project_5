import React from "react";
import { NavButtons } from "../NavButtons";
import { NavButtonsSec } from "../NavButtonsSec";
// import '../App.css';
import "./home.css";

function Home() {
  return (
    <div className="homepage">
      <div className="hero-container">
        <video src={"../assets/work.mp4"} autoPlay loop muted />
        <h1>Projects Are Waiting</h1>
        <div className="hero-btns">
          <div className="one">
            <p>If you have project and want to make it done </p>
            <NavButtons
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              Create Project
            </NavButtons>
          </div>
          <br />
          <div className="two">
            <p>If you are a freelancer and wants help </p>
            <NavButtonsSec
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              View Projects{" "}
            </NavButtonsSec>
          </div>
        </div>
      </div>
      <div className="second-sec">
      <h1>How BeeHive helps you do your business</h1>
      <div className="cards-a">
        <div className="achieve-fast">
          <img src={"../assets/achievefaster.png"}></img>
          <p>publish your project and let the rest to our best freelancers </p>
        </div>

        <div className="hire-best">
          <img src={"../assets/hirebest.png"}></img>
          <p>Explore our freelancers` profiles , see their skills, work, and customer ratings, and choose the most suitable one </p>
        </div>

        <div className="less-cost">
          <img src={"../assets/lesscost.png"}></img>
          <p>Determine a budget for your project and choose  the best freelancers to work on it</p>
        </div>

      </div>
      <div className="cards-b">
        <div className="secure-pay">
          <img src={"../assets/securepayment.png"}></img>
          <p>Pay the value of the required work with a secure payment methods with full guarantee of your financial rights </p>
        </div>

        <div className="cover-skills">
          <img src={"../assets/skills.png"}></img>
          <p>Hire experts in different fields to implement the projects you need</p>
        </div>

        <div className="rights">
          <img src={"../assets/rights.png"}></img>
          <p>Preserve your rights. BeeHive plays the role of mediator between you and the freelancer</p>
        </div>

      </div>
      </div>

      <div className="third-sec">
      <h1>Do you have work you want to get done?</h1>
      <div className="vedio-third">
        
      </div>

      </div>

    </div>
  );
}

export default Home;
