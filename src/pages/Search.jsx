import { useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState([{ departure_id: '', arrival_id: '', date: '' }]);

  const search = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('https://finalflightmixerback.onrender.com', {
      travel_class: 'ECONOMY',
      adults: 1,
      legs: query
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setResults(res.data.data?.itineraries || []);
  };

  return (
    <div>
      <h1>Search Flights</h1>
      {query.map((leg, idx) => (
        <div key={idx}>
          <input placeholder="From" value={leg.departure_id} onChange={e => {
            const q = [...query];
            q[idx].departure_id = e.target.value;
            setQuery(q);
          }} />
          <input placeholder="To" value={leg.arrival_id} onChange={e => {
            const q = [...query];
            q[idx].arrival_id = e.target.value;
            setQuery(q);
          }} />
          <input type="date" value={leg.date} onChange={e => {
            const q = [...query];
            q[idx].date = e.target.value;
            setQuery(q);
          }} />
        </div>
      ))}
      <button onClick={() => setQuery([...query, { departure_id: '', arrival_id: '', date: '' }])}>Add Leg</button>
      <button onClick={search}>Search</button>
      <div>
        {results.map((r, i) => (
          <div key={i}>
            <p>--- Itinerary {i + 1} ---</p>
            {r.legs.map((leg, j) => (
              <p key={j}>{leg.departure} → {leg.arrival} on {new Date(leg.departure_time).toLocaleString()}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
