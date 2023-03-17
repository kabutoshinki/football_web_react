import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as userService from "../services/userService";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const Users = async () => {
    try {
      const { data } = await userService.getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { name: "Image", selector: (row) => <img src={row.image} alt={row.name} height="50" width={50} /> },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Date", selector: (row) => format(new Date(row.dob), "dd/MM/yyyy"), sortable: true },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <>
    //       <button className="btn btn-outline-danger" onClick={() => handleDelete(row._id)}>
    //         Delete
    //       </button>
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    Users();
  }, []);
  return (
    <>
      <Box sx={{ marginTop: "64px" }}>
        <DataTable
          title="Users List"
          columns={columns}
          data={
            users?.filter(
              (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            ) ?? []
          }
          pagination
          paginationPerPage={5}
          highlightOnHover
          subHeader
          // subHeaderStyles={{ display: "flex", justifyContent: "space-between" }}
          subHeaderComponent={
            <input
              type={"text"}
              placeholder="Search User Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-25 form-control"
            />
          }
          subHeaderAlign={"right"}
        />
      </Box>
    </>
  );
};
export default TableUsers;
