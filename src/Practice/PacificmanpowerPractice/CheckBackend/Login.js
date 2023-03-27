// import React, { useState } from 'react';
// import axios from 'axios';

// import { Signup } from './Signup';
// import Postreq from './Postreq';

//  const Login = () => {
//   const [showSignupForm, setShowSignupForm] = useState(false);

//   const handleSignupClick = () => {
//     setShowSignupForm(true);
//   }

//   if (showSignupForm) {
//     return <Postreq />;
//   }

//   return (
//     <div>
//       <form>
//         {/* login form code here */}
//       </form>
//       {showSignupForm === false && (
//         <p>
//           New user? <a href="#" onClick={handleSignupClick}>Sign up</a>
//         </p>
//       )}
//     </div>
//   );
// };
// export default Login

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password1: '',
//     password2: ''
//   });
//   const [errors, setErrors] = useState({});

//   const { username, email, password1, password2 } = formData;

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/auth/signup/', formData);
//       console.log(res.data);
//     } catch (err) {
//       setErrors(err.response.data);
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" name="username" value={username} onChange={handleChange} />
//         {errors.username && <p>{errors.username}</p>}
//       </label>
//       <label>
//         Email:
//         <input type="email" name="email" value={email} onChange={handleChange} />
//         {errors.email && <p>{errors.email}</p>}
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password1" value={password1} onChange={handleChange} />
//         {errors.password1 && <p>{errors.password1}</p>}
//       </label>
//       <label>
//         Confirm password:
//         <input type="password" name="password2" value={password2} onChange={handleChange} />
//         {errors.password2 && <p>{errors.password2}</p>}
//       </label>
//       <button type="submit">Sign up</button>
//     </form>
//   );
// };

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});

//   const { username, password } = formData;

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/auth/login/', formData);
//       localStorage.setItem('token', res.data.access);
//       console.log(res.data);
//     } catch (err) {
//       setErrors(err.response.data);
//       console.error(err.response.data);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" name="username" value={username} onChange={handleChange} />
//         {errors.non_field_errors && <p>{errors.non_field_errors}</p>}
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password" value={password} onChange={handleChange} />
//         {errors.non_field_errors && <p>{errors.non_field_errors}</p>}
//       </label>
//       <button type="submit">Log in</button>
//     </form>
//   );
// };
