import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/actions/index'

export default function Login(props) {
    const auth = useSelector((state) => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let isUser = JSON.parse(localStorage.getItem("isLogged"))
        if (isUser && isUser.isLogin === true) {
            props.history.push("/")
        }
    }, [])

    function validForm() {
        return email.length > 0 && password.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
        let data_obj = {
            isLogin: true
        }
        //from reducer data needs to check
        let userData = JSON.parse(localStorage.getItem("userData"))
        if (userData && userData.length > 0) {
            let matchRecord = userData.find(item => item.email === email && item.password === password)
            if (matchRecord) {
                data_obj.email = email
                data_obj.password = password
                localStorage.setItem("isLogged", JSON.stringify(data_obj))
                props.history.push("/")
            } else { alert("User not found") }
        } else { alert("User not found") }


    }
    return (
        <div className='Login'>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>UserEmail:</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validForm()}>Login</Button>
                <br />
                <Link to="/register">Register</Link>
            </Form>
        </div>
    )
}
