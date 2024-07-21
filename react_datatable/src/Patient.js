import DataTable from "react-data-table-component";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Patient = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");
  const [searchHN, setSearchHN] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false); // State for showing DataTable
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    row: null,
  });

  const handleView = useCallback(
    (row) => {
      console.log("View clicked for row:", row);
      navigate("/orderpay", { state: { patient: row } });
    },
    [navigate]
  );

  const handleDelete = useCallback((row) => {
    setDeleteConfirmation({
      show: true,
      row: row,
    });
  }, []);

  const confirmDelete = async () => {
    if (deleteConfirmation.row) {
      try {
        await axios.delete(
          `http://localhost:5000/api/patient_details/${deleteConfirmation.row.patient_id}`
        );
        console.log("Delete successful for row:", deleteConfirmation.row);
        setData((prevData) =>
          prevData.filter(
            (item) => item.patient_id !== deleteConfirmation.row.patient_id
          )
        );
      } catch (error) {
        console.error("Error deleting row:", deleteConfirmation.row, error);
      } finally {
        setDeleteConfirmation({ show: false, row: null });
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, row: null });
  };

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
    fetchData();
  };

  const handleSort = (column, sortDirection) => {
    console.log(column);
    setSortColumn(column.first_name);
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

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setShowTable(true); // Show table when search is submitted
    fetchData();
  };

  const generateUniqueHN = async () => {
    let uniqueHN = false;
    let newHN = "";
    while (!uniqueHN) {
      newHN = `9${Math.floor(Math.random() * 1e8)}`.padStart(9, "0");
      const response = await axios.get(
        `http://localhost:5000/api/patient_details?HN=${newHN}`
      );
      if (response.data.data.length === 0) {
        uniqueHN = true;
      }
    }
    return newHN;
  };

  const handleAddPatient = async () => {
    try {
      const hn = await generateUniqueHN();
      const newPatient = {
        HN: hn,
        first_name: newFirstName,
        last_name: newLastName,
        gender: newGender,
        title: newTitle,
        status: "active", // Default status or change as needed
      };

      await axios.post("http://localhost:5000/api/patient_details", newPatient);
      fetchData(); // Refresh patient data
      setShowPopup(false); // Close popup
      setMessage(""); // Clear message
    } catch (error) {
      console.error("Error adding patient:", error);
      setMessage("เกิดข้อผิดพลาดในการเพิ่มข้อมูลผู้ป่วย");
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchData();
    }
  }, [page, perPage, sortColumn, sortColumnDir, showTable]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>รายชื่อผู้ป่วย</h3>
      <button onClick={() => setShowPopup(true)}>เพิ่ม</button>
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

      {showTable && (
        <DataTable
          columns={columns}
          data={data || []}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={page}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          progressPending={loading}
          onSort={handleSort}
        />
      )}

      {deleteConfirmation.show && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            zIndex: 1000,
          }}
        >
          <h4>ยืนยันการลบข้อมูล</h4>
          <p>คุณต้องการลบข้อมูลนี้หรือไม่?</p>
          <button onClick={confirmDelete}>ยืนยัน</button>
          <button onClick={cancelDelete}>ยกเลิก</button>
        </div>
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            zIndex: 1000,
          }}
        >
          <h4>เพิ่มข้อมูลผู้ป่วยใหม่</h4>
          <label>
            First Name:
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>
          <button onClick={handleAddPatient}>บันทึก</button>
          <button onClick={() => setShowPopup(false)}>ปิด</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Patient;
