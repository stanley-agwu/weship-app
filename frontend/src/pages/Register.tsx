import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { RegisterFormData } from '../types.ts';

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    comfirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: RegisterFormData) => ({
      ...prevState, [e.target.name]: e.target.value,
    }))
  }

  const handleClickShowPassword = () => {
    setFormData((prevState: RegisterFormData) => ({
      ...prevState, showPassword: !formData.showPassword,
    }))
  }

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <form>
      <FormControl sx={{ m: 1, width: '4rem' }} variant="outlined">
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          id="username"
          type="text"
          value={formData.username}
          name="username"
          onChange={handleChange}
          label="username"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '4rem' }} variant="outlined">
        <InputLabel htmlFor="email">email</InputLabel>
        <OutlinedInput
          id="email"
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          label="email"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '4rem' }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={formData.showPassword ? 'text' : 'password'}
          value={formData.password}
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
                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '4rem' }} variant="outlined">
        <InputLabel htmlFor="confirmPassword"> Confirm Password</InputLabel>
        <OutlinedInput
          id="confirmPassword"
          type={formData.showConfirmPassword ? 'text' : 'password'}
          value={formData.password}
          name="confirmPassword"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="confirmPassword"
        />
      </FormControl>
    </form>
  )
}

export default Register