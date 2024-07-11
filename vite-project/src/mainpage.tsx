import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { myContext } from "./context/context";
import { User } from "./types/types";
import { contextValues } from "./types/types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useForm, SubmitHandler } from 'react-hook-form';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleIcon from "./assets/google-icon";
import OutlookIcon from "./assets/outlook-icon";
import "./styles/pages/index.css";
import AppleIcon from "./assets/apple-icon";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const context = useContext(myContext);
  const { submitLogin } = context;
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    const userLogin: User = data;
    const success = await submitLogin(userLogin);
    setLoginSuccess(success);
  };

  return (
    <main className='main-page'>
      <form className='sign-up-form' onSubmit={handleSubmit(onSubmit)}>
        <section className="shoe-icon">
            {/* img */}
        </section>
        <section className="login-section">
          <div>
            <h2 className="title">Login</h2>
            <p style={{marginBottom: '40px'}}>Enter your log in details.</p>
          </div>

          <div className="inputs">
          <input 
          className="email-input"
          type='text' placeholder='Email Address'
          id="email"
          {...register('email', { required: 'Email Address is required' })}
          />
          <div className="password-input">
          <input 
          type='password' 
          placeholder='Password'
          id="password"
          {...register('password', { required: 'Password is required' })}
          />
          <FontAwesomeIcon className="hide-icon" icon={faEyeSlash} />
          {/* if we click this "button" ^^ we will then convert the input type from password to text*/}
          </div>
          </div>

          <div className="forgotten-password-section">
            <span className="remember-login_section">
              <input type='checkbox' name='' id='' />
              <h5>Keep me logged in</h5>
            </span>
            <strong style={{cursor: 'pointer'}}>Forgot password?</strong>
          </div>

          <button type="submit">Log in</button>

          <div style={{marginTop: '25px'}}>
            Dont have an account? <strong style={{cursor: 'pointer'}}>Sign up</strong>
          </div>

          <h5 className="email-login-section">or continue with</h5>
          <div className="email-login-btns">
            <GoogleIcon />
            <AppleIcon/>
            <OutlookIcon />
          </div>
        </section>
      </form>
    </main>
  );
};

export default LoginPage;
