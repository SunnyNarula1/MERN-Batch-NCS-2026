import { useState } from 'react'

export default function Register() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const apiURL = import.meta.env.VITE_USER_API_URL
  function registerUser() {
    fetch(`${apiURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        email: email,
        password: password
      })
    }).then(res => res.json())
    .then(data => console.log(data))
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center">Register User</h1>
          <div className="mt-2">
            <input type="text" className="form-control" onChange={(e) => setFname(e.target.value)} placeholder='First Name' />
          </div>
          <div className="mt-2">
            <input type="text" className="form-control" onChange={(e) => setLname(e.target.value)} placeholder='Last Name' />
          </div>
          <div className="mt-2">
            <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          </div>
          <div className="mt-2">
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>
          <div className="mt-2">
            <button className="btn btn-success" onClick={registerUser} type='button'>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}
