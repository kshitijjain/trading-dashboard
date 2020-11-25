import React from 'react';
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
