import React, { Component } from "react";
import axios from "axios";
import Routes from "./Routes";

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    username: null,
    password: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // Fetches all data when component mounts
  /*componentDidMount() {
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 50000);
      this.setState({ intervalIsSet: interval });
    }
  }*/
  
  // Kills process after finished
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // Method to fetch to our backend API to fetch from MongoDB
  getDataFromDb = () => {
    fetch("http://localhost:4000/api/employees")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

    // Method to fetch to our backend API to fetch from MongoDB
    getClientsFromDb = () => {
      fetch("http://localhost:4000/api/getClients")
        .then(data => data.json())
        .then(res => this.setState({ formInfo: res.data }));
      };

  //Method to post to our backend API to post to MongoDB
  putDataToDB = (message, username, password) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:4000/api/putData", {
      id: idToBeAdded,
      message: message,
      username: username,
      password: password
    });
  };

  //Method to call our backend API to delete to the MongoDB document
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idTodelete,10)) {
        objIdToDelete = dat.id;
      }
    });
    axios.delete("http://localhost:4000/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  //Method to call our backend API to update to the MongoDB document
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idToUpdate,10)) {
        objIdToUpdate = dat.id;
      }
    });

    axios.post("http://localhost:4000/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply } 
    });
  };

  render() {
    return(
      <div className='parent-container'>
        <Routes />
      </div>
    )}
}

export default App;