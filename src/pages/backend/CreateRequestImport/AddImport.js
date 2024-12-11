import React, { useState } from 'react';
import FormModal from './AddRequest';


const AddImport = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleAddRecord = () => {
      console.log("Product saved!");
      setShowModal(false);
    };

  return (
    <div className="App">
      <button onClick={handleOpenModal} style={buttonStyle}>Add Product</button>
      <FormModal
        showModal={showModal}
        onClose={handleCloseModal}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
};

const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };
export default AddImport;
