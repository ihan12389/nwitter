import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <h1>Enter World Nwitter!</h1>
    <h3>
      Gald to meet you! I'm writing not important things because i just want
      fill this space! i don't know english! is this enough? yeah maybe...?
      thanks your reading like this crazy writings!
    </h3>
    {/* <p>
        HI! this Page is for your Social network Acting. You can contact another
        poeaple by this service. I glad to give you This Chance. Have a Good
        Time!
      </p> */}
    <ul>
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
