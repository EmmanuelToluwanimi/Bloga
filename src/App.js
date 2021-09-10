import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Blogposts from './components/Blogposts';



function App() {
  return (
    <>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/dashboard/:nav" component={Nav} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
