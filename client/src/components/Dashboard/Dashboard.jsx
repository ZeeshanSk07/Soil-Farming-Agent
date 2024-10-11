import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import toast from "react-hot-toast";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { getSoils, DeleteSoil } from "../../apis/soil";

function Dashboard() {
  const [token, setToken] = useState("");
  const [soils, setSoils] = useState([]);
  const [del, setDel] = useState('');
  const [active, setActive] = useState()

  useEffect(() => {
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

    fetchSoils();
  }, [soils]);

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
              <span className="editbtn">
                <RiEdit2Fill />
              </span>
              <span className="delbtn" onClick={(e) => setDel(i._id)}>
                <MdDelete />
              </span>
            </div>
          </div>
        );
      })}
      
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
