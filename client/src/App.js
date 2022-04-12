import './App.css';
import ListingsContainer from './components/ListingsContainer';
import { useState, useEffect } from "react";

function App() {
  const [showListings, toggleShowListings] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [identity, setIdentity] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  // useEffect(() => { console.log("useeffect detector:", identity)}, [identity])
  // useEffect(() => { console.log("useeffect detector:", service)}, [service])
  // useEffect(() => { console.log("useeffect detector:", location)}, [location])

  useEffect(() => {
    fetch("/listings")
    .then((r) => r.json())
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

  // filter logic
  let identityCode;
  let serviceCode;
  let locationCode;
  let shownListings;

  

  function filter() {
    setFilteredListings(listings)

    let findBoth = function(element) {
      return element.identity_id === 3;
    };

    let sortIdentity = function(element) {
      return element.identity_id === identityCode;
    };

    let sortService = function(element) {
      return element.service_id === serviceCode;
    };

    let sortLocation = function(element) {
      return element.location_id === locationCode;
    };

    let currentState = listings.filter(findBoth);
    // console.log(currentState)
    let foundByIdentity = listings.filter(sortIdentity);

    currentState = [...currentState, foundByIdentity];
    // console.log(currentState)
    currentState = currentState.filter(sortService);
    console.log("sort service", currentState)
    currentState = currentState.filter(sortLocation);

    // console.log(currentState);
    return currentState;
  }

  useEffect(() => {
    switch(identity) {
      case "transfeminine":
        identityCode = 1;
        break;
      case "transmasculine":
        identityCode = 2;
        break;
    }

    switch(service) {
      case "hormones":
        console.log("detected as hormones")
        serviceCode = 1;
        break;
      case "therapy":
        serviceCode = 2;
        break;
      case "community":
        serviceCode = 3;
        break;
    }

    switch(location) {
      case "traverse city":
        locationCode = 1;
        break;
      case "lansing":
        locationCode = 2;
        break;
      case "kalamazoo":
        locationCode = 3;
        break;
      case "flint":
        locationCode = 4;
        break;
      case "detroit":
        locationCode = 5;
        break;
    }

    console.log(identityCode, serviceCode, locationCode)

    if (identity !== "" && service !== "" && location !== "") {
      setFilteredListings(filter());
      // console.log(filteredListings)
      // console.log(listings)
      // filteredListings = filter();
      if (showListings === false) {
        toggleShowListings(true);
      }
    } else {
      shownListings = null;
    }
  }, [identity, service, location])

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
        </form>
      </div>
      {showListings ? <ListingsContainer listings={filteredListings} /> : null}
      {/* <ListingsContainer listings={listings} /> */}
    </div>
  );
}

export default App;