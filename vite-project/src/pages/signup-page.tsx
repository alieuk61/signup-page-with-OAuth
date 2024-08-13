import { FC, useState } from "react";
import "../styles/pages/register.css";
import { useForm, SubmitHandler } from "react-hook-form";
import SubmitButton from "../components/submitButton";

interface RegisterFormType {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  firstname: string,
  surname: string
}
const SignUpPage: FC = () => {
  const [password, setPassword] = useState(undefined);
  // using this to match with confirmed password
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const submittedData: SubmitHandler<RegisterFormType> = (data) => console.log(data);

  return (
    <div className='register-page'>
      <form action='' className='register-form' onSubmit={handleSubmit(submittedData)}>
        <main>
          <h1>registration</h1>
        <div className='inputs'>
          <label htmlFor="username"><h5>Choose a username</h5></label>
          <input type='text' id="username"
          {...register("username", { required: "username is required" })}/>
          {errors?.username && <p>{errors.username.message}</p>}

          <label htmlFor="email"><h5>Email</h5></label>
          <input type='text' id="email"
          {...register("email", { required: "Email Address is required", pattern: /^[A-Za-z0-9_]+@[a-z]+\.+[a-z]{2}$/ })}/>
          {errors?.email && <p>{errors.email.message}</p>}

          <label htmlFor="password"><h5>Password</h5></label>
          <input type='password' id="password"
          {...register("password", { required: "Password is required" })} />
          {errors?.password && <p>{errors.password.message}</p>}

          <label htmlFor="confirm-password"><h5>Confirm Password</h5></label>
          <input type='password' id="comfirm-password"
          {...register("confirmPassword", { required: "You must confirm your password" })}
          />

          <label htmlFor="firstname"><h5>Enter firstname</h5></label>
          <input type='text' id="firstname"
          {...register("firstname", { required: "firstname is required" })} />
          {errors?.firstname && <p>{errors.firstname.message}</p>}
          
          <label htmlFor="surname"><h5>Enter surname</h5></label>
          <input type='text' id="surname"
          {...register("surname", { required: "surname is required" })} />
          {errors?.surname && <p>{errors.surname.message}</p>}
        </div>
        
        <SubmitButton />
        </main>
      </form>
    </div>
  );
};

export default SignUpPage;
