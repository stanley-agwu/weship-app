import React, { useState, useEffect } from 'react';
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

import { ILoginFormData } from '../types.ts';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { login, reset } from '../features/auth/authSlice';

import './styles.scss';
import { getAuthState } from '../features/auth/getters';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isSuccess, isLoading, isError, errorMessage } = useAppSelector(getAuthState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: ILoginFormData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) toast.error(errorMessage);
    else if (isSuccess || user) navigate('/');
    dispatch(reset());
  }, [user, isSuccess, isError, errorMessage, navigate, dispatch]);

  const { email, password, showPassword } = formData;

  const handleClickShowPassword = () => {
    setFormData((prevState: ILoginFormData) => ({
      ...prevState,
      showPassword: !formData.showPassword,
    }));
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };
    await dispatch(login(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="form-group">
      <h2>Log In</h2>
      <form className="form-data" onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" className="submit">
            Login
          </Button>
        </FormControl>
        <div className="signin-section">
          <span>No account?</span>
          <Link to="/register">Register now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
