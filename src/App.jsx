import React, { useEffect, useState } from "react";
import "./App.css";
import { SiFirebase } from "react-icons/si";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MdOutlineContentCopy } from "react-icons/md";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [flag, setFlag] = useState(false);
const [copied,setCopied]=useState('');
  const copyUrl = () => {
    navigator.clipboard.writeText(downloadLink);
    setCopied("Url copied!")
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setDownloadLink(null); // Reset download link when a new file is selected
  };
  const handleUploadClick = async () => {
    if(selectedFile){
      setFlag(true);
    }
    if (selectedFile) {
      const storageRef = ref(storage, "files/");

      try {
        // Upload the file
        const snapshot = await uploadBytes(storageRef, selectedFile);

        // Get the download URL
        const url = await getDownloadURL(snapshot.ref);

        // Set the download link state
        setDownloadLink(url);
        setSelectedFile(null);
        console.log("File uploaded successfully!", url);
        setFlag(false);
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    } else {
      console.log("No file selected");
    }
  };

  useEffect(()=>{
    setTimeout(()=>{
      setCopied('')
    },3000)
  })

  return (
    <>
      <div className="heading">
        <h1 >Create URLs</h1>
  
        <p>
          <SiFirebase className="" size={30} color="#fbbf24" />
        </p>
      </div>

      <div className="card">
        <div style={{ display: "flex",flexDirection:'column',alignItems: "center" }}>
          
          <input type="file" onChange={handleFileChange} name="file" id="file" className="inputfile" />
<label for="file">{selectedFile? <p>{selectedFile.name}</p>: <p> Choose a file</p> }</label>
          {flag ? (
            <button style={{display: 'flex',
              justifyContent: 'center',
              alignItems: "center",}}>
              <div className="custom-loader"></div>
            </button>
          ) : (
            <button onClick={handleUploadClick}>Upload</button>
          )}
        </div>

        {downloadLink && (
          <div style={{ width: "" }}>
            <p id="btnDownload" onClick={copyUrl}>
              Copy link
            </p>
            <p>{copied}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
