import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";

const FileUpload = () => {
  //   const [fileName, setFileName] = useState("");
  //   const saveFile = async () => {
  //     console.log("button click");
  //     let formData = new FormData();
  //     formData.append("pdf", fileName);
  //     let headers = {
  //       "Content-Type": "multpart/form-data",
  //     };
  //     // console.log(formData);
  //     const res = await axios.post(
  //       "http://127.0.0.1:8000/spacificmanpower/userreg/",
  //       formData,
  //       { headers: headers }
  //     );
  //     console.log(res.data);
  //   };

  const [filename, setFilename] = useState("");
  const [files, setFiles] = useState([{}]);
  const [status, setstatus] = useState("");
  const fileInputRef = useRef(null);

  let api = "http://127.0.0.1:8000/spacificmanpower/applyjob/";

  const saveFile = async () => {
    const formData = new FormData();
    formData.append("applicant_name", "abc");
    formData.append("applicant_email", "asdas@g.com");
    formData.append("descirption", "1234567890");
    formData.append("uploaded_resume", filename);
    console.log("formdata before post req", formData);

    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setstatus("File Uploaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getFiles = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchContentType = (url) => {
    return axios
      .head(url)
      .then((response) => {
        console.log("from fetchcontent", response.headers["content-type"]);
        return response.headers["content-type"];
      })
      .catch((error) => console.log(error));
  };

  const forceDownload = (response, title, contentType) => {
    console.log(response, title, contentType);
    if (!response || !response.data) {
      console.error("Response or response data is undefined");
      return;
    }
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: contentType })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
  };

  const downloadWithAxios = (url, title, contentType) => {
    axios({
      method: "get",
      url,
      responseType: "blob",
      headers: {
        Accept: contentType,
      },
    })
      .then((response) => {
        forceDownload(response, title, contentType);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFiles();
    //  console.log(files);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h2 className="alert alert-success">File Upload Section</h2>

          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1" className="float-left">
                Browse A File To Upload
              </label>
              <input
                type="file"
                onChange={(e) => setFilename(e.target.files[0])}
                className="form-control"
              />
              {/* <input
                type="file"
                ref={fileInputRef}
                // accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              /> */}
            </div>

            <button
              type="button"
              onClick={saveFile}
              className="btn btn-primary float-left mt-2"
            >
              Submit
            </button>
            <br />
            <br />
            <br />

            {status ? <h2>{status}</h2> : null}
          </form>
        </div>

        <div className="col-md-7">
          <h2 className="alert alert-success">User List</h2>

          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th scope="col">File Title</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => {
                return (
                  <tr>
                    {/* <td>{file.resume_file?.split("/").pop()}</td> */}
                    <td>{file.uploaded_resume}</td>
                    <td>
                      <a href="" target="_blank"></a>

                      <button
                        // onClick={() =>
                        //   downloadWithAxios(file.resume_file, file.id)
                        // }
                        // onClick={() => {
                        //   fetchContentType(file.resume_file).then(
                        //     (contentType) => {
                        //       downloadWithAxios(
                        //         file.resume_file,
                        //         file.resume_file.split("/").pop(),
                        //         contentType
                        //       );
                        //     }
                        //   );
                        // }}
                        // onClick={() =>
                        //   downloadFile(
                        //     `http://127.0.0.1:8000/spacificmanpower/userreg/+${file.resume_file}`,
                        //     file.resume_file.split("/").pop()
                        //   )
                        // }
                        onClick={() => {
                          const fileUrl = `http://127.0.0.1:8000${file.uploaded_resume}`;
                          fetchContentType(fileUrl)
                            .then((contentType) => {
                              downloadWithAxios(
                                fileUrl,
                                file.uploaded_resume.split("/").pop(),
                                contentType
                              );
                            })
                            .catch((error) => {
                              console.error(
                                "Error fetching content type:",
                                error
                              );
                            });
                        }}
                        className="btn btn-success"
                      >
                        DownLoad
                      </button>
                      {/* <button className="btn btn-success">Edit</button>
                      <button className="btn btn-danger">Delete</button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
