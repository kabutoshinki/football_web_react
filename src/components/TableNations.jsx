import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as nationService from "../services/nationService";
import DataTable from "react-data-table-component";
import ModalComp from "./ModalComp";

const TableNations = () => {
  const [nations, setNations] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredNation, setFilteredNation] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [type, setType] = useState("");

  const Nations = async () => {
    try {
      const { data } = await nationService.getNations();
      setNations(data);
      setFilteredNation(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    setOpenModal(true);
    setType("create");
  };
  const handleCreateSuccess = () => {
    Nations();
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

  useEffect(() => {
    const result = nations.filter((nation) => {
      return nation.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredNation(result);
  }, [search, nations]);

  const columns = [
    { name: "Image", selector: (row) => <img src={row.image} alt={row.name} height="50" width={50} /> },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Description", selector: (row) => row.description },
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
    Nations();
  }, []);
  return (
    <>
      <Box sx={{ marginTop: "64px" }}>
        <DataTable
          title="Nation List"
          columns={columns}
          data={filteredNation}
          pagination
          paginationPerPage={3}
          highlightOnHover
          subHeader
          subHeaderStyles={{ display: "flex", justifyContent: "space-between" }}
          subHeaderComponent={
            <div className="d-flex justify-content-between" style={{ width: "100%" }}>
              <button className="btn btn-outline-success" onClick={handleCreate}>
                Create Nation
              </button>
              <input
                type={"text"}
                placeholder="Search Nations Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-25 form-control"
              />
            </div>
          }
          subHeaderAlign={"left"}
        />
        <ModalComp
          open={openModal}
          name={"nation"}
          onClose={() => setOpenModal(false)}
          type={type}
          data={selectedRowData}
          onCreateSuccess={handleCreateSuccess}
        />
      </Box>
    </>
  );
};

export default TableNations;
