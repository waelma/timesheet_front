import { React, useEffect } from "react";
import { Result, Button } from "antd";
import "./AdminApprouve.css";
import { useNavigate } from "react-router-dom";
import Pusher from "pusher-js";
const AdminApprouve = () => {
  let navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    const pusher = new Pusher("e43b09785ab7ef07b82f", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe("channel".concat(user_id));
    channel.bind("ApprouverCompte", (data) => {
      console.log(data);
      localStorage.setItem("verifier", true);
      if (window.document.URL === "http://localhost:3000/profile") {
        window.location.reload();
      } else {
        navigate("/home");
      }
    });
    return () => pusher.unsubscribe(channel);
  }, []);
  return (
    <div className="AdminAppCont">
      <Result
        status="success"
        title="Your request has been registred successfully!"
        subTitle="The admin approuve may take a few minutes, thank you for waiting."
      />
      ,<Button type="primary">Done</Button>
    </div>
  );
};

export default AdminApprouve;
