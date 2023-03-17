import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as playerService from "../services/playerService";
import DataTable from "react-data-table-component";
import ModalComp from "./ModalComp";
const TablePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [type, setType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const Players = async () => {
    try {
      const { data } = await playerService.getPlayers();
      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSuccess = () => {
    Players();
  };
  const handleCreate = () => {
    setOpenModal(true);
    setType("create");
  };

  const handleView = (row) => {
    setSelectedRowData(row);
    console.log(row);
    setOpenModal(true);
    setType("view");
  };

  const handleUpdate = (row) => {
    setSelectedRowData(row);
    console.log(row);
    setOpenModal(true);
    setType("update");
  };

  const handleDelete = (row) => {
    setSelectedRowData(row);
    setOpenModal(true);
    setType("delete");
  };

  const columns = [
    { name: "Image", selector: (row) => <img src={row.image} alt={row.name} height="50" width={50} /> },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Nation", selector: (row) => <img src={row.nation.image} alt={row.nation.name} height="50" width={50} /> },
    // { name: "Club", selector: (row) => row.club },
    // { name: "Position", selector: (row) => row.position },
    { name: "Goals", selector: (row) => row.goals, sortable: true },
    { name: "Captain", selector: (row) => (row.isCaptain ? "Yes" : "No"), sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="btn btn-outline-info me-2" onClick={() => handleView(row)}>
            View
          </button>
          <button className="btn btn-outline-primary me-2" onClick={() => handleUpdate(row)}>
            Update
          </button>
          <button className="btn btn-outline-danger" onClick={() => handleDelete(row)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    Players();
  }, []);
  return (
    <>
      <Box sx={{ marginTop: "64px" }}>
        <DataTable
          title="Players List"
          columns={columns}
          data={players?.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []}
          pagination
          paginationPerPage={5}
          highlightOnHover
          subHeader
          subHeaderStyles={{ display: "flex", justifyContent: "space-between" }}
          subHeaderComponent={
            <div className="d-flex justify-content-between" style={{ width: "100%" }}>
              <button className="btn btn-outline-success" onClick={handleCreate}>
                Create Player
              </button>
              <input
                type={"text"}
                placeholder="Search Player Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-25 form-control"
              />
            </div>
          }
          subHeaderAlign={"left"}
        />
        <ModalComp
          open={openModal}
          name={"player"}
          onClose={() => setOpenModal(false)}
          type={type}
          data={selectedRowData}
          onCreateSuccess={handleCreateSuccess}
        />
      </Box>
    </>
  );
};
export default TablePlayers;
