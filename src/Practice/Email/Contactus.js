import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import emailjs from "@emailjs/browser";

function Contactus() {
  const form = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_yrkw0oh",
  //       "template_fpg9v45",
  //       form.current,
  //       "CbFAqkthSAxyw2YAb"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   e.target.reset();
  // };

  // const sendEmail = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch(
  //     "http://127.0.0.1:8000/spacificmanpower/userreg/"
  //   );
  //   const data = await response.json();

  //   // Filter the list of email addresses based on the `active` field
  //   const activeEmails = data
  //     .filter((entry) => entry.active)
  //     .map((entry) => entry.email);
  //   console.log("active mail ids", activeEmails);
  //   emailjs
  //     .sendForm(
  //       "service_yrkw0oh",
  //       "template_fpg9v45",
  //       form.current,
  //       "CbFAqkthSAxyw2YAb"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );

  //   // Send the email only to the filtered list of email addresses
  //   emailjs.send("service_yrkw0oh", "template_fpg9v45", {
  //     to_email: activeEmails.join(","),
  //     message: e.target.message.value,
  //   });

  //   e.target.reset();
  // };

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // fetch active subscribers
    fetch("http://127.0.0.1:8000/spacificmanpower/userreg/")
      .then((response) => response.json())
      .then((subscribers) => {
        const activeUsers = subscribers.filter((user) => user.active);
        console.log("acrive mail ids", activeUsers);

        activeUsers.forEach((subscriber) => {
          console.log(
            "subscriber mail",
            subscriber.user_name,
            subscriber.email
          );
          // send email for each active subscriber
          const emailParams = {
            recipient_name: subscriber.user_name,
            to_email: subscriber.email,
            event_name: formData.get("event_name"),
            event_date: formData.get("event_date"),
          };

          emailjs
            .send(
              "service_yrkw0oh",
              "template_ouf8ms5",
              emailParams,
              "CbFAqkthSAxyw2YAb"
            )
            .then((result) => {
              console.log("Email sent successfully:", result.text);
            })
            .catch((error) => {
              console.error("Error sending email:", error.text);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching subscribers:", error);
      });

    e.target.reset();
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="recipient_name" />
      <br />
      <label>Email</label>
      <input type="text" name="event_name" />
      <br />
      <label>Message</label>
      <textarea name="event_date" />
      <br />
      <br />
      <input type="submit" value="Send" />
    </form>
  );
}

export default Contactus;
