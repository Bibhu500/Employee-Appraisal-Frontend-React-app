import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    ratings: []
  });


  const { name, username, email, phone, website, ratings } = user;

  const onRatingChange = (e,i) => {
    const updatedRating = ratings.map((v,index)=>{
        if(index === i) {
          let currentRating = ratings[index];
          currentRating.rating = e.target.value;
          return currentRating;
        } else {
          return ratings[index];
        }
      
    })
    setUser({ ...user, ratings: updatedRating});
  }

  const onMonthChange = (e,i) => {
    const updatedRating = ratings.map((v,index)=>{
        if(index === i) {
          let currentRating = ratings[index];
          currentRating.month = e.target.value;
          return currentRating;
        } else {
          return ratings[index];
        }
      
    })
    setUser({ ...user, ratings: updatedRating});
  }


  const onInputChange = e => {
    console.log(e)
    setUser({ ...user, [e.target.name]: e.target.value });
    
  };

  useEffect(() => {
    loadUser();
  }, []);

  const addRating = async e => {
    e.preventDefault();
    const newRating = {month:"", rating:""};
    ratings.push(newRating);
    user.ratings = ratings;
    await axios.put(`http://localhost:3003/users/${id}`, user);
    history.push("/users/edit/"+id);
    alert("'Placeholder for new rating created! Please enter rating");
  };

  const onSubmit = async e => {
    e.preventDefault();
    let sum = 0;
    ratings.forEach(value => {
      console.log(value.rating);
      sum += parseInt(value.rating);
    });
    console.log(sum);
    user.username = Math.round(sum/ratings.length);
    await axios.put(`http://localhost:3003/users/${id}`, user);
    history.push("/");
    alert("record was saved");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };

  const arr = ["selectMon","January","February","March","April","May","June","July","Aug","September","October","November","December"]
  const rate = ["selectRating",1,2,3,4,5];
 

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
        <h1 className="text-center mb-4">Edit the ratings</h1>
                    


        <form onSubmit={e => onSubmit(e)} autoComplete="off">
          {/* ye latest hai */}
          {/* <div className="form-group">
          <h5>User id</h5>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <h5>Avg rating</h5>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Avg rating"
              name="username"
              value={username}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <h5>Email</h5>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <h5>Phone no</h5>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <h5>Website</h5>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Website Name"
              name="website"
              value={website}
              onChange={e => onInputChange(e)}
            />
          </div> */}

          {/* ye pahle se invisile code hai */}
          {/* <div><h2 className="text-center mb-4"> Monthwise rating</h2></div>

          <div className="form-group">
          <h4 className="text-center mb-4"> January</h4>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Username"
              name="username"
              value={username}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          <table className="table">
            <thead>
              <tr>
                <th >Month</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {
                ratings.map((value, index)=>(
                  <tr key={index}>

                  <select className="selectMonth" onChange={e=>onMonthChange(e,index)} value={value.month} >
                    {arr.map(val=><option >{val}</option>)}
                  </select>

                        {/* <td>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="month"
                        value={value.month}
                        onChange={e=>onMonthChange(e,index)} />
                    </td> */}
                    <td>
                    <select className="selectRate" onChange={e=>onRatingChange(e,index)} value={value.rating} >
                    {rate.map(val=><option >{val}</option>)}
                  </select>
                      {/* <input
                        type="text"
                        className="form-control form-control-lg"
                        name="rating"
                        value={value.rating}
                        onChange={e => onRatingChange(e,index)}/> */}
                    </td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
          <button className="btn btn-success btn-block" onClick={addRating}>+ Add Rating</button>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
