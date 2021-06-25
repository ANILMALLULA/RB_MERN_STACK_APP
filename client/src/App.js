import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Admin from "./components/admin/Admin";
import Blogs from "./components/blogs/Blogs";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <div className='app-card'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute exact path='/admin' component={Admin} />
            <ProtectedRoute exact path='/blogs' component={Blogs} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
