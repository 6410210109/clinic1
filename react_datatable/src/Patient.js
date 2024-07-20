import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Patient = () => {
  const [data, setData] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");
  const [searchHN, setSearchHN] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const columns = [
    {
      name: "คิว",
      selector: (row) => row.patient_id,
      sortable: true,
      width: "100px",
    },
    {
      name: "HN",
      selector: (row) => row.HN,
      sortable: true,
      width: "200px",
    },
    {
      name: "ชื่อ",
      selector: (row) => row.first_name,
      sortable: true,
      width: "300px",
    },
    {
      name: "นามสกุล",
      selector: (row) => row.last_name,
      sortable: true,
      width: "300px",
    },
    {
      name: "สถานะ",
      selector: (row) => row.status,
      sortable: true,
      width: "200px",
    },
  ];

  const fetchData = async () => {
    setLoading(true);

    let url = `http://localhost:5000/api/patient_details?page=${page}&per_page=${perPage}`;
    if (searchHN) {
      url += `&HN=${searchHN}`;
    }
    if (searchFirstName) {
      url += `&first_name=${searchFirstName}`;
    }
    if (searchLastName) {
      url += `&last_name=${searchLastName}`;
    }
    if (sortColumn) {
      url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDir}`;
    }

    const response = await axios.get(url);

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
    if (searchHN || searchFirstName || searchLastName) {
      fetchData();
    }
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.selector);
    setSortColumnDir(sortDirection);
    if (searchHN || searchFirstName || searchLastName) {
      fetchData();
    }
  };

  const handleSearchHNChange = (event) => {
    setSearchHN(event.target.value);
  };

  const handleSearchFirstNameChange = (event) => {
    setSearchFirstName(event.target.value);
  };

  const handleSearchLastNameChange = (event) => {
    setSearchLastName(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(); // Only fetch data when submitting
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search HN:
          <input type="text" name="searchHN" onChange={handleSearchHNChange} />
        </label>
        <label>
          Search First Name:
          <input
            type="text"
            name="searchFirstName"
            onChange={handleSearchFirstNameChange}
          />
        </label>
        <label>
          Search Last Name:
          <input
            type="text"
            name="searchLastName"
            onChange={handleSearchLastNameChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* Render table only if data is not null */}
      {data !== null && (
        <DataTable
          title={<h3 style={{ textAlign: "center" }}>รายชื่อผู้ป่วย</h3>}
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleSort}
        />
      )}
    </div>
  );
};

export default Patient;
