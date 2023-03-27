import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
var ID;

const EditDel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const getFiles = () => {
    axios
      .get("http://127.0.0.1:8000/spacificmanpower/userreg/")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFiles();
    //  console.log(files);
  }, []);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function editItem(id) {
    console.log("id is", id);
    setEdit(true);
    setShowForm(false);

    ID = id;

    const filteredDummuyData = data.find((data) => data.id === id);
    console.log("edited item", filteredDummuyData);

    setName(filteredDummuyData.user_name);
    setEmail(filteredDummuyData.email);

    setPassword(filteredDummuyData.password);
  }

  function updateHandler() {
    const FormData = {
      user_name: name,
      email: email,
      password: password,
      active: 0,
    };

    async function updateData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const dataForm = FormData;
        const resLogin = await axios.put(
          `http://127.0.0.1:8000/spacificmanpower/userreg/${ID}/`,
          dataForm,
          {
            headers: headers,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    updateData();
    alert("Successfully updated", "", [
      {
        text: "OK",
        onPress: () => {},
      },
    ]);

    setName("");
    setEmail("");
    setPassword("");
  }

  function deleteItem(id) {
    console.log("id is", id);
    alert("Confirm Deletion", "Are you sure you want to delete ?", [
      {
        text: "Cancel",

        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteData(),
      },
    ]);
    async function deleteData() {
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };

        const resLogin = await axios.delete(
          `http://127.0.0.1:8000/spacificmanpower/userreg/${id}/`,

          {
            headers: headers,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
     deleteData();
  }

  return (
    <>
      {isEdit && (
        <>
          {" "}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <button className="btn btn-primary" onClick={updateHandler}>
            Update
          </button>
        </>
      )}

      <div className="col-md-7">
        <h2 className="alert alert-success">List of Uploaded Files</h2>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th scope="col">File Title</th>
              <th scope="col">Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((file) => {
              return (
                <tr>
                  {/* <td>{file.resume_file?.split("/").pop()}</td> */}
                  <td>{file.user_name}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => editItem(file.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(file.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditDel;
