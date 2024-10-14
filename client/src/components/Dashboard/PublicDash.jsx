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

function PublicDash() {
  const [soils, setSoils] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [suitable_crops, setSuitable_crops] = useState([]);
  const [distributor, setDistributor] = useState("");
  const [token, setToken] = useState(null);
  const [id, setId] = useState("");

  const [active, setActive] = useState("");
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

  const viewsoil = async (e, i_id) => {
    e.preventDefault();
    setViewModal(true);
    console.log("view id :", i_id);
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
                      style={{ color: "#5e9f30" }} 
                      size={24}
                    />
                  </span>
                </div>
              </div>
            );
          })}
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
      </div>
    </div>
  );
}

export default PublicDash;
