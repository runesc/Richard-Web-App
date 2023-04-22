
import { useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_API_SERVER;

const defaultUser = {
  name: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "",
}

const SettingsLayout = () => {

  const [newUser, setNewUser] = useState(defaultUser);

  const handleSubmit = async e => {
    e.preventDefault();

    // check if form is not empty
    if (
      newUser.name === "" ||
      newUser.lastName === "" ||
      newUser.username === "" ||
      newUser.password === "" ||
      newUser.confirmPassword === "" ||
      newUser.role === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // check if password and confirm password are the same
    if (newUser.password !== newUser.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // check if role is 0 or 1
    if (newUser.role !== "0" && newUser.role !== "1") {
      alert("El rol de usuario no es válido");
      return;
    }

    // send data to server
    await axios.post(`${URL}/api/v1/auth/register`, newUser).then((res) => {
      alert("Usuario agregado con éxito");
    }
    ).catch((err) => {
      alert("Error al agregar cliente");
    }
    );

    setNewUser(defaultUser);

  };

  return (
    <>
      <h1>Configuración</h1>

      <div className="new_user__form mt-5">
        <h3>Crear nuevo usuario</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-group mt-4">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="newName"
                  aria-describedby="emailHelp"
                  placeholder="Nombre"
                  name="name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mt-4">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="newLastName"
                  placeholder="Apellido"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mt-4">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="newUsername"
                  placeholder="Nombre de usuario"
                  name="username"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group mt-4">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="Contraseña"
                  name="password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mt-4">
                <label htmlFor="password">Confirmar contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="newConfirmPassword"
                  placeholder="Contraseña"
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={e => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-4">
            <select className="form-select" aria-label="Default select example" onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              <option defaultValue>Permiso de usuario</option>
              <option value="0">Administrador</option>
              <option value="1">Usario</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary d-block ms-auto mt-4"
          >
            Registrar usuario
          </button>
        </form>
      </div>
    </>
  );
};

export default SettingsLayout;
