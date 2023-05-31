import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Modal from "./components/Modal";
import BooksList from "./pages/BooksList";
import ReadingList from "./pages/ReadingList";
import CompletedList from "./pages/CompletedList";
import SignOut from "./components/SignOut";
import Details from "./pages/Details";


function App() {
  const [userIsLogedIn, setuserIsLogedIn] = useState(false);
  const [bookslist, setbookslist] = useState([]);
  const [readinglist, setreadinglist] = useState([]);
  const [completedlist, setcompletedlist] = useState([]);
  const [details, setdetails] = useState("");
  let stopInterval;

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      newLogin();
    }
    fetch("./Data/Books.json")
    .then(res => res.json())
    .then(data => setbookslist(data.books))   
    .catch(err=>console.log(err))
  },[]);
  

  const newLogin = () => {
    setuserIsLogedIn(JSON.parse(localStorage.getItem("auth")));
    fetch("./Data/Books.json")
    .then(res => res.json())
    .then(data => setbookslist(data.books))   
    .catch(err=>console.log(err))
    stopInterval = setTimeout(()=>{
      exit();
    },120000)
  };
  const exit = () => {
    setuserIsLogedIn(false);
    setbookslist([]);
    setreadinglist([]);
    setcompletedlist([]);
    setdetails("");
    localStorage.clear();
    clearInterval(stopInterval);
  };

  return (
    <BrowserRouter>
      <div className="App">
        
        {userIsLogedIn ? 
          
          <div>
            <Redirect to={"/"}/>
            <div>           
              <Link to={"/"} className="nav-space">
                Books List
              </Link>
              <Link to={"/ReadingList"} className="nav-space">
                Reading List
              </Link>
              <Link to={"/CompletedList"} className="nav-space">
                CompletedList
              </Link>
              <SignOut exit={exit} setuserIsLogedIn={setuserIsLogedIn} setbookslist={setbookslist} setreadinglist={setreadinglist} setcompletedlist={setcompletedlist} setdetails={setdetails}/>
          </div>
        <Switch>
          <Route exact path="/" render={() => <BooksList bookslist={bookslist} setbookslist={setbookslist} readinglist={readinglist} setreadinglist={setreadinglist} completedlist={completedlist} setcompletedlist={setcompletedlist}/>} />
          <Route exact path="/ReadingList" render={() => <ReadingList bookslist={bookslist} setbookslist={setbookslist} readinglist={readinglist} setreadinglist={setreadinglist} completedlist={completedlist} setcompletedlist={setcompletedlist} setdetails={setdetails} /> } />
          <Route exact path="/CompletedList" render={() => <CompletedList bookslist={bookslist} setbookslist={setbookslist} readinglist={readinglist} setreadinglist={setreadinglist} completedlist={completedlist} setcompletedlist={setcompletedlist} setdetails={setdetails}/>} />
          <Route exact path="/Details" render={() => <Details bookslist={bookslist} setbookslist={setbookslist} details={details} />} />
          <Route ecomponent={PageNotFound} />
        </Switch>
        
            
          </div>
        : 
          <div>
            <Modal newLogin={newLogin} />
          </div>
        }

      </div>
    </BrowserRouter>
  );
}

export default App;
