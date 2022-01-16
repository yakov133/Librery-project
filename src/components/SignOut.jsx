const SignOut = ({ setuserIsLogedIn,setbookslist,setreadinglist,setcompletedlist,setdetails }) => {
  const exit = () => {
    setuserIsLogedIn(false);
    setbookslist([]);
    setreadinglist([]);
    setcompletedlist([]);
    setdetails("");
    localStorage.clear();
  };

  return (
    <div>
      <button onClick={exit}>Sign Out</button>
    </div>
  );
};
export default SignOut;
