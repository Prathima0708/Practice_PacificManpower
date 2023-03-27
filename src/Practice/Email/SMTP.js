import React, { useState } from "react";

const SMTP = () => {
  const [formState, setFormState] = useState({});
  const changeHandler = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const config = {
      SecureToken: "80e9786d-8732-4465-9b92-96c57e8c540d",
      To: "priyakotian0708@gmail.com",
      From: "priyakotian0708@gmail.com",
      Subject: "This is from my contact form",
      Body: `${formState.name} connected to you over email`,
    };
    if (window.Email) {
      window.Email.send(config).then((message) => alert(message));
    }
  };
  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          name="name"
          value={formState.name || ""}
          placeholder="Name"
          onChange={changeHandler}
          className="border border-blue-900"
        />
        <input
          type="email"
          name="email"
          value={formState.email || ""}
          placeholder="Email"
          onChange={changeHandler}
          className="border border-blue-900"
        />
        <input type="submit" name="email" value="send email" />
      </form>
    </div>
  );
};

export default SMTP;
