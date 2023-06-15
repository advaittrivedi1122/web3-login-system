import { React, useEffect, useState } from "react";
import "../Styles/Register.css";
import "../Styles/General.css";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Register() {
    const api = process.env.REACT_APP_API_URL

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (e) => {
    console.log(`Username : ${username}`)
    console.log(`Email : ${email}`)
    console.log(`Password : ${password}`)
    const url = `${api}/register`
    const data = await fetch(url,{
        method: "POST",
        mode: "cors",
        // headers: {
        //   'Accept': 'application/json',
        //   // "Access-Control-Allow-Origin": "*",
        //   'Content-Type': 'application/json',
        // },
        body: JSON.stringify({
          username,
          password,
          email
        })
      })
      const parsedData = await data.json();
      console.log("🚀 ~ file: Register.jsx:49 ~ handleRegister ~ parsedData:", parsedData)
      
  }

  useEffect(() => {
    // console.log(username, email, password);
  }, [username, email, password]);

  return (
    <div className="parent-container">
      <div className="glass-card">
        <div className="username glass-card">
          <h1>SIGN UP</h1>
          <div className="login-box">
            <div className="username">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ m: 1, width: "25ch" }}
                required
                id="outlined-required"
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="email">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ m: 1, width: "25ch" }}
                required
                id="outlined-required"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="password">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <br />
            <Link to="/login">
            <Button variant="contained" onClick={handleRegister}>Register</Button>
            </Link>
            <Link to="/login">
              <p>Already have an account? Sign in here</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
