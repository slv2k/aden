import './App.css';
import ListingsContainer from './components/ListingsContainer';
import { useState, useEffect } from "react";

function App() {
  const [listings, setListings] = useState([]);
  const [identity, setIdentity] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => { console.log("useeffect detector:", identity)}, [identity])
  useEffect(() => { console.log("useeffect detector:", service)}, [service])
  useEffect(() => { console.log("useeffect detector:", location)}, [location])

  useEffect(() => {
    fetch("/listings")
    .then((listingsArray) => {
      setListings(listingsArray)
    });
  }, []);

  const changeStyle = (e) => {
    e.target.style.color = "white";
    e.target.style.fontSize = "50px";
  }

  function handleIdentity(e) {
    changeStyle(e);
    setIdentity(e.currentTarget.value);
  }

  function handleService(e) {
    changeStyle(e);
    setService(e.currentTarget.value);
  }

  function handleLocation(e) {
    changeStyle(e);
    setLocation(e.currentTarget.value);
  }

  

  function handleSearch(e) {
    e.preventDefault();
    console.log('clicked');
  }

  

  return (
    <div id="appcontainer">
      <div id="header">
        <h1>ADEN</h1>
      </div>
      <div id="filter">
        <form>
          <label for="identityselect">I am </label>
          <select name="identityselect" className="filterdropdown" id="identitydropdown" onChange={handleIdentity}>
            <option value="" disabled selected>select an option</option>
            <option value="transmasculine">transmasculine</option>
            <option value="transfeminine">transfeminine</option>
          </select>
          <div className="arrow"></div>
          <br />
          <label for="serviceselect">seeking </label>
          <select name="serviceselect" className="filterdropdown" id="servicedropdown" onChange={handleService}>
            <option value="" disabled selected>select an option</option>
            <option value="hormones">hormones</option>
            <option value="therapy">therapy</option>
            <option value="community">community</option>
          </select>
          <div className="arrow"></div>
          <br />
          <label for="locationselect">near </label>
          <select name="locationselect" className="filterdropdown" id="locationdropdown" onChange={handleLocation}>
            <option value="" disabled selected>select an option</option>
            <option value="traverse city">traverse city</option>
            <option value="lansing">lansing</option>
            <option value="kalamazoo">kalamazoo</option>
            <option value="flint">flint</option>
            <option value="detroit">detroit</option>
          </select>
          <div className="arrow"></div>
          <button type="submit" id="searchbutton" onClick={handleSearch}>search</button>
        </form>
      </div>
      <ListingsContainer />
    </div>
  );
}

export default App;
