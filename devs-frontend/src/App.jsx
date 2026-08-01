import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pastes, setPastes] = useState([]);

  const API_URL = "http://localhost:5000/api/pastes";

  const fetchPastes = async () => {
    try {
      const res = await axios.get(API_URL);
      setPastes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPastes();
  }, []);

  const createPaste = async () => {
    try {
      await axios.post(API_URL, {
        title,
        content,
        language: "text",
      });

      alert("Paste created successfully!");

      setTitle("");
      setContent("");

      fetchPastes();
    } catch (error) {
      alert("Error creating paste");
      console.error(error);
    }
  };

  const deletePaste = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchPastes();
  } catch (error) {
    console.error(error);
    alert("Failed to delete paste");
  }
};

  return (
    <div className="container">
      <h1>🚀 DEVS PasteBin</h1>

      <input
        type="text"
        placeholder="Paste Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        rows="8"
        placeholder="Write your code or text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={createPaste}>Create Paste</button>

      <h2>Saved Pastes</h2>

      {pastes.length === 0 ? (
        <p>No pastes found.</p>
      ) : (
        pastes.map((paste) => (
          <div className="paste-card" key={paste._id}>
            <h3>{paste.title}</h3>
            <p>{paste.content}</p>
            <div style={{ marginTop: "10px" }}>
  <small><strong>Language:</strong> {paste.language}</small>

  <br />

  <small>
    <strong>Created:</strong>{" "}
    {new Date(paste.createdAt).toLocaleString()}
  </small>

  <br /><br />

  <button onClick={() => deletePaste(paste._id)}>
    Delete
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;