import React from "react";

import Calendar from "./Components/Calendar/Calendar";
import BmrForm from "./Components/BmrForm";
// import CurrentBmr from "./Components/CurrentBmr";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <BmrForm store={this.props.store} />
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;
