import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as userService from "../services/userService";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);

  const Users = async () => {
    try {
      const { data } = await userService.getUsers();

      setUsers(data);
      setFilteredUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const result = users.filter((user) => {
      return user.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredUser(result);
  }, [search]);
  const handleDelete = () => {};

  const columns = [
    { name: "Image", selector: (row) => <img src={row.image} alt={row.name} height="50" width={50} /> },
    { name: "Email", selector: (row) => row.email },
    { name: "Name", selector: (row) => row.name },
    { name: "Date", selector: (row) => format(new Date(row.dob), "dd/MM/yyyy") },
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
          data={filteredUser}
          pagination
          paginationPerPage={5}
          highlightOnHover
          subHeader
          // subHeaderStyles={{ display: "flex", justifyContent: "space-between" }}
          subHeaderComponent={
            <input
              type={"text"}
              placeholder="Search User Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
