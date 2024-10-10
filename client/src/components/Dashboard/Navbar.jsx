import React, { useState, useEffect } from "react";
import avatar from "../../assets/avatar.png";
import "./Navbar.css";
import { FaPlus } from "react-icons/fa";
import { postSoil } from "../../apis/soil";
import toast from 'react-hot-toast'

function Navbar() {
  const [open, setOpen] = useState(false);
  const [characteristics, setCharacteristics] = useState([]);
  const [suitable_crops, setSuitable_crops] = useState([]); 
  const [characteristicInput, setCharacteristicInput] = useState(""); 
  const [cropInput, setCropInput] = useState(""); 

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [distributor, setDistributor] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tok = localStorage.getItem('token');
    setToken(tok);
  }, [])
  

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
    if (!open){
      setOpen(true);
    }else{
      setOpen(false);
    }
  };

  const newsoil = async(e) => {
    e.preventDefault();
    const res = await postSoil(name, color, characteristics, suitable_crops, distributor, token)
    console.log(res);
    if(res.status === 201){
      console.log("Soil added successfully");
      toast.success('Soil added successfully');
      setName('');
      setColor('');
      setCharacteristics([]);
      setSuitable_crops([]);
      setDistributor('');
      setOpen(false);
    } else{
      console.log("Failed to add soil");
      toast.error('Failed to add soil')
    }
  }

  return (
    <>
      <div className="navbar">
        <nav>
          <p>&nbsp;</p>
          <h1>soil farming agent</h1>
          <ul>
            <p>
              <img src={avatar} alt="avatar" />
            </p>
          </ul>
        </nav>
        <div className="new_distribuutor">
          <button onClick={Addsoil}>
            <FaPlus />
            <p>Add New</p>
          </button>
        </div>
      </div>

      {open && (
        <div className="form-container">
          <h1>New Distributor</h1>
          <form>
            <label>
              Soil Name : 
              <input type="text" onChange={(e)=>setName(e.target.value)} name="soilName" required />
            </label>

            <label>
              Soil Color : 
              <input type="text" onChange={(e)=>setColor(e.target.value)} name="color" required />
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
                <button className="charbtn" type="button" onClick={handleAddCrop}>
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
              <input type="text" onChange={(e)=>setDistributor(e.target.value)} name="distributor" required />
            </label>

            <button className="addsoil" onClick={newsoil}><FaPlus />&nbsp; Add Distributor</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;
