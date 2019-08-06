import React from "react";
import "./App.css";
import Calendar from "./Components/Calendar/Calendar";
import BmrForm from "./Components/BmrForm";
import DisplayBmr from "./Components/DisplayBmr";
// import DisplayCal from "./Components/DisplayCal";
import axios from 'axios'
import {
  requestData, receiveDataSuccess, receiveDataFailed
} from './actions'
// import DailyCalForm from "./Components/DailyCalForm";


class App extends React.Component {

  state = {
    dailyCal: true
  }

  componentDidMount() {
    let store = this.props.store
    store.dispatch(requestData())
    axios.get('/api/currentbmr')
      .then(response => {
        const currentBmr = response.data[0].bmrResult
        store.dispatch(receiveDataSuccess(currentBmr))
      })
      .catch(err => {
        console.error(new Error(err))
        store.dispatch(receiveDataFailed())
      })

    axios.get('/api/dailyCal')
      .then(response => {
        const dailyCal = response.data[0].dailyCal
        console.log(dailyCal)
        this.setState({
          dailyCal: dailyCal
        })
      })
      .catch(err => {
        console.error(new Error(err))
      })
  }


  render() {
    return (
      <div className="App">
        <header>
          <BmrForm store={this.props.store} />
          <DisplayBmr store={this.props.store} />
          {/* <DailyCalForm />
          <DisplayCal store={this.state.dailyCal} /> */}
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;
