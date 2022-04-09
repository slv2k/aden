import './App.css';
import ListingsContainer from './components/ListingsContainer';

function App() {
  return (
    <div id="appcontainer">
      <div id="header">
        <h1>ADEN</h1>
      </div>
      <div id="filter">
        <form>
          <label for="identityselect">I am </label>
          <select name="identityselect" className="filterdropdown" id="identitydropdown">
            {/* TODO: change the option text color and size to white and big when an option is selected */}
            <option value="" disabled selected>select an option...</option>
            <option value="transmasculine">transmasculine</option>
            <option value="transfeminine">transfeminine</option>
          </select>
          <div className="arrow"></div>
          <br />
          <label for="serviceselect">seeking </label>
          <select name="serviceselect" className="filterdropdown" id="servicedropdown">
            <option value="" disabled selected>select an option...</option>
            <option value="hormones">hormones</option>
            <option value="therapy">therapy</option>
            <option value="community">community</option>
          </select>
          <div className="arrow"></div>
          <br />
          <label for="locationselect">near </label>
          <select name="locationselect" className="filterdropdown" id="locationdropdown">
            <option value="" disabled selected>select an option...</option>
            <option value="traverse city">traverse city</option>
            <option value="lansing">lansing</option>
            <option value="kalamazoo">kalamazoo</option>
            <option value="flint">flint</option>
            <option value="detroit">detroit</option>
          </select>
          <div className="arrow"></div>
        </form>
      </div>
      <ListingsContainer />
    </div>
  );
}

export default App;
