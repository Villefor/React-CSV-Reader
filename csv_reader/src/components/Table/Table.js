import React, { useState } from "react";
import "./styles.scss";

const Table = ({ parsedCsvData, delete_data, add_data }) => {
  const [show, setShow] = useState(false);
  const [show_input, setFilter] = useState(false);
  const [filters, setFilters] = useState("");
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");

  const handle_show = () => {
    setShow(!show);
  };

  const handle_filter_input = () => {
    setFilter(!show_input);
  };

  const handle_add = () => {
    const obj = {
      id: parsedCsvData.length + 1,
      name,
      telephone,
    };
    if (name !== "" && telephone !== "") add_data(obj);
  };

  return (
    <div className="table_div">
      <div className="table_div_button">
        <button onClick={handle_show} className="table_add_cell_button">
          Adicionar célula
        </button>
        <button className="table_button_filter" onClick={handle_filter_input}>
          Filtrar cédulas
        </button>
        {show_input && (
          <>
            <input
              className="table_filter_input"
              maxLength="20"
              onChange={(event) => setFilters(event.target.value)}
              placeholder="Insetir nome"
            />
          </>
        )}
      </div>
      {parsedCsvData && (
        <table>
          {show && (
            <tr>
              <td>
                <input
                  value={parsedCsvData.length + 1}
                  disabled
                  onChange={(event) => setID(event.target.value)}
                />
              </td>
              <td>
                <input
                  required
                  maxLength="20"
                  onChange={(event) => setName(event.target.value)}
                />
              </td>
              <td>
                <input
                  required
                  maxLength="20"
                  onChange={(event) => setTelephone(event.target.value)}
                />
              </td>
              <td>
                <button onClick={handle_add} className="table_add_button">
                  Adicionar
                </button>
              </td>
            </tr>
          )}
          <thead className="table_thead">
            <tr className="table_tr">
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {parsedCsvData
              .filter((item) =>
                item.name.toLowerCase().includes(filters.toLowerCase())
              )
              .map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{row.id}</td>

                    <td>{row.name}</td>

                    <td>{row.telephone}</td>

                    <td>
                      <button
                        onClick={delete_data(index)}
                        className="table_delete_button"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
