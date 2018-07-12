import React, { Component } from 'react';
import logo from './logo.svg';

import axios from 'axios'
import './App.css';

import AddPerson from './components/addPerson/addPerson'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      people: [],
      editIndex: null,
      newName: ''
    }

    this.submitData = this.submitData.bind(this)
    this.deleteUser = this.deleteUser.bind(this)

    this.nameIndex = this.nameIndex.bind(this)
    this.editName = this.editName.bind(this)
    this.saveNewName = this.saveNewName.bind(this)
  }


  componentDidMount(){
    axios.get('http://localhost:3000/api/getPeople').then(response => {
      console.log(response, 'response')
      this.setState({people: response.data})
    })
  }


  submitData(user, pass) {
    axios.put(`http://localhost:3000/api/addPerson/${user}/${pass}`).then(response => {
      this.setState({people: response.data})
    })
  }

  deleteUser(name, pass){
    axios.delete(`http://localhost:3000/api/deletePerson/${name}/${pass}`).then(response => {
      this.setState({people: response.data})
    })
  }

  nameIndex(index, oldName){
    this.setState({editIndex: index, newName: oldName})
  }
  editName(newName){
    this.setState({newName: newName.target.value})
  }
  saveNewName(newName, id){
    axios.post('http://localhost:3000/api/editName', {newName, id}).then(response => {
      this.setState({people: response.data, editIndex: null})
    })
  }

  render() {

    let people = this.state.people.map((person, index) => {
      return <div>
        {index === this.state.editIndex &&
          <div>
            <input value={this.state.newName} onChange={e => this.editName(e)}/>
            <button onClick={() => this.saveNewName(this.state.newName, person.id)}>Save</button>
            <h3 onClick={() => this.nameIndex(null)}>Cancle</h3>
          </div>
        }
        {index !== this.state.editIndex &&
          <div>
            <h1>{person.name}</h1>
            <h3 onClick={() => this.nameIndex(index, person.name)}>Edit</h3>
          </div>
        }
        
        <h3 onClick={() => this.deleteUser(person.name, person.password)}>X</h3>
      </div>
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {people}
        </div>
        <AddPerson submitData={this.submitData}/>
      </div>
    );
  }
}

export default App;
