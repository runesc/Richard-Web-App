const DashboardLayout = ({ pendientes, atrasados }) => {
  return (
    <div className="dashboard-layout">
      <h1>Inicio</h1>

      <div className="dashboard-layout__content mt-4">
        <h3>Pagos pendientes</h3>
        <div className="dashboard-layout__content__table mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Código de contrato</th>
                <th scope="col">Nombre del cliente</th>
                <th scope="col">Apellido del cliente</th>
                <th scope="col">Numero de pago</th>
                <th scope="col">Fecha de vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {pendientes?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.codigoContrato}</th>
                    <td>{item.name}</td>
                    <td>{item.lastName}</td>
                    <td>{item.numeroDePagos}</td>
                    <td>
                      {new Date(item.proximaFechaPago).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="dashboard-layout__content mt-4">
        <h3>Pagos atrasados</h3>
        <div className="dashboard-layout__content__table mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Código de contrato</th>
                <th scope="col">Nombre del cliente</th>
                <th scope="col">Apellido del cliente</th>
                <th scope="col">Numero de pago</th>
                <th scope="col">Fecha de vencimiento</th>
              </tr>
            </thead>
            <tbody>
            {atrasados?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.codigoContrato}</th>
                    <td>{item.name}</td>
                    <td>{item.lastName}</td>
                    <td>{item.numeroDePagos}</td>
                    <td>
                      {new Date(item.proximaFechaPago).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
