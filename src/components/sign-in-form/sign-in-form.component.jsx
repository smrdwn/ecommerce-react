import {useState} from "react";
import { useDispatch } from "react-redux";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
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
            dispatch(emailSignInStart(email, password));
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
        dispatch(googleSignInStart());
    };

    return (
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                    type='button' 
                    onClick={handleGoogleSignIn} 
                    buttonType={BUTTON_TYPE_CLASSES.google}>
                        Sign In With Google
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;