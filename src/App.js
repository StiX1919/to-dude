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
      newName: '',
      dailyPokemon: null
    }

    this.submitData = this.submitData.bind(this)
    this.deleteUser = this.deleteUser.bind(this)

    this.nameIndex = this.nameIndex.bind(this)
    this.editName = this.editName.bind(this)
    this.saveNewName = this.saveNewName.bind(this)
  }


  componentWillMount(){
    axios.get('http://localhost:3000/api/getPeople').then(response => {
      console.log(response, 'response')
      this.setState({people: response.data})
    })
    axios.get('http://localhost:3000/api/getPokemon').then(response => {
      console.log(response.data)
      this.setState({dailyPokemon: response.data})
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
      return <div className='editFriend'>
        {index === this.state.editIndex &&
          <div className='indFriend'>
            <input value={this.state.newName} onChange={e => this.editName(e)}/>
            <button onClick={() => this.saveNewName(this.state.newName, person.id)}>Save</button>
            <h4 onClick={() => this.deleteUser(person.name, person.password)}>X</h4>
            <h3 onClick={() => this.nameIndex(null)}>Cancle</h3>
          </div>
        }
        {index !== this.state.editIndex &&
          <div className='indFriend'>
            <h2>{person.name}</h2>
            <h3 onClick={() => this.nameIndex(index, person.name)}>Edit</h3>
          </div>
        }
        
        
      </div>
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.dailyPokemon !== null ? this.state.dailyPokemon.sprites.front_default : logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Friend List thing</h1>
        </header>
        <div className='content'>
          <div className='friendBox'>
            <h1>My friends...</h1>
            {people}
          </div>
          <div className='newFriend'>
            <AddPerson submitData={this.submitData}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
