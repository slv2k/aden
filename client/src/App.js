import './App.css';
import ListingsContainer from './components/ListingsContainer';
import Listings from './components/Listings';
import { useState, useEffect } from "react";

/*

TO DO:

maybe:
- fix comment post/delete
- fix user bio patch

definitely:
- add map
- add bookmark feature
    - add column to users: "bookmarked"
    - when user clicks button, collect id of selected listing and add to bookmarked array
    - add populate usual listings area with bookmarks when profile page is shown

GET DONE TODAY:
- add post listing feature
- add column to listing: "submittedby" to be shown on appropriate listings
- create user function ; ehh....
- comment css

*/

function App() {
  const [showListings, toggleShowListings] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [identity, setIdentity] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const [creatingListing, toggleCreateListingState] = useState(false);
  const [creatingUser, toggleCreatingUser] = useState(false);
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

  const [tutorialState, setTutorialState] = useState(false);
  const [aboutState, setAboutState] = useState(false);
  // const [bookmarksArray, setBookmarksArray] = useState([]);

  const [enteredIdentity, setEnteredIdentity] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredWebsite, setEnteredWebsite] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");


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
    let message = document.getElementById("loginerrormessage");
    if (detectUser.length === 1) {
      setLoginState(true);
      setCurrentUser(detectUser[0]);
      toggleShowLoginForm(false);
      toggleCreatingUser(false);
      message.style.display = "none";
      // console.log("should be true", loginState);
    } else {
      message.style.display = "block";
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
      case "grand rapids":
        locationCode = 6;
        break;
    }

    // console.log(identityCode, serviceCode, locationCode)

    if (identity !== "" && service !== "" && location !== "") {
      setFilteredListings(filter());
      if (showListings === false) {
        toggleShowListings(true);
        // document.getElementById("lc").scrollIntoView();
      }
    } else {
      shownListings = null;
    }
  }, [identity, service, location, listings])

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
    toggleCreateListingState(false);
    // console.log("clicked profile page button"s)
    
    console.log(currentUser);
  }

  function handleHideProfilePage() {
    toggleShowProfilePage(false);
    
    if (identity !== "" && service !== "" && location !== "") {
      toggleShowListings(true)
    }
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

  function startCreatingUser() {
    console.log("create user button clicked")
    toggleShowLoginForm(false);
    toggleCreatingUser(true);
    let theFilter = document.getElementById("filterform");
    theFilter.style.display = "none";
  }

  function handleCreateUser(e) {
    e.preventDefault();

    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        bio: "",
        avatar: ""
      })
    })
    .then((r) => r.json())
    .then((newUser) => console.log(newUser))

    setLoginState(true);
    toggleShowLoginForm(false);
    toggleCreatingUser(false);
  }

  function startCreatingListing() {
    console.log("create listing button clicked");
    let theFilter = document.getElementById("filterform");
    theFilter.style.display = "none";
    toggleCreateListingState(true);
  }

  function handlePostListing(e) {
    e.preventDefault();
    let identityId;
    let selectedIdentity = document.querySelector('input[name="identity"]:checked').value;

    let locationId;
    let selectedLocation = document.getElementById("enteredlocationselect").value;

    switch(selectedIdentity) {
      case "transfeminine":
        identityId = 1;
        break;
      case "transmasculine":
        identityId = 2;
        break;
      case "both":
        identityId = 3;
        break;
    }

    switch(selectedLocation) {
      case "traverse city":
        locationId = 1;
        break;
      case "lansing":
        locationId = 2;
        break;
      case "kalamazoo":
        locationId = 3;
        break;
      case "flint":
        locationId = 4;
        break;
      case "detroit":
        locationId = 5;
        break;
      case "grand rapids":
        locationId = 6;
        break;
    }

    let newListing = {
      identity_id: identityId,
      service_id: 3,
      location_id: locationId,
      name: enteredName,
      address: enteredAddress,
      description: enteredDescription + ` - submitted by ${username}`,
      website: enteredWebsite,
      phone: enteredPhone,
      lat: "",
      long: "",
      comments: [],
      username: username,
      loginstate: loginState,
      onAddBookmark: addBookmark,
      onDeleteBookmark: removeBookmark
    }

    // setListings([...listings, newListing]);
    let newArray = [...listings, newListing];
    setListings(newArray);
    console.log(listings);

    console.log(newListing);

    // fetch("/listings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     id: listings.length + 1,
    //     identity_id: identityId,
    //     service_id: 3,
    //     location_id: locationId,
    //     name: enteredName,
    //     address: enteredAddress,
    //     description: enteredDescription + ` - submitted by ${username}`,
    //     website: enteredWebsite,
    //     phone: enteredPhone,
    //     lat: "",
    //     long: ""
    //   })
    // })
    // .then((r) => r.json())
    // .then(setListings([...listings, newListing]))
    // .then(console.log(listings))

    toggleCreateListingState(false);
    let theFilter = document.getElementById("filterform");
    theFilter.style.display = "block";

    let confirmationmessage = document.getElementById("confirmationmessage");
    confirmationmessage.style.display = "block";

    let fade_out = function() {
      confirmationmessage.style.display = "none";
    }

    setTimeout(fade_out, 7000)



    // toggleShowProfilePage(false);
  }

  function handleReset() {
    toggleShowProfilePage(false);
    toggleShowLoginForm(false);
    toggleShowListings(false);
    toggleCreateListingState(false);
    setAboutState(false);
    setTutorialState(false);

    let theFilter = document.getElementById("filterform");
    theFilter.style.display = "block";
  }

  const [bookmarksArray, setBookmarksArray] = useState([]);

  function addBookmark(newBookmark) {
    setBookmarksArray([...bookmarksArray, newBookmark])
    // console.log(bookmarksArray);
  }

  function removeBookmark(bookmarkToRemove) {
    const filteredBookmarks = bookmarksArray.filter(listing => listing.id !== bookmarkToRemove.id)
    setBookmarksArray(filteredBookmarks)
    // console.log(bookmarksArray);
  }

  useEffect(() => { console.log("detected bookmarks change", bookmarksArray)}, [bookmarksArray])

  let bookmarkCards = bookmarksArray.map((listing) => {
    return (
        <Listings 
        key={listing.id}
        listingid={listing.id}
        name={listing.name}
        address={listing.address}
        description={listing.description}
        website={listing.website}
        phone={listing.phone}
        comments={listing.comments}
        username={username}
        loginstate={loginState}
        onAddBookmark={addBookmark}
        onDeleteBookmark={removeBookmark}
        detectBookmark={true}
        />
    )
  })

  useEffect(() => { console.log("listings detector:", listings)}, [listings])

  function handleTutorial() {
    setTutorialState(tutorialState => !tutorialState);
  }

  function handleAbout() {
    // setAboutState(aboutState => !aboutState)
    let theFilter = document.getElementById("filterform");
    // theFilter.style.display = "block";
    // if (aboutState === true) {
    //   theFilter.style.display = "none";
    // } else if (aboutState === false) {
    //   theFilter.style.display = "block";
    // }

    if (aboutState === false) {
      setAboutState(true);
      theFilter.style.display = "none";
    } else {
      setAboutState(false);
      theFilter.style.display = "block";
    }
  }

  return (
    <div id="appcontainer">
      <div id="header">
        <h1 onClick={handleReset}>ADEN</h1>
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
              <p id='loginerrormessage' style={{display: "none"}}>error: incorrect info!</p>
              <button type="submit">log in</button>
              <p>or, <strong onClick={startCreatingUser}>create an account</strong></p>
          </form>
            }
          </div> : null}
        
        </div>
        <div id='abouttab'>
          <p onClick={handleAbout}>about</p>
          <div className="headerline" id="leftline"></div>
        </div>
      </div>

      {tutorialState ? <div id='tutorial'>
        <p id='first'>enter your identity</p>
        <p id='second'>specify what you're looking for</p>
        <p id='third'>select a city to search in</p>
        <p id='fourth'>post information here</p>
        <p id='fifth'>log in to comment and save listings</p>
      </div> : null}

      {aboutState ? <div id='about'>
        <h3>hey!</h3>
        <p>this is aden! it's a tool to help transgender people find and access healthcare, as well as personal connections. in my personal experience, it's very difficult to find one consolidated place to find this kind of information, and in the current political climate it's becoming even more difficult. it's my goal to help transgender people find the exact type of care or community they're looking for.</p>
        <p>- sam</p>
      </div> : null}


      {creatingUser ? 
      <div id='createnewuserform'>
        <form onSubmit={handleCreateUser}>
          <h3>welcome!</h3>
          <p>enter your email:</p>
          <input name="newuseremail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>create a username:</p>
          <input name="newusername" value={username} onChange={(e) => setUsername(e.target.value)} />
          <p>create a password:</p>
          <input name="newpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">sign up</button>
        </form>
      </div> 
       : null}      

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
      <p id='confirmationmessage' style={{display: "none"}}>thank you for your submission!</p>
      <div id="filter">
      {showProfilePage ? null :
        <form id='filterform'>
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
            <option value="grand rapids">grand rapids</option>
          </select>
          <div className="arrow"></div>
        </form>
      }
      </div>
      {showProfilePage ? null :
      <div id='underneathfilter'>
        <h1 onClick={startCreatingListing}>post a listing</h1><h1 id='sepline'>|</h1><h1 onClick={handleTutorial}>how to use</h1>
        {/* <h1 onClick={startCreatingListing}>post a listing</h1> */}
      </div>
      }
      {creatingListing && loginState ?
      <form id='createlistingform' onSubmit={handlePostListing}>
        {/* <p onClick={toggleCreateListingState(false)}>close</p> */}
        <h3>own a trans-friendly business or host a related meetup/group?</h3>
        <h3>enter the details here!</h3>
        <div id='firsttwoboxes'>
          <p>name:</p>
          <input type="text" name="name" value={enteredName} onChange={(e) => setEnteredName(e.target.value)} />
          <p>address:</p>
          <input type="text" name="address" value={enteredAddress} onChange={(e) => setEnteredAddress(e.target.value)} />
          <p>nearest city:</p>
          <select name="enteredlocationselect" id="enteredlocationselect">
            <option value="" disabled selected>select...</option>
            <option value="traverse city">traverse city</option>
            <option value="lansing">lansing</option>
            <option value="kalamazoo">kalamazoo</option>
            <option value="flint">flint</option>
            <option value="detroit">detroit</option>
            <option value="grand rapids">grand rapids</option>
          </select>
        </div>
        <div id='targetradiobuttons'>
        <p>target audience:</p>
          <div id='listingformradiobuttons'>
            <input type="radio" name="identity" value="transmasculine" />
            <label for="transmascs">transmasculine people</label>
            <br />
            <input type="radio" name="identity" value="transfeminine" />
            <label for="transfems">transfeminine people</label>
            <br />
            <input type="radio" name="identity" value="both" />
            <label for="both">both/nonbinary people</label>
          </div>
        </div>
        <div id='thirdboxset'>
        <p>description:</p>
          <textarea name="description" value={enteredDescription} onChange={(e) => setEnteredDescription(e.target.value)} rows="5"></textarea>
          <p id='desccharactercount'>{enteredDescription.length}/500 characters {enteredDescription.length > 500 ? <p id='charwarning'>too long!</p> : null}</p>
          <p>website:</p>
          <input type="text" name="website" value={enteredWebsite} placeholder="if not applicable, leave blank" onChange={(e) => setEnteredWebsite(e.target.value)} />
          <p>phone number:</p>
          <input type="text" name="phone" value={enteredPhone} onChange={(e) => setEnteredPhone(e.target.value)} />
          <button type="submit">submit</button>
        </div>
      </form>
      : null}
      {creatingListing === true && loginState === false ? <p id='errormessage'>you must be logged in to do this!</p> : null}
      {/* {creatingListing ? <p onClick={handleCloseListingCreate}>close</p> : null} */}
      <div id='lc'></div>
      {showListings ? <ListingsContainer listings={filteredListings} identity={identity} service={service} location={location} username={username} loginstate={loginState} onAddBookmark={addBookmark} onDeleteBookmark={removeBookmark} /> : null}
      {/* <ListingsContainer listings={listings} /> */}

      {loginState === true && showProfilePage === true ? 
      <div id='bookmarkscontainer'>
        <h3>bookmarks:</h3>
        {bookmarkCards}
      </div> 
      : null}
    </div>
    
  );
}

export default App;