import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://hungernomiawebsitebackend.vercel.app/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json()
    console.log(json);
    if(!json.success){
        alert("Enter Valid Credentials");
    }else {
      
      navigate("/login");
    }
    
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div className="container d-flex maincontainer formimage">
      <img src="https://img.freepik.com/free-vector/color-doodle-food-burger-pattern_1409-3918.jpg?w=826&t=st=1696061596~exp=1696062196~hmac=1122255b806c5f6a9f5e61a7c2208453ff049d825248983133a8b7d6ad5b4da7"></img>
      <div className="container mainbg w-60">
        <form
          className="w-70 mx-auto formbg roundedform"
          onSubmit={handleSubmit}
        >
          <div className='formhead text-center'>
            <h2 className='w-auto mx-auto text-dark'>Sign up</h2>

          </div>
          <div className="m-3">
            <label htmlFor="name" className="form-label text-success font-weight-bold">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            //   aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label text-success font-weight-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            //   aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label text-success font-weight-bold">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                
              />
            </fieldset>
          </div>
          
          <div className="m-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-success font-weight-bold"
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
          <Link to="/login" type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>
            Submit
          </Link>
          <Link to="/login" className="m-3 mx-1 btn btn-danger font-weight-bold">
            Already a user
          </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
