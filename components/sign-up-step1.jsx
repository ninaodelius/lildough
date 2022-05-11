import Button from '../components/button.jsx'
import Link from 'next/dist/client/link'
import styles from '/styles/components/signupone.module.css'
import SignUpTwo from '../components/sign-up-step2'
import {React, useState} from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function SignUpOne() {
    const [nextStep, setNextStep] = useState(false)
   const toggleView = () =>{
      setNextStep(nextStep => !nextStep)
    }
    

    const schema = yup.object().shape({
      firstName: yup.string().required('First name is required').min(2, "Minimun 2 letters"),
      lastName: yup.string().required('First name is required').min(2, "Minimun 2 letters"),
      email: yup.string().email().required('email name is required'),
      password: yup.string().required('First name is required').min(4).max(15, "Maximum 15 letters")

    })

    const { register, handleSubmit, formState} = useForm({
      resolver: yupResolver(schema),
    });

    const {errors} = formState;

    // const createUser = async(event) => {
    //   event.preventDefault()
    //   let formData = {
    //     name: event.target[0].value,
    //     lastname: event.target[1].value,
    //     email: event.target[2].value,
    //     password: event.target[3].value,
    //   }
    //   const isValid = await schema.isValid(formData)
    // }

    const submitForm = (data) =>{
      console.log(errors)
    }


    const form = (
    <div className={styles.loginform}>
        <h1 className='title'>Skapa konto!</h1>
        <div className={styles.form}>

         <form onSubmit={handleSubmit(submitForm)}>
         <div className={styles.inputcontainer}>
            <label>
              <input type="text" id={styles.input} name="firstName" placeholder="Namn" {...register('firstName')} />
            </label> 
          </div>

            <p className='error-message'>{errors.firstName?.message}</p>
        <div className={styles.inputcontainer}>
            <label>
              <input type="text" id={styles.input} name="lastName" placeholder="Efternamn" {...register('lastName')}/>
            </label> 
          </div>
          <p className='error-message'>{errors.lastName?.message}</p>
        <div className={styles.inputcontainer}>
            <label>
              <input type="text" id={styles.input} name="email" placeholder="E-mail" {...register('email')} />
            </label> 
          </div>
          <p className='error-message'>{errors.email?.message}</p>
          <div className={styles.inputcontainer}>
           <label>
             <input type="text" id={styles.input} name="password" placeholder="Lösenord" {...register('password')} />
           </label>
          </div>
          <p className='error-message'>{errors.password?.message}</p>
        <div className={styles.checkboxcontainer}>
          <input type="checkbox" id="terms" name="terms"></input>
          <label htmlFor="terms">Härmed godkänner jag WEMEs <Link href= '/auth/terms' passHref><a className={styles.link}>villkor.</a></Link></label>
        </div>
          <div className={styles.buttoncontainer}>
          <Button><div onClick={submitForm} type="submit">Skapa konto</div></Button>
          </div>
         </form>
      </div>
    </div>
    )

    return(
        <div>
             {nextStep ? <SignUpTwo /> : form}
        </div>
    )
}