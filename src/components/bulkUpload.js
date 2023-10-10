import React, { useState } from 'react';
import { useNavigate  } from 'react-router';

const API_URL = 'http://localhost:5000/';

export default function BulkUpload() {
    const [file, setFile] = useState(null);
    let history = useNavigate();


    const uploadBulkUsers = async (formData) => {
      try {
        const response = await fetch(`${API_URL}/bulk-user`, {
          method: 'POST',
          body: formData,
        });
    
        const data = await response.json();
        return data;
    
      } catch (error) {
        throw new Error(error.message);
      }
    };

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleBulkUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        await uploadBulkUsers(formData).then(()=>{
          history('/read');
      } );
  
      } catch (error) {
        console.error("Error uploading bulk users:", error);
      }
    };

    return (
      <div className="main">
        <h1 title="bulk upload">BULK UPLOAD</h1>

        <div style={{padding: '15px'}}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleBulkUpload}>Upload Users</button>
        </div>
          
    </div>
    )
}
