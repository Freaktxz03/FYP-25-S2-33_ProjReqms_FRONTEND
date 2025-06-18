// src/context/SessionContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🟡 Add this

  // Check session on load
  useEffect(() => {
  axios.get('http://localhost:5000/api/users/session', { withCredentials: true })
    .then(res => {
      console.log('✅ Session loaded from server:', res.data);  // ✅ Debug here
      setUser(res.data);
    })
    .catch((err) => {
      console.log('❌ Failed to load session:', err);  // ❌ Debug error
      setUser(null);
    })
    .finally(() => setLoading(false));
}, []);

  useEffect(() => {
  console.log('✅ Session loaded from server: ', user);
}, [user]);

  if (loading) return null; // ⛔ Prevent app rendering until session is known

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};
