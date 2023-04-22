import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardLayout from "../../layouts/Dashboard";
import axios from "axios";

const URL = import.meta.env.VITE_API_SERVER;

const Dashboard = () => {
  const [pending, setPending] = useState([]);
  const [latePayment, setLatePayment] = useState([]);

  useEffect(() => {
    const getPending = async () => {
      await axios
        .get(`${URL}/api/v1/cliente/pending`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token"))["access_token"]
            }`,
          },
        })
        .then((res) => {
          setPending(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Error al agregar cliente");
        });
    };

    getPending();
  }, []);

  useEffect(() => {
    const getLatePayment = async () => {
      await axios
        .get(`${URL}/api/v1/cliente/atrasados`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token"))["access_token"]
            }`,
          },
        })
        .then((res) => {
          setLatePayment(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Error al agregar cliente");
        });
    };

    getLatePayment();
  }, []);

  return (
    <div className="dashboard__container d-flex">
      <div className="dashboard-layout__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-layout__content  p-5 w-100">
        <DashboardLayout pendientes={pending} atrasados={latePayment} />
      </div>
    </div>
  );
};

export default Dashboard;
