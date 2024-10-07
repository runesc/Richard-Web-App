// read query params from url
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import numeroALetras from '../../utils/numbers'
import axios from "axios";
import "./preview.styles.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const URL = import.meta.env.VITE_API_SERVER;

const Preview = () => {
  const { contract, invoice } = useParams();
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(2500.00)
  const reference = useRef(null)

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
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  function obtenerSoloNumeros(cadena) {
    if(typeof cadena === "number"){
      return cadena
    }

    const regex = /[^0-9$]/g;
    let numeros = cadena.replace(regex, '').replace(',', '').replace('$', '');
    numeros = numeros.substr(0,numeros.length-2)
    setAmount(parseFloat(numeros))
  }

  return (
    <div className="invoice p-5 w-100">
      <div className="franja d-flex">
        <div className="d-flex">
        <div className="numero_pago d-flex align-items-center"><div>No. </div><input type="text" className="text-decoration-underline form-control hide__print__border w-50 m-0" placeholder={invoice} /></div>
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
            onChange={
              (e)=> setAmount(e.target.value)
            }
            ref={reference}
            className="form-control hide__print__border ms-auto limited__width"
          />
        </div>
      </div>

      <div className="bordered__container mt-3">
        <p className="client__name p-3 pb-0">
          <input
            type="text"
            placeholder={`${data.name} ${data.lastName}`}
            className="form-control hide__print__border w-50"
          />
        </p>

        <div className="degraded__band">
          <b>Por la cantidad de:</b>{" "}
          <span className="quantity__text">
            {
              numeroALetras(obtenerSoloNumeros(amount), {
                plural: "PESOS",
                singular: "PESOS",
                centPlural: "",
                centSingular: ""
              })
            }
           {
            reference.current ? <span>({reference.current.value})</span> : <div>($2,500.00 MN)</div>
           }
          </span>
        </div>

        <div className="concept d-flex align-items-center gap-3">
          <b>Concepto:</b>{" "}
          <input className="text-decoration-underline form-control hide__print__border w-50"
          placeholder={
            //f-strings
            `PAGO DE TERRENO(S) EJIDO BENITO JUÁREZ, MANZANA ${data.manzana} LOTE ${data.lote}`
          }
          />
         
        </div>
        <div className="sign mb-3">
          <hr />
          <input type="text" className="text-decoration-underline form-control hide__print__border w-50 m-auto text-center" placeholder="Julia García Cruz" />
        </div>
      </div>
    </div>
  );
};

export default Preview;
