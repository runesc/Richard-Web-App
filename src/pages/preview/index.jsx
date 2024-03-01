// read query params from url
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import numeroALetras from "../../utils/numbers";
import axios from "axios";
import "./preview.styles.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const URL = import.meta.env.VITE_API_SERVER;

const Preview = () => {
  const { contract, invoice } = useParams();
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(2500.0);
  const reference = useRef(null);
  const [tempData, setTempData] = useState({});

  const handleTempChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${URL}/api/v1/pay/${contract}/${invoice}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token"))["access_token"]
            }`,
          },
        })
        .then((res) => {
          setData(res.data.invoice);
          setTempData({
            ...res.data.invoice,
            name: `${res.data.invoice.name} ${res.data.invoice.lastName}`,
            loc: `PAGO DE TERRENO(S) EJIDO BENITO JUÁREZ, MANZANA ${res.data.invoice.manzana} LOTE ${res.data.invoice.lote}`,
            owner: "Julia García Cruz",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  function obtenerSoloNumeros(cadena) {
    if (typeof cadena === "number") {
      return cadena;
    }

    const regex = /[^0-9$]/g;
    let numeros = cadena.replace(regex, "").replace(",", "").replace("$", "");
    numeros = numeros.substr(0, numeros.length - 2);
    setAmount(parseFloat(numeros));
  }

  return (
    <div className="invoice p-5 w-100">
      <div className="franja d-flex">
        <div className="numero_pago">
          No.{" "}
          <input
            type="text"
            value={tempData.numeroDePago}
            name="numeroDePago"
            onChange={handleTempChange}
          />
        </div>
        <div className="direccion_enrique_segoviano ms-auto text-end">
          <span className="d-block">Calle Hermanos Vázquez Gómez #251-C</span>
          <span className="d-block">Zona centro cp. 87000</span>
          <span className="d-block">
            <b>8342028546</b>
          </span>
        </div>
      </div>
      <div className="fecha_y_cantidad d-flex mt-2">
        <div className="fecha">
          <h2>Recibo de pago</h2>

          <DatePicker
            className="form-control hide__print__border"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="cantidad ms-auto">
          <input
            type="text"
            defaultValue={"$2,500.00 MN"}
            onChange={(e) => setAmount(e.target.value)}
            ref={reference}
            className="form-control hide__print__border ms-auto limited__width"
          />
        </div>
      </div>

      <div className="bordered__container mt-3">
        <p className="client__name p-3 pb-0">
          <b>
            <input
              type="text"
              name="name"
              value={`${tempData.name}`}
              onChange={handleTempChange}
            />
          </b>
        </p>

        <div className="degraded__band">
          <b>Por la cantidad de:</b>{" "}
          <span className="quantity__text">
            {numeroALetras(obtenerSoloNumeros(amount), {
              plural: "PESOS",
              singular: "PESOS",
              centPlural: "",
              centSingular: "",
            })}
            {reference.current ? (
              <span>({reference.current.value})</span>
            ) : (
              <div>($2,500.00 MN)</div>
            )}
          </span>
        </div>

        <div className="concept d-flex gap-2 align-items-center pb-0 pt-3">
          <b>Concepto:</b>{" "}
          <span className="text-decoration-underline d-block w-100">
            <input
              type="text"
              className="location__input"
              name="loc"
              value={tempData.loc}
              onChange={handleTempChange}
            />
          </span>
        </div>
        <span className="d-block separator"></span>
        <div className="sign mb-3">
          <hr />
          <input type="text" className="owner__input" name="owner" value={tempData.owner} onChange={handleTempChange} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
