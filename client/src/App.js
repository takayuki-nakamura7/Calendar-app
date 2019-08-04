import React from "react";
import "./App.css";
import Calendar from "./Components/Calendar/Calendar";
import BmrForm from "./Components/BmrForm";
import DisplayBmr from "./Components/DisplayBmr";
import axios from 'axios'
import {
  requestData, receiveDataSuccess, receiveDataFailed
} from './actions'


class App extends React.Component {

  componentDidMount() {
    let store = this.props.store
    store.dispatch(requestData())
    axios.get('/api/bmrs')
      .then(response => {
        const currentBmr = response.data[0]
        store.dispatch(receiveDataSuccess(currentBmr))
      })
      .catch(err => {
        console.error(new Error(err))
        store.dispatch(receiveDataFailed())
      })
  }


  render() {
    return (
      <div className="App">
        <header>
          <BmrForm store={this.props.store} />
          <DisplayBmr store={this.props.store} />
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;
