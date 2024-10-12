import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import toast from "react-hot-toast";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { getSoils, DeleteSoil } from "../../apis/soil";
import { RxCross2 } from "react-icons/rx";
import { editSoil } from "../../apis/soil";

function Dashboard() {
  const [soils, setSoils] = useState([]);
  const [del, setDel] = useState('');

  const [characteristics, setCharacteristics] = useState([]);
  const [suitable_crops, setSuitable_crops] = useState([]);
  const [characteristicInput, setCharacteristicInput] = useState("");
  const [cropInput, setCropInput] = useState("");
  const [distributor, setDistributor] = useState("");
  const [token, setToken] = useState(null);
  const [id, setId] = useState('');

  const [active, setActive] = useState()
  const [editmodal, setEditModal] = useState(false);

  const fetchSoils = async () => {
      const tok = localStorage.getItem("token");
      setToken(tok);
      try {
        const allsoil = await getSoils(tok);
        if (allsoil.status === 200) {
          setSoils(allsoil.data);
        } else {
          console.log("Error fetching soils:", allsoil.data.message);
        }
      } catch (error) {
        console.log("Error fetching soils:", error);
      }
    };
  useEffect(() => {
    fetchSoils();
  }, [soils]);

  const AddCharacteristic = (e) => {
    e.preventDefault();
    if (characteristicInput.trim() !== "") {
      setCharacteristics([...characteristics, characteristicInput]);
      setCharacteristicInput("");
    }
  };

  const AddCrop = (e) => {
    e.preventDefault();
    if (cropInput.trim() !== "") {
      setSuitable_crops([...suitable_crops, cropInput]);
      setCropInput("");
    }
  };

  const del_soil = async (id) => {
    const del_res = await DeleteSoil(id, token);
    console.log(del_res);
    if (del_res.status === 200) {
      toast.success("Distributor deleted successfully");
      setDel('');
    } else {
      toast.error("Unable to delete");
    }
  };

  const canceledit = () => {
    if (editmodal) {
      setEditModal(false);
      setCharacteristicInput("");
      setCropInput("");
    }else{
      setEditModal(true);
    }
  }

  const updateSoil = async(e) => {
    e.preventDefault();
    try{
      const upd = await editSoil(id, characteristics, suitable_crops, distributor,token);
      console.log(upd);
      if(upd.status === 200){
        toast.success("Soil updated successfully");
        fetchSoils();
        canceledit();
      }else{
        toast.error("Error updating soil");
      }
    }catch(err){
      console.log(err);
      toast.error("Error updating!");
    }
  }

  return (
    <div className="dashboard">
  <div className="content">
    {(soils || [])
      .slice()
      .reverse()
      .map((i, index) => {
        return (
          <div key={index} className="table-edit-wrapper">
            <div className="table">
              <div className="col">
                <div className="title">
                  <FaChevronCircleRight size={20} />
                  <span> {i.name}</span>
                </div>
                <div className="color">{i.color} color</div>
              </div>

              <div className="col distributor">
                <span>
                  <FaDotCircle size={10} /> Distributor :
                </span>
                <div>{i.distributor}</div>
                <div>{i.location}</div>
              </div>
            </div>
            <div className="edit">
              <span className="editbtn" onClick={(e)=>{
               
                setId(i._id);
                setEditModal(true);
                setCharacteristics(i.characteristics);
                setSuitable_crops(i.suitable_crops);
                setDistributor(i.distributor);
              }}>
                <RiEdit2Fill />
              </span>
              <span className="delbtn" onClick={(e) => setDel(i._id)}>
                <MdDelete />
              </span>
            </div>
          </div>
        );
      })}

    {
      editmodal && (
        <div className="form-container">
          <div
            style={{
              display: "flex",
              float: "right",
              marginRight: "-0.5rem",
              cursor: "pointer",
            }}
          >
            <RxCross2 onClick={canceledit} size={32} />

          </div>
          <h1>Edit Distributor</h1>
          <form>
            <div>
              <label>
                Characteristic :
                <input
                  type="text"
                  value={characteristicInput}
                  onChange={(e) => setCharacteristicInput(e.target.value)}
                />
                <button className="charbtn" onClick={AddCharacteristic}>
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
                  onClick={AddCrop}
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
                
              />
            </label>

            <button onClick={updateSoil} className="addsoil">
              Update
            </button>
          </form>
        </div>
      )
    }
      
    {del && (
      <div className="delete-confirm">
        <h2>Do you want to delete?</h2>
        <div className="buttons">
          <button onClick={() => del_soil(del)}>Delete</button>
          <button onClick={() => setDel('')}>Cancel</button>
        </div>
      </div>
    )}
  </div>
</div>

  );
}

export default Dashboard;
