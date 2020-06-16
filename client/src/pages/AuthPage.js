import React, {useContext, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading, request, errors, clearErrors} = useHttp()
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        clearErrors()
        message(errors)
    }, [errors, message])

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s12 ">
                <h4 className="header center teal-text">Join us now</h4>
                <div className="card ">
                    <div className="card-content text-darken-4">
                        <span className="card-title">Login/Register</span>
                        <form onChange={changeHandler}>
                            <div className="input-field">
                                <i className="material-icons prefix teal-text">email</i>
                                <input
                                    name="email"
                                    placeholder="email"
                                    id="email"
                                    type="text"
                                    value={form.email}
                                    className="teal-text"
                                />
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix teal-text">code</i>
                                <input
                                    placeholder="password"
                                    name="password"
                                    id="password"
                                    value={form.password}
                                    type="password"
                                    className="teal-text"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn teal"
                            disabled={loading}
                            onClick={loginHandler}

                        >
                            Login
                            <i className="material-icons left">login</i>
                        </button>
                        <button
                            className="btn orange"
                            onClick={registerHandler}
                            disabled={loading}

                        >
                            Register
                            <i className="material-icons left">how_to_reg</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
