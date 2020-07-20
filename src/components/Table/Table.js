import React, { useState, useEffect } from "react";
import "./Table.css";
import ModalWindow from "../Modal/Modal";
import Axios from "axios";
import Loader from "../Loader/Loader";

const Tables = ({ results, term, searching }) => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);

  let modaldata = null;

  if (showModal) {
    modaldata = (
      <ModalWindow
        show={showModal}
        singleUserData={singleUserData}
        loading={loading}
        onRequestClose={() => setShowModal(false)}
      />
    );
  }

  let loader = null;

  if (loading) {
    loader = <Loader />;
  }

  const showDetails = (e) => {
    setUserId(e.target.parentNode.getAttribute("name"));
    setShowModal(true);
  };

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true);
        const arr = [];
        const res = await Axios.get(`https://reqres.in/api/users/${userId}`, {
          cancelToken: source.token,
        });
        arr.push(res.data.data);
        setSingleUserData(arr);
        setLoading(false);
      } catch (error) {
        if (Axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };
    fetchData();
    return () => {
      source.cancel("can");
    };
  }, [userId]);

  return (
    <React.Fragment>
      {loader}
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {results.filter(searching(term)).map((res) => {
            return (
              <tr key={res.id} name={res.id} onClick={(e) => showDetails(e)}>
                <td name={res.id}>
                  <img src={res.avatar} className="table-image" alt="user" />
                </td>
                <td>{res.first_name + " " + res.last_name}</td>
                <td>{res.email}</td>
              </tr>
            );
          })}
          {modaldata}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Tables;
