import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate();

    const createAccount = async () => {
        try{
            if (password !== confirmPassword){
                setError("Password and Confirm password do not match");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/');
        }
        catch(e){
            setError(e.message);
    }
}

    return(
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input 
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        <br/>
        <input 
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" />
        <br/>
        <input 
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password" />
        <br/>
        <button onClick={createAccount}>Create Accont</button>
        <br/>
        <Link to="/login">Already have an account? Log In here</Link>
        </>
    );
}

export default SignUpPage;