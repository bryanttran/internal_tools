import React, { Component } from "react";
import axios from "axios";
import { Button } from 'semantic-ui-react';
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
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 5000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // Kills process after finished
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // Method to fetch to our backend API to fetch from MongoDB
  getDataFromDb = () => {
    fetch("http://localhost:4000/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
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
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0 ? "No Documents available" : data.map(dat => (
            <li style={{ padding: "10px" }} key={dat._id}>
              <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
              <span style={{ color: "gray" }}> message: </span> {dat.message}<br />
              <span style={{ color: "gray" }}> username: </span> {dat.username} <br />
              <span style={{ color: "gray" }}> password: </span> {dat.password} <br />
            </li>
          ))}
        </ul>
        <div style={{ padding: "10px" }}>
        <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="Message to add"
            style={{ width: "200px" }}
          />
        <input
            type="text"
            onChange={e => this.setState({ username: e.target.value })}
            placeholder="Username to add"
            style={{ width: "200px" }}
          />
        <input
          type="text"
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Password to add"
          style={{ width: "200px" }}
        />
          <Button secondary onClick={() => this.putDataToDB(this.state.message, this.state.username, this.state.password)}>
            Add
          </Button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="ID of item to delete"
          />
          <Button secondary onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            Delete
          </Button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="ID of item to update"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value }) }
            placeholder="Message of item to add"
          />
          <Button secondary
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            Update
          </Button>
        </div>
        <Routes />
      </div>

    );
  }
}

export default App;