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
import { IoMdEye } from "react-icons/io";
import { getsoil_details } from "../../apis/soil";
import farmingAgent from "../../assets/farmingagent.png";

function Dashboard() {
  const [soils, setSoils] = useState([]);
  const [del, setDel] = useState("");

  const [characteristics, setCharacteristics] = useState([]);
  const [suitable_crops, setSuitable_crops] = useState([]);
  const [characteristicInput, setCharacteristicInput] = useState("");
  const [cropInput, setCropInput] = useState("");
  const [distributor, setDistributor] = useState("");
  const [token, setToken] = useState(null);
  const [id, setId] = useState("");

  const [active, setActive] = useState("");
  const [editmodal, setEditModal] = useState(false);
  const [viewmodal, setViewModal] = useState(false);

  const [fetchsoil, setFetchsoil] = useState();
  useEffect(() => {
    console.log("Updated fetchsoil:", fetchsoil);
  }, [fetchsoil]);

  const fetchSoildata = async () => {
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
    fetchSoildata();
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
      setDel("");
    } else {
      toast.error("Unable to delete");
    }
  };

  const canceledit = () => {
    if (editmodal) {
      setEditModal(false);
      setCharacteristicInput("");
      setCropInput("");
      setActive("");
    } else {
      setEditModal(true);
    }
  };

  const updateSoil = async (e) => {
    e.preventDefault();
    try {
      const upd = await editSoil(
        id,
        characteristics,
        suitable_crops,
        distributor,
        token
      );
      console.log(upd);
      if (upd.status === 200) {
        toast.success("Soil updated successfully");
        fetchSoildata();
        canceledit();
      } else {
        toast.error("Error updating soil");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating!");
    }
  };

  const viewsoil = async (e, i_id) => {
    e.preventDefault();
    setViewModal(true);
    console.log("view id :", i_id);
    setActive(i_id);
    try {
      const view = await getsoil_details(i_id, token);
      if (view.status === 200) {
        setFetchsoil(view.data);
        console.log(fetchsoil);
      } else {
        toast.error("Error fetching soil details");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error viewing soil!");
    }
  };

  return (
    <div className="dashboard">
      <div className="content">
        {(soils || [])
          .slice()
          .reverse()
          .map((i, index) => {
            return (
              <div key={index} className="table-edit-wrapper">
                <div onClick={(e) => {
                        viewsoil(e, i._id);
                      }} className={`table ${active === i._id ? "active1" : ""} `}>
                  <div className="triangle"></div>
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
                  <span className="delbtn">
                    <IoMdEye
                      onClick={(e) => {
                        viewsoil(e, i._id);
                      }}
                      style={{ color: "black" }} 
                      size={24}
                    />
                  </span>
                  <span
                    className="editbtn"
                    onClick={(e) => {
                      setActive(i._id);
                      setId(i._id);
                      setEditModal(true);
                      setCharacteristics(i.characteristics);
                      setSuitable_crops(i.suitable_crops);
                      setDistributor(i.distributor);
                    }}
                  >
                    <RiEdit2Fill style={{ color: "black" }} />
                  </span>
                  <span
                    className="delbtn"
                    onClick={(e) => {
                      setDel(i._id);
                      setActive(i._id);
                    }}
                  >
                    <MdDelete style={{ color: "black" }} />
                  </span>
                </div>
              </div>
            );
          })}

        {editmodal && (
          <>
            <div className="modal-backdrop"></div>
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
                    <button className="charbtn" type="button" onClick={AddCrop}>
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
          </>
        )}
        {viewmodal && (
          <>
            <div className="modal-backdrop"></div>
            <div className="view-container">
              {fetchsoil ? (
                <div>
                  <div className="close-icon">
                    <RxCross2
                      onClick={() => {
                        setViewModal(false);
                        setFetchsoil("");
                        setActive("");
                        setDel("");
                        setCharacteristics("");
                        setSuitable_crops("");
                        setDistributor("");
                      }}
                      size={21}
                    />
                  </div>
                  <h1>Distributor Details</h1>
                  <div className="details-section">
                    <span>Soil Name :</span>
                    <div>{fetchsoil.name}</div>
                  </div>
                  <div className="details-section">
                    <span>Soil Color:</span>
                    <div>{fetchsoil.color}</div>
                  </div>
                  <div className="details-section">
                    <h3>Characteristics :</h3>
                    <ul>
                      {fetchsoil.characteristics.map((char, charIndex) => (
                        <li key={charIndex}>{char}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="details-section">
                    <h3>Suitable Crops :</h3>
                    <ul>
                      {fetchsoil.suitable_crops.map((crop, cropIndex) => (
                        <li key={cropIndex}>{crop}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="details-section">
                    <span>Distributor :</span>
                    <div>{fetchsoil.distributor}</div>
                  </div>
                </div>
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </>
        )}

        {del && (
          <>
            <div className="modal-backdrop"></div>
            <div className="delete-confirm">
              <h2>Do you want to delete?</h2>
              <div className="buttons">
                <button
                  onClick={() => {
                    del_soil(del);
                    setActive("");
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setDel("");
                    setActive("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
