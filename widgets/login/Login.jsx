"use client";
import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleSubmitSignin = async () => {
    try {
      const result = await fetch('/api/login', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          email : email,
          password : password
        })
      });
      if(result.ok) {
        const res = await result.json();
        if(res.status) {
          Cookies.set('islogedin', true, {expires : 1});
          Cookies.set('sessionid', res.sessionkey, {expires : 1});
          Cookies.set('name', res.name, {expires : 1});
          router.replace("/dashboard")
        }
        else alert('Login Failed')
      }
    } catch (error) {
      console.log(error);
      alert("Error occured");
    }
    
  };

  const handleSubmitSignup = async () => {
    try {
      const result = await fetch('/api/signup', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          name : name,
          email : email,
          password : password
        })
      });
      if(result.ok) {
        const res = await result.json();
        if(res.status) {
          alert("Sucess, Please Login")
          document.location.reload();
        }
        else alert('Login Failed')
      }
    } catch (error) {
      console.log(error);
      alert("Error occured");
    }
  }

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form action={handleSubmitSignup}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button>Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form action={handleSubmitSignin}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>

      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
