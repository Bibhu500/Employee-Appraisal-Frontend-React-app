import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",  
    // phone: "",
    // website: ""
    month:"",
    rating:""
  });

  const { name, username, email, phone, website , month ,rating} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", user);
    history.push("/");
    alert("record was saved");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Enter users Info</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Username or ID"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
         
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter  Website Name"
              name="website"
              value={website}
              onChange={e => onInputChange(e)}
            />
          </div>
          {/* <div><h2 className="text-center mb-4"> Set this months rating </h2></div>
          <div><h2 className="text-center mb-4"> Rate on the scale of 5 </h2></div>

          <div className="form-group">
          
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Month"
              name="month"
              value={month}
              onChange={e => onInputChange(e)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Rating for this month Ex. 4/5"
              name="rating"
              value={rating}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          
          <button className="btn btn-primary btn-block">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
