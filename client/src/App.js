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

  const [profileEditingState, toggleProfileEditingState] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [showLoginForm, toggleShowLoginForm] = useState(false);
  const [showProfilePage, toggleShowProfilePage] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("hello");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

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

  useEffect(() => {
    fetch("/users")
    .then((r) => r.json())
    .then((usersData) => {
      setUsersArray(usersData)
    });
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    toggleShowProfilePage(false);
    let findUser = function(element) {
      return element.username === username && element.password === password;
    }

    let detectUser = usersArray.filter(findUser);
    console.log(detectUser);

    if (detectUser.length === 1) {
      setLoginState(true);
      setCurrentUser(detectUser[0]);
      toggleShowLoginForm(false);
      // console.log("should be true", loginState);
    } else {
      console.log("incorrect info")
    }

    // console.log(email, bio);
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
    setEmail(currentUser.email);
    setBio(currentUser.bio);
    setAvatar(currentUser.avatar);
  }, [loginState])

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

    // console.log(identityCode, serviceCode, locationCode)

    if (identity !== "" && service !== "" && location !== "") {
      setFilteredListings(filter());
      if (showListings === false) {
        toggleShowListings(true);
      }
    } else {
      shownListings = null;
    }
  }, [identity, service, location])

  function handleLoginForm() {
    // toggleShowLoginForm(showLoginForm => !showLoginForm)
    if (showLoginForm === false) {
      toggleShowLoginForm(true);
    } else {
      toggleShowLoginForm(false);
    }
  }

  function handleLogout() {
    toggleShowProfilePage(false);
    toggleShowLoginForm(false);
    setLoginState(false);
    setUsername("");
    setPassword("");
  }

  function handleShowProfilePage() {
    toggleShowProfilePage(true);
    toggleShowLoginForm(false);
    toggleShowListings(false);
    // console.log("clicked profile page button"s)
    
    console.log(currentUser);
  }

  function handleHideProfilePage() {
    toggleShowProfilePage(false);
    console.log("closed")
  }

  function handleEditProfilePage() {
    toggleProfileEditingState(true);
  }

  function handleUpdateProfile() {
    toggleProfileEditingState(false);

    // TODO: fix profile bio update logic

    // let updateObj = {
    //   bio: bio,
    // };
    // fetch(`/users/${currentUser.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify(updateObj),
    // })
    // .then((r) => r.json())
    // .then((messages) => {console.log(messages)})
    // .then()
  }

  return (
    <div id="appcontainer">
      <div id="header">
        <h1>ADEN</h1>
        <div id='logintab'>
          <div className='headerline' id='rightline'></div>
          {loginState ? <p onClick={handleLoginForm}>my account</p> : <p onClick={handleLoginForm}>log in</p>}
          {/* {showLoginForm ? <p>true</p> : <p>false</p>} */}
          {showLoginForm ? 
          <div id='loginform'>
            {loginState === true ? 
            <div id="loginwelcome">
              <h3>welcome, {username}!</h3>
              <p onClick={handleShowProfilePage}>my profile</p>
              <p onClick={handleLogout}>log out</p>
            </div>
            :
            <form onSubmit={handleLogin}>
              <p>enter your username:</p>
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <p>enter your password:</p>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">log in</button>
              <p>or, <strong>create an account</strong></p>
          </form>
            }
          </div> : null}
        
        </div>
      </div>
      {showProfilePage ? 
        <div id='profilepage'>
          <h2>{username}'s profile</h2>
          <h3>{email}</h3>
          {/* <p>{bio}</p> */}
          {profileEditingState ? 
          <form onSubmit={handleUpdateProfile}>
            {/* <input type="text" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} /> */}
            <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows="5"></textarea>
            <button type="submit">update</button>
          </form>
          : <p>{bio}</p>
          }
          {/* <button onClick={handleEditProfilePage} className='profilepagebutton'>edit</button> */}
          {profileEditingState ? null : <button onClick={handleEditProfilePage} className="profileditbutton">edit</button>}
          {/* <button onClick={handleHideProfilePage} className="profileeditbutton">close profile page</button> */}
          {profileEditingState ? null : <button onClick={handleHideProfilePage} className="profileeditbutton">close profile page</button>}
        </div>
      :
      null
      }
      <div id="filter">
      {showProfilePage ? null :
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
}
      </div>
      {showProfilePage ? null :
      <div id='underneathfilter'>
        <h1>post a listing</h1><a>|</a><h1>how to use</h1>
      </div>
}
      {showListings ? <ListingsContainer listings={filteredListings} identity={identity} service={service} location={location} /> : null}
      {/* <ListingsContainer listings={listings} /> */}
    </div>
    
  );
}

export default App;