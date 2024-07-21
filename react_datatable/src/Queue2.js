import DataTable from "react-data-table-component";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // ใช้ library สำหรับ modal

const Queue2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");
  const [searchHN, setSearchHN] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newHN, setNewHN] = useState("");
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleView = useCallback(
    (row) => {
      console.log("View clicked for row:", row);
      navigate("/orderpay", { state: { patient: row } });
    },
    [navigate]
  );

  const handleDelete = (row) => {
    setSelectedRow(row);
    setDeleteModalIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRow) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/queue/${selectedRow.queue_no}`
      );
      console.log("Delete successful for row:", selectedRow);
      setData((prevData) =>
        prevData.filter((item) => item.queue_no !== selectedRow.queue_no)
      );
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error("Error deleting row:", selectedRow, error);
    }
  };

  const handleAdd = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleAddHNChange = (event) => {
    setNewHN(event.target.value);
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/queue/add`, {
        HN: newHN,
      });
      console.log("Add successful:", response.data);
      fetchData();
      handleModalClose();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

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
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage, sortColumn, sortColumnDir]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>คิว</h3>
      <button onClick={handleAdd}>เพิ่ม</button>
      <DataTable
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
      {/* Modal for adding new queue */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add Queue Modal"
      >
        <h2>เพิ่มคิวใหม่</h2>
        <form onSubmit={handleAddSubmit}>
          <label>
            HN:
            <input
              type="text"
              value={newHN}
              onChange={handleAddHNChange}
              required
            />
          </label>
          <button type="submit">เพิ่ม</button>
          <button type="button" onClick={handleModalClose}>
            ปิด
          </button>
        </form>
      </Modal>
      {/* Modal for delete confirmation */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        contentLabel="Confirm Delete Modal"
      >
        <h2>ยืนยันการลบ</h2>
        <p>คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?</p>
        <button onClick={confirmDelete}>ลบ</button>
        <button onClick={() => setDeleteModalIsOpen(false)}>ยกเลิก</button>
      </Modal>
    </div>
  );
};

export default Queue2;
