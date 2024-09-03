import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async() => {
        try {
          await signInWithEmailAndPassword(getAuth(), email, password); //Checks the entered email and password are correct
          navigate('/');
        }
        catch (e) {
          setError(e.message);
        }
    }

    return(
        <>
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <input 
            placeholder="Add your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        <br/>
        <input 
            placeholder="Add your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" />
        <br/>
        <button onClick={logIn}>LOGIN</button>
        <br/>
        <Link to="/signup">Don't have an account? Create account</Link>
        </>
    );
}

export default LoginPage;