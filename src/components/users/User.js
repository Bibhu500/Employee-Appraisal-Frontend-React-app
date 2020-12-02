import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    month:"",
    ratings:[]
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data);
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">avarage rating: {user.username}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">phone: {user.phone}</li>
        <li className="list-group-item">website: {user.website}</li>
       <div>
         <h5>.</h5>
         <h5>Monthwise ratings</h5>
         <table className="table">
            <thead>
              <tr>
                <th >Month</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
            {
              user.ratings.map((value, index)=>(
                <tr key={index}>
                  <td>
                  {value.month}
                  </td>
                  <td>
                    {value.rating}
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
       </div>
      </ul>
    </div>
  );
};

export default User;
