import DataTable from "react-data-table-component";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Queue2 = () => {
  const [data, setData] = useState([]); // Initial state set to empty array
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

  const handleView = useCallback(
    (row) => {
      console.log("View clicked for row:", row);
      navigate("/orderpay", { state: { patient: row } });
    },
    [navigate]
  );

  const handleDelete = useCallback(async (row) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/queue/${row.queue_no}`
      );
      console.log("Delete successful for row:", row);
  
      // ลบแถวที่ถูกลบออกจาก state ของข้อมูล
      setData((prevData) =>
        prevData.filter((item) => item.queue_no !== row.queue_no)
      );
    } catch (error) {
      console.error("Error deleting row:", row, error);
      // จัดการเมื่อเกิดข้อผิดพลาดในการลบ
    }
  }, []);
  

  const columns = [
    {
      name: "คิว",
      selector: (row) => row.queue_no,
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
    {
      name: "Action",
      width: "200px",
      cell: (row) => (
        <div>
          <button onClick={() => handleView(row)}>View</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);

    let url = `http://localhost:5000/api/queue?page=${page}&per_page=${perPage}`;
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

    try {
      const response = await axios.get(url);

      setData(response.data.data);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.selector);
    setSortColumnDir(sortDirection);
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
    fetchData(); // Fetch data on search submit
  };

  useEffect(() => {
    fetchData(); // Fetch data initially and on dependencies change
  }, [page, perPage, sortColumn, sortColumnDir]);

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
      <DataTable
        title={<h3 style={{ textAlign: "center" }}>คิว</h3>}
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
    </div>
  );
};

export default Queue2;
