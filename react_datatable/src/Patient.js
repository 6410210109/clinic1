import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Patient = () => {
  const [data, setData] = useState([]);
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

  const fetchData = async () => {
    let url = `http://localhost:5000/api/patient_details`;
    const params = {};

    if (searchHN) {
      params.HN = searchHN;
    }
    if (searchFirstName) {
      params.first_name = searchFirstName;
    }
    if (searchLastName) {
      params.last_name = searchLastName;
    }

    try {
      const response = await axios.get(url, { params });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setShowTable(true); // Show table when search is submitted
    fetchData();
  };

  const handleAddPatient = async () => {
    try {
      const newPatient = {
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
  }, [showTable]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>รายชื่อผู้ป่วย</h3>
      <Button variant="contained" onClick={() => setShowPopup(true)}>
        เพิ่ม
      </Button>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          label="Search HN"
          variant="outlined"
          size="small"
          onChange={handleSearchHNChange}
        />
        <TextField
          label="Search First Name"
          variant="outlined"
          size="small"
          onChange={handleSearchFirstNameChange}
        />
        <TextField
          label="Search Last Name"
          variant="outlined"
          size="small"
          onChange={handleSearchLastNameChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      {showTable && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>HN</TableCell>
                <TableCell align="right">ชื่อ</TableCell>
                <TableCell align="right">นามสกุล</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.patient_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.HN}
                  </TableCell>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleView(row)}>View</Button>
                    <Button onClick={() => handleDelete(row)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={deleteConfirmation.show}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ยืนยันการลบข้อมูล"}</DialogTitle>
        <DialogContent>
          <p>คุณต้องการลบข้อมูลนี้หรือไม่?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">เพิ่มผู้ป่วยใหม่</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ชื่อ"
            type="text"
            fullWidth
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="นามสกุล"
            type="text"
            fullWidth
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="เพศ"
            type="text"
            fullWidth
            value={newGender}
            onChange={(e) => setNewGender(e.target.value)}
          />
          <TextField
            margin="dense"
            label="คำนำหน้า"
            type="text"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPopup(false)} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleAddPatient} color="primary">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Patient;
