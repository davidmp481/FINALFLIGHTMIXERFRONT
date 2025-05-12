import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    await axios.post("https://flightmix-backend.onrender.com/auth/token", new URLSearchParams(form));
    setSuccess('Registered. Now you can log in.');
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} /><br />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} /><br />
      <button onClick={handleRegister}>Register</button>
      <p>{success}</p>
      <p><a href="/">Login</a></p>
    </div>
  );
}
