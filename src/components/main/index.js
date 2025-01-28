import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setOriginalData } from "../../state-managment/slice";
import { Modal } from "antd";
import Card from "../card";
import "./index.css";

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://cloud.codesupply.co/endpoint/react/data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setDate(data));
        dispatch(setOriginalData(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);
  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  const hanleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="main-container">
      {data.map((dataObj, index) => (
        <Card
          key={index}
          imagePath={dataObj.img}
          tags={dataObj.tags}
          title={dataObj.title}
          autor={dataObj.autor}
          date={dataObj.date}
          views={dataObj.views}
          text={dataObj.text}
          onClick={() => handleCardClick(dataObj)}
        />
      ))}
      <Modal
        title={selectedPost?.title}
        open={isModalOpen}
        onCancel={hanleCloseModal}
      >
        <img src={selectedPost?.img} alt="Post"></img>
        <p className="tags">{selectedPost?.tags}</p>
        <p className="autor">
          {" "}
          {selectedPost?.autor} <span> • {selectedPost?.date} </span> <span> • {selectedPost?.views}</span>{" "}
        </p>
        <p className="text">{selectedPost?.text}</p>
      </Modal>
    </div>
  );
};

export default Main;
