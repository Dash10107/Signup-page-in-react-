import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./AddModal.css";
//import Input from '@mui/material/Input';
import Select from "react-select";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ModalComp = ({ modalOpen, setModalOpen, watchlist,fetchWatchlist }) => {
  const token = localStorage.getItem("token");

  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleHover = () => {
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };

  const [newSymbol, setNewSymbol] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setNewSymbol(inputValue.toUpperCase());
    return inputValue;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(
      "Selected Symbol:",
      selectedOption ? selectedOption.value : newSymbol
    );
    const newValue = selectedOption ? selectedOption.value : newSymbol;
    if (watchlist.some(item => item === newValue)) {
      console.log('Value already exists in watchlist:', newValue);
      return ; // Return the original watchlist
    } 
    try {
      const newWatchlist = [
        ...watchlist,
        selectedOption ? selectedOption.value : newSymbol,
      ];
      if(newWatchlist.length === 0){
        console.log('watchlist',newWatchlist);
        
        return
      }
      
      // Make POST request to the backend route
      const response = await fetch(
        'https://hashing-backend.onrender.com/watchlists',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token // Include token in the request header
          },
          body: JSON.stringify({ symbols: newWatchlist })
        }
      );
      console.log('Watchlist created/updated:', response);
      if(response){
        fetchWatchlist();
      }
    } catch (error) {
      console.error('Error creating/updating watchlist:', error);
    }
    

    setModalOpen(false);
  };

  const fetchOptions = async () => {
    setLoading(true);
    try {
      // Make request to backend to fetch user's watchlist
      const response = await axios.get(
        "https://hashing-backend.onrender.com/watchlists/options",
        {
          headers: {
            Authorization: token, // Include token in the request header
          },
        }
      );
      setOptions(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch watchlist");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <>
      <Modal
        title="New Stock Symbol"
        className="modal-text"
        centered
        width={"auto"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="submit"
            onClick={handleSubmit}
            className={`animated-button ${
              isAnimating ? "animated btn-modal" : "btn-modal"
            }`}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            Adding New Stock Symbol &nbsp;&nbsp;
            {/* {isAnimating? <img src={WhiteArrow} alt=""/>: <img src={SideArrow} alt=""/>}   */}
          </Button>,
        ]}
      >
        {loading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <div className="box">
            <span className="nameaboveInput">New Stock Symbol</span>
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              onInputChange={handleInputChange}
              placeholder="Select or type a symbol..."
              isClearable
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalComp;
