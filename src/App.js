import React from 'react';
import axios from 'axios';
import Positions from './components/Positions';
import './App.css';

let positions= require('./data.json').positions;

class App extends React.Component{
  constructor(props){
    super(props);

    this.state= {
      positions: []
    };
  }

  componentDidMount= () => {
    this.fetchJsonData();
  }

  refreshJsonData= async () => {
    this.fetchJsonData();
  }

  fetchJsonData= async () => {
    // let {status, data}= await axios.get('http://192.168.0.26:3001/db');
    // if(status=== 200){
    //   this.setState({positions: data.positions});
    // }

    this.setState({positions});
  }

  render= () => {
    let {positions}= this.state;

    return (
      <div className='container'>
        <Positions positions= {positions} refreshJsonData={this.refreshJsonData} />
      </div>
    );
  }
}

export default App;
