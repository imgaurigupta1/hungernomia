import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://hungernomiawebsitebackend.vercel.app/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    const json = await response.json()
    console.log(json);
    if(!json.success){
        alert("Enter Valid Credentials");
    }
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
  }
    
    
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    
    <div className='container d-flex maincontainer formimage'>
      <img src='https://www.freepik.com/free-vector/restaurant-mural-wallpaper_10498711.htm#query=fast%20food%20background&position=9&from_view=search&track=ais'></img>

      <div className="container mainbg w-60">
        

        <form
          className="w-70 mx-auto formbg roundedform"
          onSubmit={handleSubmit}
        >
          <div className='formhead text-center'>
            <h2 className='w-auto mx-auto text-dark'>Sign in</h2>

          </div>
          
          <div className="m-3">
            <label htmlFor="email" className="form-label text-success">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          
          <div className="m-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-success"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className='buttoncss d-flex justify-content-center align-items-center'>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">
            I'm a new user
          </Link>
          </div>
        </form>

        </div>
      
    </div>
  )
}
