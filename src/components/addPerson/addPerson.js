import React, { Component } from 'react';

import axios from 'axios'

class AddPerson extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '',
            secret: ''
        }

        this.handleName = this.handleName.bind(this)
        this.handleSecret = this.handleSecret.bind(this)

        
    }


    handleName(input){
        this.setState({name: input.target.value})
    }
    handleSecret(input){
        this.setState({secret: input.target.value})
    }

    


    render() {
        console.log(this.state.name, this.state.secret)

    return (
      <div>
        <h1>Input Name</h1>
        <input onChange={e => this.handleName(e)}/>
        <h1>Input Secret</h1>
        <input onChange={e => this.handleSecret(e)}/>
        <button onClick={() => this.props.submitData(this.state.name, this.state.secret)}>Submit</button>
      </div>
    );
  }
}

export default AddPerson;
