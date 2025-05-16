import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("✅ Register component loaded");
  }, []);

  const handleRegister = async () => {
    console.log("🔁 Submitting form:", form);
    try {
      const response = await axios.post('https://finalflightmixerback.onrender.com/auth/register', {
        ...form,
        is_paid: true
      });
      console.log("✅ Registration successful:", response.data);
      setSuccess('Registered successfully. You can now log in.');
      setError('');
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      setError('Registration failed. Try a different username.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        placeholder="Username"
        value={form.username}
        onChange={e => {
          console.log("📝 Username typed:", e.target.value);
          setForm({ ...form, username: e.target.value });
        }}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => {
          console.log("🔒 Password typed");
          setForm({ ...form, password: e.target.value });
        }}
      /><br />
      <button onClick={handleRegister}>Register</button>
      <p style={{ color: 'green' }}>{success}</p>
      <p style={{ color: 'red' }}>{error}</p>
      <p><a href="/">Login</a></p>
    </div>
  );
}
