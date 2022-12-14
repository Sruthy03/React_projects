
import Movies from './components/movies';
import{Route,Redirect,Switch} from 'react-router-dom'
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import React from 'react';
import MovieForm from './components/MovieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

import './App.css';
function App() {
  return (
    <React.Fragment>
      <NavBar/>
<main className='container'>
     {/* <Movies/> */}
     <Switch>
     <Route path="/login" component={LoginForm}/>
     <Route path="/register" component={RegisterForm}/>
      <Route path="/movies/:id" component={MovieForm}/>
     <Route path="/movies" component={Movies}/>     
     <Route path="/customers" component={Customers}/>     
     <Route path="/rentals" component={Rentals}/>     
     <Route path="/not-found" component={NotFound}/>     
     <Redirect from='/' exact to="/movies"/>
     <Redirect to="/not-found"></Redirect>
     </Switch>
     
    </main>
    </React.Fragment>
    
  );
}

export default App;
