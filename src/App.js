import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  let history = useHistory()
  return (
    <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
    </Router>
  );
}

function PrivateRoute({component: Component, ...rest}) {
  let isUser = JSON.parse(localStorage.getItem("isLogged"))
  return(
    <Route
      {...rest}
      render={(props)=> isUser && isUser.isLogin === true ? <Component {...props}/> : <Redirect to="/login"/>}
    />
  )
  
}

export default App;
