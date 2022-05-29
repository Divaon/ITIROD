
import { useContext, useEffect, useState } from 'react';
import '../App.css';
import { userDataContext } from '../context/usercontext';
import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../utils/firebase';

function LoginHeader() {
    const { userData, setUserData } = useContext(userDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState(null);


    const handleLogin = async () => {
        const res = await logInWithEmailAndPassword(email, password, setUserData, userData);
        if (res)
            setUserName(email)
    }

    const handleRegister = () => {
        registerWithEmailAndPassword(email, password)
    }

    return (
        <>
            <div>
                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>



            <div className="admbutons">
                <button type="button" id="login" onClick={handleLogin}>Login</button>
                <button type="button" id="register" onClick={handleRegister}>Register</button>
                <p className="name" id="nameuser">{userName || 'Current user'}</p>
            </div>
        </>
    );
}

export default LoginHeader;
