// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [filename, setFilename] = useState("");
//   const [files, setFiles] = useState([]);
//   const [status, setStatus] = useState("");

//   let api = "http://127.0.0.1:8000/spacificmanpower/userreg/";

//   const saveFile = async () => {
//     const formData = new FormData();
//     formData.append("name", "abc");
//     formData.append("email", "asdas@g.com");
//     formData.append("phone", 1234567890);
//     formData.append("resume_file", filename);

//     try {
//       const response = await axios.post(api, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(response.data);
//       setStatus("File Uploaded Successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getFiles = () => {
//     axios
//       .get(api)
//       .then((response) => {
//         console.log(response.data);
//         setFiles(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const fetchContentType = (url) => {
//     return axios
//       .head(url)
//       .then((response) => {
//         console.log("from fetchcontent", response.headers["content-type"]);
//         return response.headers["content-type"];
//       })
//       .catch((error) => console.log(error));
//   };

//   const forceDownload = (response, title, contentType) => {
//     console.log(response, title, contentType);
//     if (!response || !response.data) {
//       console.error("Response or response data is undefined");
//       return;
//     }
//     const url = window.URL.createObjectURL(
//       new Blob([response.data], { type: contentType })
//     );
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", title);
//     document.body.appendChild(link);
//     link.click();
//   };

//   const downloadWithAxios = (url, title, contentType) => {
//     axios({
//       method: "get",
//       url,
//       responseType: "blob",
//       headers: {
//         Accept: contentType,
//       },
//     })
//       .then((response) => {
//         forceDownload(response, title, contentType);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getFiles();
//   }, []);
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-4">
//           <h2 className="alert alert-success">File Upload Section</h2>

//           <form>
//             <div className="form-group">
//               <label htmlFor="exampleFormControlFile1" className="float-left">
//                 Browse A File To Upload
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setFilename(e.target.files[0])}
//                 className="form-control"
//               />
//               {/* <input
//                 type="file"
//                 ref={fileInputRef}
//                 // accept=".pdf,.doc,.docx"
//                 onChange={handleFileUpload}
//               /> */}
//             </div>

//             <button
//               type="button"
//               onClick={saveFile}
//               className="btn btn-primary float-left mt-2"
//             >
//               Submit
//             </button>
//             <br />
//             <br />
//             <br />

//             {status ? <h2>{status}</h2> : null}
//           </form>
//         </div>

//         <div className="col-md-7">
//           <h2 className="alert alert-success">List of Uploaded Files</h2>

//           <table className="table table-bordered mt-4">
//             <thead>
//               <tr>
//                 <th scope="col">File Title</th>
//                 <th scope="col">Download</th>
//               </tr>
//             </thead>
//             <tbody>
//               {files.map((file) => {
//                 return (
//                   <tr>
//                     <td>{file.resume_file}</td>
//                     <td>
//                       <a href="" target="_blank"></a>

//                       <button
//                         // onClick={() =>
//                         //   downloadWithAxios(file.resume_file, file.id)
//                         // }
//                         onClick={() => {
//                           const fileUrl = `http://127.0.0.1:8000${file.resume_file}`;
//                           fetchContentType(fileUrl)
//                             .then((contentType) => {
//                               downloadWithAxios(
//                                 fileUrl,
//                                 file.resume_file.split("/").pop(),
//                                 contentType
//                               );
//                             })
//                             .catch((error) => {
//                               console.error(
//                                 "Error fetching content type:",
//                                 error
//                               );
//                             });
//                         }}
//                         // onClick={() =>
//                         //   downloadFile(
//                         //     `http://127.0.0.1:8000/spacificmanpower/userreg/+${file.resume_file}`,
//                         //     file.resume_file.split("/").pop()
//                         //   )
//                         // }
//                         // onClick={() => handleDownload(file.resume_file)}
//                         className="btn btn-success"
//                       >
//                         DownLoad
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React from "react";
import Contactus from "../src/Practice/Email/Contactus";
import Postreq from "../src/Practice/PacificmanpowerPractice/CheckBackend/Postreq";
import FileUpload from "../src/Practice/PacificmanpowerPractice/CheckBackend/FileUpload";
import EditDel from "../src/Practice/PacificmanpowerPractice/CheckBackend/EditDel";

const App = () => {
  return (
    <>
      <div className="App">
        <FileUpload />
        {/* <EditDel /> */}
      </div>
    </>
  );
};

export default App;
