import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const IndexPage = (props) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;
