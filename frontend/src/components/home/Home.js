import React, { useRef } from "react";
import { NavButtons } from "../NavButtons";
import { NavButtonsSec } from "../NavButtonsSec";
// import '../App.css';
import emailjs from "@emailjs/browser";

import "./home.css";
import { Collapse } from "antd";
import Footer from "../footer/Footer";
const { Panel } = Collapse;

function Home() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_izy9qws",
        "template_nisndqp",
        form.current,
        "qsWx1Nn--di_P6Z59"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="homepage">
      <div className="hero-container">
        <video src={"../assets/work.mp4"} autoPlay loop muted />
        <h1>Projects Are Waiting</h1>
        <div className="hero-btns">
          <div className="one">
            <p>If you have a project and want to make it done </p>
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
            <p>If you are a freelancer and wants to help </p>
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
      <div className="rest-section">
        <div className="second-sec">
          <h1>How BeeHive helps you do your business</h1>
          <div className="cards-a">
            <div className="achieve-fast">
              <img src={"../assets/achievefaster.png"}></img>
              <p>
                publish your project and let the rest to our best freelancers{" "}
              </p>
            </div>

            <div className="hire-best">
              <img src={"../assets/hirebest.png"}></img>
              <p>
                Explore our freelancers` profiles , see their skills, work, and
                customer ratings, and choose the most suitable one{" "}
              </p>
            </div>

            <div className="less-cost">
              <img src={"../assets/lesscost.png"}></img>
              <p>
                Determine a budget for your project and choose the best
                freelancers to work on it
              </p>
            </div>
          </div>
          <div className="cards-b">
            <div className="secure-pay">
              <img src={"../assets/securepayment.png"}></img>
              <p>
                Pay the value of the required work with a secure payment methods
                with full guarantee of your financial rights{" "}
              </p>
            </div>

            <div className="cover-skills">
              <img src={"../assets/skills.png"}></img>
              <p>
                Hire experts in different fields to implement the projects you
                need
              </p>
            </div>

            <div className="rights">
              <img src={"../assets/rights.png"}></img>
              <p>
                Preserve your rights. BeeHive plays the role of mediator between
                you and the freelancer
              </p>
            </div>
          </div>
        </div>

        <div className="third-sec">
          <div className="third-title">
            <h1>Do you have work you want to get done?</h1>
          </div>
          <div className="vedioandpoints">
            <div className="points">
              <div className="add-pro">
                <h1>1) Add Your Project</h1>
                <p>
                  Add details of the project you need to complete and the
                  required skills, and get freelance offers in minutes.
                </p>
              </div>
              <div className="choose-bes-free">
                <h1>2) Choose the right freelancer</h1>
                <p>
                  Compare offers of freelancers, browse their files, reviews and
                  works and choose the best one to implement your project.
                </p>
              </div>

              <div className="choose-bes-free">
                <h1>3) Receive the project</h1>
                <p>
                  The freelancer you choose will work on your project and follow
                  up with you until you have the agreed work results and project
                  delivery.
                </p>
              </div>
            </div>

            <div className="vedio-third">
              <video controls>
                <source src={"../assets/officialvedio.mp4"} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="qa">
          <div className="title">
            <h1>Common Questions</h1>
          </div>
          <div className="questions"></div>
          <Collapse accordion style={{ width: "90%", marginLeft: "2vw" }}>
            <Panel
              header="What is BeeHive?"
              key="1"
              style={{ fontSize: "18px", textAlign: "left" }}
            >
              <p>
                it is a platform that allows project owners to contract with
                professional freelancers to carry out their work, and provides
                professional freelancers a place to find projects to work on and
                earn through.
              </p>
            </Panel>
            <Panel
              header="How do I benefit from it?"
              key="2"
              style={{ fontSize: "18px", textAlign: "left" }}
            >
              <p>
                You can add your project and receive offers from professional
                freelancers interested in working on it to compare offers and
                choose the best one, then hire the freelancer with the best
                offer and follow up with him until the completion of the
                implementation of your project. You can also search yourself for
                the best freelancers and offer them your project directly to
                work on it.
              </p>
            </Panel>
            <Panel
              header="How does BeeHive  guarantee my rights?"
              key="3"
              style={{ fontSize: "18px", textAlign: "left" }}
            >
              <p>
                It fully guarantees you your financial right. Be assured when
                creating any new projects or submitting your offers on the
                projects presented on the site, as the site plays the role of
                mediator between the owner of the project and the freelancer and
                protects the financial rights of both parties.
              </p>
            </Panel>
            <Panel
              header="What feilds can I hire remote freelancers?"
              key="4"
              style={{ fontSize: "18px", textAlign: "left" }}
            >
              <p>
                Companies resort to hiring remote workers in various
                disciplines, including but not limited to workers in the field
                of programming, text editing, e-marketing, design and
                advertising, translation, data entry, article writing, some
                online public relations work, web design and management.
                Websites, market studies and analyzes, and other disciplines.
              </p>
            </Panel>

            <Panel
              header="Why is remote hiring via BeeHive the best option for me?"
              key="5"
              style={{ fontSize: "18px", textAlign: "left" }}
            >
              <p>
                In recent years, the remote employment system has spread
                globally, as many companies and institutions - as well as
                individuals - resort to hiring individuals who work remotely
                from home or anywhere in the world via the Internet. Remote
                hiring does not recognize the existence of geographical borders;
                You can hire talented and creative freelancers from all over the
                world, so that each one of them works from his favorite place
                with complete comfort, and at the times that he sets for
                himself; Thus, employees will have all the factors driving
                production, and companies will have advantages, including low
                cost and saving a large part of money with increased
                productivity, in addition to physical and psychological comfort.
              </p>
            </Panel>
          </Collapse>
        </div>
        <div className="contact">
          <div className="contacttitle">
            <h1
              style={{
                fontFamily:
                  "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande','Lucida Sans', Arial, sans-serif",
              }}
            >
              {" "}
              Lets Keep in Touch
            </h1>
          </div>
          <div className="keepintouch">
            <div class="vertical">
              <form ref={form} onSubmit={sendEmail}>
                <br></br>
                <p fontFamily="  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande','Lucida Sans', Arial, sans-serif;
">Name</p>
                <br></br>
                <input type="text" name="from_name" style={{width:"30vw",height:"6vh",borderRadius:"5%"}} />
                <br></br>
                <p>Email</p>
                <br></br>
                <input type="email" name="user_email" style={{width:"30vw",height:"6vh",borderRadius:"5%"}}/>
                <br></br>
                <p>Message</p>
                <br></br>
                <textarea name="message" style={{width:"30vw",height:"15vh",borderRadius:"5%"}} />
                <br></br>
                <input className="button-23" type="submit" value="Send" />
              </form>
            </div>
            <div className="keepintouchimg">
              <img className="keepimg" src="./assets/job.jpg"/>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Home;
