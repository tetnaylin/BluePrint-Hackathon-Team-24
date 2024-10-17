import React from "react";
import '../App.css';
import SocietySignUp from "../components/society-sign-up/SocietySignUp";

function SignUp() {
    document.body.className="background";
    return (
      <div className="background">
        <SocietySignUp/>
      </div>
    );
  }
  
  export default SocietySignUp;