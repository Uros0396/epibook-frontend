import { useEffect, useState } from "react";
import MyModal from "../MyModal/Mymodal";
import getTokenPayload from "../../services/getTokenPayload";

const Welcome = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getName = () => {
    const token = localStorage.getItem("token");
    const payload = getTokenPayload(token);
    return payload?.name + " " + payload?.surname;
  };

  useEffect(() => {
    setIsModalVisible(true);
    const timer = setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isModalVisible && <MyModal show={isModalVisible} name={getName()} />;
};

export default Welcome;
