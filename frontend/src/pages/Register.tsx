import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RegisterFormData } from '../types.ts';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { register, reset } from '../features/auth/authSlice';

import './styles.scss';
import { getAuthState } from '../features/auth/getters';
import Spinner from '../components/Spinner';

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    comfirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isSuccess, isLoading, isError, errorMessage } = useAppSelector(getAuthState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: RegisterFormData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) toast.error(errorMessage);
    else if (isSuccess || user) navigate('/');
    dispatch(reset());
  }, [user, isSuccess, isError, errorMessage, navigate, dispatch]);

  const { username, email, password, comfirmPassword, showPassword, showConfirmPassword } =
    formData;

  const handleClickShowPassword = () => {
    setFormData((prevState: RegisterFormData) => ({
      ...prevState,
      showPassword: !showPassword,
    }));
  };

  const handleClickShowConfirmPassword = () => {
    setFormData((prevState: RegisterFormData) => ({
      ...prevState,
      showConfirmPassword: !showConfirmPassword,
    }));
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== comfirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = { username, email, password };
      await dispatch(register(userData));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="form-group">
      <h2>Register</h2>
      <form className="form-data" onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            label="username"
          />
        </FormControl>
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
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="comfirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={comfirmPassword}
            name="comfirmPassword"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="confirmPassword"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '22rem' }} variant="outlined">
          <Button type="submit" variant="contained" className="submit">
            Sign up
          </Button>
        </FormControl>
        <div className="signup-section">
          <span>Already have an account?</span>
          <Link to="/login">Please log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
