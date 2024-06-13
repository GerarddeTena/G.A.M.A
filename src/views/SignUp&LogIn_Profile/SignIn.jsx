import {useContext, useEffect, useState} from "react";
import {Context} from "../../store/AppContext.jsx";
import '../../styles/views_Styles/SignIn.scss';

const SignIn = () => {

    const {actions} = useContext(Context);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);


    const checkUser = async (e) => {

        e.preventDefault();
        const userData = {
            email,
            password
        };

        try {
            const response = await actions.loginUserDispatcher(userData);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                setError(null);
            } else {
                setError('Login failed: Invalid email or password');
            }

        } catch (error) {
            setError('An error occurred while logging in');
            console.error('Error logging in user:', error);

        }

    };

    return (
        <>
            <section className="Form_SignIn">
                <h2 className="Form_Title">Sign In</h2>
                <form className='Body_Form_SI'>
                    <div className="Label_Div">
                        <label>E-MAIL: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="Label_Div">
                        <label>PASSWORD: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='Submit_SI' type="submit" onClick={checkUser}>Sign In</button>
                </form>
                {error && <p>{error}</p>}
            </section>
        </>
    )
}

export default SignIn;