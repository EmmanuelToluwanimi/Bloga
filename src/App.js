import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Article from "./pages/Article";
import { AuthProvider } from "./models/Contexts/Authcontext";
import { BlogProvider } from "./models/Contexts/Blogcontext";
import { GetPostProvider } from "./models/Contexts/Getpostcontext";

// import Blogposts from './components/Blogposts';


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <BlogProvider>
            <GetPostProvider>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/article" component={Article} />
                {/* <Route path="/dashboard/:nav" component={Nav} /> */}
              </Switch>
            </GetPostProvider>
          </BlogProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
