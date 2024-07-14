import DataTable from "react-data-table-component";
import { useState, useEffect, navigate, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Queue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleView = useCallback(
    (row) => {
      console.log("View clicked for row:", row);
      navigate("/orderpay", { state: { patient: row } });
    },
    [navigate]
  );

  const handleDelete = useCallback((row) => {
    console.log("Delete clicked for row:", row);
    // เพิ่มโค้ดการลบข้อมูล
  }, []);

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

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);

    const response = await axios.get(
      `http://localhost:5000/api/patient_details?page=${page}&per_page=${newPerPage}&delay=1`
    );

    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleSort = (column, sortDirection) => {
    console.log(column);
    setSortColumn(column.first_name);
    setSortColumnDir(sortDirection);
  };

  return (
    <div>
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

export default Queue;
