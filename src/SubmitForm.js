import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import "./SubmitForm.css"

const SubmitForm = () => {
    const schema = yup.object().shape({
        name : yup.string().required("Name is required"),
        email : yup.string().email("Enter a valid email").required("Email is required"),
        age : yup.number().typeError("Age must be a number").positive("Age must be positive").min(18,"min age is 18").max(100,"max age is 100"),
        password : yup.string().min(4,"password is too short").max(15,"password is too long").matches(/[a-z]+/,"have one small letter").matches(/[A-Z]+/,"have one capital lettetr").matches(/\d*/,"use number").required("password is required"),
        confirmPassword : yup.string().oneOf([yup.ref("password")],"passwords sould be match").required("password is required")
      })
      const {register , handleSubmit,formState: { errors }} = useForm({resolver: yupResolver(schema)});
      
      const onFormSubmit = (data) =>{
        console.log(data);
        const name = data.name;
        
      }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <input className="input-field" type="text" placeholder="Enter Your Name!" {...register("name")} />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <input className="input-field" type="email" placeholder="Enter Your Email!" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input className="input-field" type="number" placeholder="Enter Your Age!" {...register("age")} />
            {errors.age && <p className="error">{errors.age.message}</p>}
            <input className="input-field" type="password" placeholder="Enter Your Password!" {...register("password")} />
            {errors.password && <p className="error">{errors.password.message}</p>}
            <input className="input-field" type="password" placeholder="Confirm Your Password!" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
            <button className="submit-btn">Submit</button>
            </form>
        </div>
    );
}
export default SubmitForm;