// import axios from "axios";
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// const Postreq = () => {
//   const [enteredFirstName, setEnteredFirstName] = useState("");
//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [enteredPhone, setEnteredPhone] = useState("");
//   function firstNameChangeHandler(e) {
//     setEnteredFirstName(e.target.value);
//   }
//   function emailChangeHandler(e) {
//     setEnteredEmail(e.target.value);
//   }
//   function phoneChangeHandler(e) {
//     setEnteredPhone(e.target.value);
//   }
//   const submitHandler = (e) => {
//     e.preventDefault();

//     async function storeData() {
//       const formData = {
//         name: enteredFirstName,
//         email: enteredEmail,
//         phone: enteredPhone,
//       };
//       try {
//         let headers = {
//           "Content-Type": "application/json; charset=utf-8",
//         };
//         const res = await axios.post(
//           "http://127.0.0.1:8000/spacificmanpower/userreg/",
//           formData,
//           { headers: headers }
//         );
//         console.log(res.data);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     storeData();
//     setEnteredFirstName("");
//     setEnteredEmail("");
//     setEnteredPhone("");
//   };
//   return (
//     <Form onSubmit={submitHandler}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           value={enteredEmail}
//           onChange={emailChangeHandler}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Name"
//           value={enteredFirstName}
//           onChange={firstNameChangeHandler}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Phone number</Form.Label>
//         <Form.Control
//           type="phone"
//           placeholder="Phone no"
//           value={enteredPhone}
//           onChange={phoneChangeHandler}
//           maxLength={10}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default Postreq;




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
var ID

function Postreq(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
const [isEdit,setEdit]=useState(false)
const [showForm,setShowForm]=useState(true)
  const getFiles = () => {
    axios
      .get('http://127.0.0.1:8000/spacificmanpower/userreg/')
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

  // function handlePhoneChange(event) {
  //   setPhone(event.target.value);
  // }

  function handleSubmit(event) {
    event.preventDefault();
    if (props.isLoginForm) {
      // handle login form submit
      console.log("Logging in...");
      async function storeData() {
        const formData = {
          user_name: name,
         // email: email,
         
          password:password,
        };
        try {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
          };
          const res = await axios.post(
            "http://127.0.0.1:8000/spacificmanpower/userreg/",
            formData,
            { headers: headers }
          );
          console.log(res.data);
          if (res.data.message) {
            console.log("Invalid username or password");
            // do something to log the user in, e.g. redirect to a dashboard page
          
          } else {
            console.log("User authenticated");
          }
        } catch (e) {
          console.log(e);
        }
      }
      storeData()
    } else {
      // handle signup form submit
      console.log("Signing up...");
          async function storeData() {
      const formData = {
        user_name: name,
        email: email,
       
        password:password,
      };
      try {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
        };
        const res = await axios.post(
          "http://127.0.0.1:8000/spacificmanpower/userreg/",
          formData,
          { headers: headers }
        );
        console.log(res.data);
        if (res.data.message) {
          console.log("Invalid username or password");
          // do something to log the user in, e.g. redirect to a dashboard page
        
        } else {
          console.log("User authenticated");
        }
      } catch (e) {
        console.log(e);
      }
    }
    storeData();
    setName("");
    setEmail("");
    //setPhone("");
    }
  }

  function editItem(id) {
    setEdit(true);
    setShowForm(false)
 
    ID = id;

    const filteredDummuyData = data.find((data) => data.id === id);

    setName(filteredDummuyData.user_name);
    setEmail(filteredDummuyData.email);

    setPassword(filteredDummuyData.password);
   
   
    
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      {!props.isLoginForm && (
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
      )}
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
     

      {/* {!props.isLoginForm && (
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={handlePhoneChange}
          />
        </Form.Group>
      )} */}

      <Button variant="primary" type="submit">
        {props.isLoginForm ? "Login" : "Signup"}
      </Button>

      <div>
        {props.isLoginForm ? (
          <div>
            Don't have an account?{" "}
            <Link onClick={props.toggleForm} to="/signup">
              Signup
            </Link>
          </div>
        ) : (
          <div>
            Already have an account?{" "}
            <Link onClick={props.toggleForm} to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </Form>
   
    </>
  );
}

export default Postreq;
