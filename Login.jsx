import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://your-backend-url.onrender.com/auth/token', new URLSearchParams(form));
      localStorage.setItem('token', res.data.access_token);
      window.location.href = '/search';
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} /><br />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} /><br />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
      <p><a href="/register">Register</a></p>
    </div>
  );
}