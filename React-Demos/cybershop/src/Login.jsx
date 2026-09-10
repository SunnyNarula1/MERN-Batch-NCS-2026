import { useState } from 'react'
import { useDispatch } from "react-redux";
import { appActions } from "./redux/appSlice";
export default function Login({ loginStatus }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const apiURL = import.meta.env.VITE_USER_API_URL
  const dispatch = useDispatch()
  function loginUser() {
    fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.status == 401) {
          alert(data.message)
        } else {
          localStorage.setItem('token', data.token)
          dispatch(appActions.login(data.username))
        }
      })
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center">Login User</h1>
          <div className="mt-2">
            <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          </div>
          <div className="mt-2">
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>
          <div className="mt-2">
            <button className="btn btn-success" onClick={loginUser} type='button'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
