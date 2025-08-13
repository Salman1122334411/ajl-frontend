import React, { createContext, useState, useContext } from "react";
export const AdminContext = createContext();

const adminAccounts = [
  { email: "admin@gmail.com", password: "1122admin1122" },
  // Add more admins here if needed
];

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    const found = adminAccounts.some(
      (admin) => admin.email === email && admin.password === password
    );
    setIsAdmin(found);
    return found;
  };

  const logout = async () => {
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
} 