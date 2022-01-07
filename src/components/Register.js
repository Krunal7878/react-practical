import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register(props) {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let isUser = JSON.parse(localStorage.getItem("isLogged"))
        if (isUser && isUser.isLogin === true) {
            props.history.push("/")
        }
    }, [])


    function formCanbeSubmit() {
        return email.length > 0 && password.length > 0 && userName.length > 0
    }

    function handleSubmit(event) {
        event.preventDefault();
        let userData = JSON.parse(localStorage.getItem("userData"));
        let obj = {
            userName: userName,
            email: email,
            password: password
        }
        let data = []
        let isExist = false
        if (userData && userData.length > 0) {
            let checkIsExist = userData.find(item => item.email === email)
            if (checkIsExist) {
                isExist = true
                alert("Email already exist. Try diffrent email")
            } else {
                data = userData
                data.push(obj)
            }
        } else { data.push(obj) }
        if(!isExist){
            //need to set data in redux reducer
            localStorage.setItem("userData",JSON.stringify(data))
            props.history.push('/login')
        }
    }
    return (
        <div className='register'>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>UserName:</Form.Label>
                    <Form.Control
                        autofocus
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>UserEmail:</Form.Label>
                    <Form.Control
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
                <Button block size="lg" type="submit" disabled={!formCanbeSubmit()}>Register</Button>
                <br />
                <Link to="/login">Login</Link>
            </Form>
        </div>
    )
}
