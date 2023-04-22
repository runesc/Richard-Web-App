import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const URL = import.meta.env.VITE_API_SERVER;

const AllClients = () => {
    const history = useHistory();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      await axios
        .get(`${URL}/api/v1/cliente/`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token"))["access_token"]
            }`,
          },
        })
        .then((res) => {
          setClients(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Error al agregar cliente");
        });
    };

    getClients();
  }, []);

  const removeClient = async (codigoContrato) => {
    await axios
      .delete(`${URL}/api/v1/cliente/${codigoContrato}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token"))["access_token"]
          }`,
        },
      })
      .then((res) => {
        history.push("/dashboard/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error al eliminar cliente");
      });
  };

  return (
    <div className="dashboard__container d-flex">
      <div className="dashboard-layout__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-layout__content p-5 w-100">
      <div className="dashboard-layout__content mt-4">
        <h3>Clientes</h3>
        <div className="dashboard-layout__content__table mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Código de contrato</th>
                <th scope="col">Nombre del cliente</th>
                <th scope="col">Apellido del cliente</th>
                <th scope="col">Numero de pago</th>
                <th scope="col">Fecha de vencimiento</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.codigoContrato}</th>
                    <td>{item.name}</td>
                    <td>{item.lastName}</td>
                    <td>{item.numeroDePagos}</td>
                    <td>
                      {new Date(item.proximaFechaPago).toLocaleDateString()}
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => removeClient(item.codigoContrato)}
                        >
                            Eliminar
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AllClients;
