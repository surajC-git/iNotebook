import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let history = useHistory(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        
       const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Account Created Successfully", "success")

        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container my-3">
      <h2 className='mb-4'>Signup to start your journey with iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name" onChange={onChange} name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1" onChange={onChange} name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password" onChange={onChange} name="password" minLength={5} required
            placeholder="Password"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword" onChange={onChange} name="cpassword" minLength={5} required
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
