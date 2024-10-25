import { useEffect, useState } from "react";
import MyModal from "../MyModal/Mymodal";

const Welcome = () => {
  const [name, setName] = useState("Epicoder");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);
    const timer = setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isModalVisible && <MyModal show={isModalVisible} name={name} />;
};

export default Welcome;
