import {useState} from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {signInWithGooglePopup, createUserDocumentAuth, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields,
        setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });

    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response);
            resetFormFields();
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                alert('invalid credentials')
            } else {
                console.log(err);
            }
        }
    }

    // Google Sign-In with Popup
    const handleGoogleSignIn = async() => {
        try {
            const {user} = await signInWithGooglePopup();
            console.log('Popup Sign-In Success:', user);
            await createUserDocumentAuth(user);
            setUser(user);
        } catch (error) {
            console.error('Error signing in with Google (Popup):', error.message);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}/>

                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}/>
                <div className="buttons-container">
                    <Button type="submit" buttonType=''>Sign In</Button>
                    <Button type='button' onClick={handleGoogleSignIn} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;