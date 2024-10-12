import React, { useState, useEffect } from "react";
import avatar from "../../assets/avatar.png";
import "./Navbar.css";
import { FaPlus, FaUser } from "react-icons/fa";
import { postSoil } from "../../apis/soil";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import {IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [characteristics, setCharacteristics] = useState([]);
  const [suitable_crops, setSuitable_crops] = useState([]);
  const [characteristicInput, setCharacteristicInput] = useState("");
  const [cropInput, setCropInput] = useState("");

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [distributor, setDistributor] = useState("");
  const [token, setToken] = useState(null);
  const [avatarModal, setAvatarModal] = useState(false);
  const [closing, setClosing] = useState(false); // New state for handling closing animation

  const handleAvatarModalToggle = () => {
    if (avatarModal) {
      setClosing(true);
      setTimeout(() => {
        setAvatarModal(false);
        setClosing(false);
      }, 500); 
    } else {
      setAvatarModal(true);
    }
  };

  useEffect(() => {
    const tok = localStorage.getItem("token");
    setToken(tok);
  }, []);

  // Add to Characteristics array
  const handleAddCharacteristic = () => {
    if (characteristicInput.trim() !== "") {
      setCharacteristics([...characteristics, characteristicInput]);
      setCharacteristicInput("");
    }
  };

  // Add to Suitable Crops array
  const handleAddCrop = () => {
    if (cropInput.trim() !== "") {
      setSuitable_crops([...suitable_crops, cropInput]);
      setCropInput("");
    }
  };

  const Addsoil = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
      setName("");
      setColor("");
      setCharacteristics([]);
      setDistributor("");
      setSuitable_crops([]);
    }
  };

  const newsoil = async (e) => {
    e.preventDefault();
    const res = await postSoil(
      name,
      color,
      characteristics,
      suitable_crops,
      distributor,
      token
    );
    console.log(res);
    if (res.status === 201) {
      console.log("Soil added successfully");
      toast.success("Soil added successfully");
      setName("");
      setColor("");
      setCharacteristics([]);
      setSuitable_crops([]);
      setDistributor("");
      setOpen(false);
    } else {
      console.log("Failed to add soil");
      toast.error("Failed to add soil");
    }
  };

  return (
    <>
      <div className="navbar">
        <nav>
          <p>&nbsp;</p>
          <h1>soil farming agent</h1>
          <ul>
            <p
              onClick={(e) => {
                avatarModal ? setAvatarModal(false) : setAvatarModal(true);
              }}
            >
              <img src={avatar} alt="avatar" /><IoIosArrowDown size={24}/>
            </p>
          </ul>
        </nav>
        {avatarModal && (
          <div className={`avatar-modal ${closing ? "slide-out" : ""}`}>
            <p onClick={handleAvatarModalToggle}>
              <RxCross2 size={32} />
            </p>
            <p>
              <FaUser size={22} />
              <span>Update Profile</span>
            </p>
            <p>
              <HiOutlineLogout />
              <span>Log out</span>
            </p>
          </div>
        )}
        <div className="new_distribuutor">
          <button onClick={Addsoil}>
            <FaPlus />
            <p>Add New</p>
          </button>
        </div>
      </div>

      {open && (
        <div className="form-container">
          <div
            style={{
              display: "flex",
              float: "right",
              marginRight: "-0.5rem",
              cursor: "pointer",
            }}
          >
            <ImCancelCircle onClick={Addsoil} size={21} />
          </div>
          <h1>New Distributor</h1>
          <form>
            <label>
              Soil Name :
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="soilName"
                required
              />
            </label>

            <label>
              Soil Color :
              <input
                type="text"
                onChange={(e) => setColor(e.target.value)}
                name="color"
                required
              />
            </label>

            <div>
              <label>
                Characteristic :
                <input
                  type="text"
                  value={characteristicInput}
                  onChange={(e) => setCharacteristicInput(e.target.value)}
                />
                <button className="charbtn" onClick={handleAddCharacteristic}>
                  Add
                </button>
              </label>
              <ul>
                {characteristics.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <label>
                <span> Suitable Crop : </span>
                <input
                  type="text"
                  value={cropInput}
                  onChange={(e) => setCropInput(e.target.value)}
                />
                <button
                  className="charbtn"
                  type="button"
                  onClick={handleAddCrop}
                >
                  Add
                </button>
              </label>
              <ul>
                {suitable_crops.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <label>
              Distributor :
              <input
                type="text"
                onChange={(e) => setDistributor(e.target.value)}
                name="distributor"
                required
              />
            </label>

            <button className="addsoil" onClick={newsoil}>
              <FaPlus />
              &nbsp; Add Distributor
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;
