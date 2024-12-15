import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import {
  getSupllierActive,
  getWareHouseActive,
  getIngredientActive,
  getIngredientId,
  getStaffByUserName,
  AddRequest,
} from "../../../redux/actions/supplier";
import { use } from "react";
import withReactContent from "sweetalert2-react-content";
const FormModal = ({ showModal, onClose, onAddRecord }) => {
  const [rows, setRows] = useState([{ ingredient: "", unit: "", quantity: 0, price: 0, listunit: {} }]);
  const [listSupplier, setListSupplier] = useState([]);
  const [listWareHouse, setListWareHouse] = useState([]);
  const [listIngredient, setListIngredient] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [getIngredient, setIngredient] = useState(null); // Đảm bảo bạn lưu đúng ingredient
  const [getSelectSuppler, setSelectedSupplier] = useState(0);
  const [getSelectWareHouse, setSelectedWareHouse] = useState(0);

  const addRow = () => {
    setRows([...rows, { ingredient: "", unit: "", quantity: 0, price: 0 }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = field === "quantity" || field === "price" ? +value : value;
    setRows(updatedRows);
  };

  const getIngreId = async (id, index) => {
    const res = await getIngredientId(id);
    const ingredientData = res.data.data;
    const updatedRows = [...rows];
    // updatedRows[index].unit = ingredientData.unit_Min; 
    updatedRows[index].listunit = ingredientData;
    setRows(updatedRows); // Cập nhật lại state rows


  };

  const handleAddRequest = async () => {
    const getUserName = sessionStorage.getItem("userName");
    const staff = (await getStaffByUserName(getUserName)).data.data
    const Data = {
      supplierLink: {
        supplierID: parseInt(getSelectSuppler),
        staffRequestID: staff.staff_ID,
        staffApprovedID: 0,
        staffReceivedID: 0,
        totalPrice: parseInt(totalPrice),
        warehouseID: parseInt(getSelectWareHouse),
        isActive: true,
      },

      supplierDetails: rows.map((row) => {
        if (row?.ingredient != null) {
          return {
            ingredientID: row.ingredient,
            price: row.price,
            quality: row.quantity,
            unit: row.unit,
            isActive: true,
          };
        }
        return null;
      }).filter((item) => item !== null), // Lọc bỏ các giá trị null không hợp lệ
    };

    const add = await AddRequest(Data);
  };

  const confirmApproveSwal = (e) => {
    onClose();
    withReactContent(Swal).fire({
      title: "Do you want to approve this request?",
      showDenyButton: true,
      confirmButtonText: "Change",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddRequest();



        Swal.fire("Successfully", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }

    })
  }


  const calculateTotalPrice = () => {
    const total = rows.reduce((sum, row) => sum + row.quantity * row.price, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    getSupllierActive().then((resdata) => setListSupplier(resdata.data.data));
    getWareHouseActive().then((res) => setListWareHouse(res.data.data));
    getIngredientActive().then((res) => setListIngredient(res.data.data));
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [rows]);

  if (!showModal) return null;

  return (
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <span style={styles.closeButton} onClick={onClose}>
            X
          </span>
          <h2>Add Request Import</h2>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.formGroup}>
            <label>Supplier</label>
            <select required style={styles.select} onChange={(e) => { setSelectedSupplier(e.target.value) }}>
              <option value="">

              </option>
              {listSupplier.map((x) => (
                <option key={x.Supplier_ID} value={x.supplier_ID}>
                  {x.supplier_Name}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>WareHouse</label>
            <select required style={styles.select} onChange={(e) => { setSelectedWareHouse(e.target.value) }}>
              <option value="">


              </option>
              {listWareHouse.map((x) => (
                <option key={x.wareHouse_ID} value={x.wareHouse_ID}>
                  {x.wareHouse_Name}

                </option>
              ))}
            </select>
          </div>
          <div style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", width: "70%" }}>
            <label>Total Price (VND)</label>
            <input readOnly value={totalPrice} style={styles.input} />
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        required
                        value={row.ingredient}
                        onChange={(e) => {
                          updateRow(index, "ingredient", e.target.value);
                          getIngreId(e.target.value, index); // Gọi lại getIngreId khi chọn ingredient
                        }}
                        style={styles.select}
                      >
                        <option value=""></option>
                        {listIngredient.map((i) => (
                          <option key={i.ingredient_ID} value={i.ingredient_ID}>
                            {i.ingredient_Name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select required value={row.unit} onChange={(e) => updateRow(index, "unit", e.target.value)} style={styles.select}>
                        <option value=""></option>
                        {/* {getIngredient && ( */}
                        <>
                          <option value={0}>{rows[index]?.listunit?.unit_Min}</option>
                          <option value={1}>{rows[index]?.listunit?.unit_Transfer}</option>
                          <option value={2}>{rows[index]?.listunit?.unit_Max}</option>
                        </>
                        )
                        {/* } */}
                      </select>
                    </td>
                    <td>
                      <input
                        required
                        type="number"
                        value={row.quantity}
                        placeholder="Enter quantity"
                        onChange={(e) => updateRow(index, "quantity", e.target.value)}
                        style={styles.input}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.price}
                        required
                        placeholder="Enter price"
                        onChange={(e) => updateRow(index, "price", e.target.value)}
                        style={styles.input}
                      />
                    </td>
                    <td>
                      <button onClick={() => removeRow(index)} style={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button style={styles.addRecordButton} onClick={addRow}>
              + Add Record
            </button>
          </div>
        </div>
        <div style={styles.modalFooter}>
          <button onClick={() => confirmApproveSwal()} style={styles.saveButton}>
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles in JS (same as before)

// Styles in JS
const styles = {
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color to make the modal appear centered
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '1000px', // Modal width
    maxWidth: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto', // Scrollbar for overflow content
    maxHeight: '80vh', // Maximum height of the modal
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  closeButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '16px',
  },
  modalBody: {
    marginTop: '20px',
    maxHeight: '60vh', // Allow scrolling if content is too long
    overflowY: 'auto', // Enable vertical scrolling
  },
  formGroup: {
    marginBottom: '15px',
  },
  formGroupLabel: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  tableContainer: {
    position: 'relative',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  addRecordButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    position: 'absolute',
    right: '0',
    top: '-40px',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default FormModal;
