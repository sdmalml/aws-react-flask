import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/diaries');
      setDiaries(response.data);
    } catch (error) {
      console.error('Error fetching diaries', error);
    }
  };

  const handleCreateDiary = async () => {
    try {
      await axios.post('http://localhost:5000/diaries', { title, content });
      setTitle('');
      setContent('');
      fetchDiaries();
    } catch (error) {
      console.error('Error creating diary', error);
    }
  };

  const handleUpdateDiary = async () => {
    try {
      await axios.put(`http://localhost:5000/diaries/${editId}`, { title, content });
      setTitle('');
      setContent('');
      setEditId(null);
      fetchDiaries();
    } catch (error) {
      console.error('Error updating diary', error);
    }
  };

  const handleDeleteDiary = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/diaries/${id}`);
      fetchDiaries();
    } catch (error) {
      console.error('Error deleting diary', error);
    }
  };

  const handleEditDiary = (diary) => {
    setTitle(diary.title);
    setContent(diary.content);
    setEditId(diary.id);
  };

  return (
    <div>
      <h1>Diary App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {editId ? (
          <button onClick={handleUpdateDiary}>Update Diary</button>
        ) : (
          <button onClick={handleCreateDiary}>Create Diary</button>
        )}
      </div>
      <div>
        <h2>Diaries</h2>
        <ul>
          {diaries.map(diary => (
            <li key={diary.id}>
              <h3>{diary.title}</h3>
              <p>{diary.content}</p>
              <button onClick={() => handleEditDiary(diary)}>Edit</button>
              <button onClick={() => handleDeleteDiary(diary.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;