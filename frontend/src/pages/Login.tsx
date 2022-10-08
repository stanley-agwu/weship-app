import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './styles.scss';
import { LoginFormData } from '../types.ts';

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: LoginFormData) => ({
      ...prevState, [e.target.name]: e.target.value,
    }))
  }

  const { email, password, showPassword } = formData;

  const handleClickShowPassword = () => {
    setFormData((prevState: LoginFormData) => ({
      ...prevState, showPassword: !formData.showPassword,
    }))
  }

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <div className="form-group">
      <h2>Log In</h2>
      <form className="form-data">
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <InputLabel htmlFor="email">email</InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            label="email"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            name="password"
            onChange={handleChange}
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
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <Button variant="contained" className="submit">Login</Button>
        </FormControl>
        <div className="signin-section">
          <span>No account?</span>
          <Link to="/register">Register now</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;