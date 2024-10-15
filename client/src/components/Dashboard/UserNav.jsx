import React, { useState, useEffect } from "react";
import avatar from "../../assets/avatar.png";
import "./Navbar.css";
import { FaPlus, FaUser } from "react-icons/fa";
import { postSoil } from "../../apis/soil";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { updUser } from "../../apis/user";
import farmingAgent from "../../assets/farmingagent.png";

function UserNav() {
  const [open, setOpen] = useState(false);
  const [characteristics, setCharacteristics] = useState([]);
  const [suitable_crops, setSuitable_crops] = useState([]);
  const [characteristicInput, setCharacteristicInput] = useState("");
  const [cropInput, setCropInput] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [distributor, setDistributor] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [avatarModal, setAvatarModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const [update, setUpdate] = useState(false);
  const [updusername, setUpdusername] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const navigate = useNavigate();

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
    const userid = localStorage.getItem("userid");
    console.log(userid);
    setUser(userid);
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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateuser = async (e) => {
    e.preventDefault();
    try {
      const response = await updUser(user, updemail, updpassword, token);
      console.log(response);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setUpdate(false);
        setUpdusername("");
        setNewpassword("");
      } else {
        console.log("Failed to update profile");
        toast.error("Failed to update profile");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <div className="navbar">
        <nav>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "fit-content",
              marginLeft: '0.5rem'
            }}
          >
            <img
              className="headimg"
              src={farmingAgent}
              alt="Logo"
            />
            <h1>
              farming <br />
              agent
            </h1>
          </div>
          <div></div>
          <ul>
            <p
              onClick={(e) => {
                avatarModal ? setAvatarModal(false) : setAvatarModal(true);
              }}
            >
              <img src={avatar} alt="avatar" />
              <IoIosArrowDown size={24} />
            </p>
          </ul>
        </nav>
        {avatarModal && (
          <div className={`avatar-modal ${closing ? "slide-out" : ""}`}>
            <p onClick={handleAvatarModalToggle}>
              <RxCross2 size={32} />
            </p>
            <p onClick={(e) => setUpdate(true)}>
              <FaUser size={22} />
              <span>Update Profile</span>
            </p>
            <p onClick={logout}>
              <HiOutlineLogout />
              <span>Log out</span>
            </p>
          </div>
        )}
        
      </div>
      {update && (
        <div className="form-container">
          <div
            style={{
              display: "flex",
              float: "right",
              marginRight: "-0.5rem",
              cursor: "pointer",
            }}
          >
            <RxCross2 onClick={(e) => setUpdate(false)} size={32} />
          </div>
          <h1>Update Profile</h1>
          <form>
            <label>
              Email :
              <input
                type="email"
                name="updemail"
                placeholder="Email Address"
                onChange={(e) => setUpdusername(e.target.value)}
              />
            </label>
            <label>
              Password :
              <input
                type="text"
                name="updpassword"
                placeholder="New Password"
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </label>
            <div className="buttons">
              <button onClick={updateuser}>Update</button>
              <button onClick={(e) => setUpdate(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      
    </>
  );
}

export default UserNav;
