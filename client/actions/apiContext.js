"use client";
import { useState, useEffect } from "react";
import AuthContext from "./authContext";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");

  const url = "http://localhost:8080/api";


  const storeUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  const storeAdmin = (user) => {
    localStorage.setItem("admin", JSON.stringify(user));
  };

  const removeUser = () => {
    localStorage.removeItem("user");
  };

  const SignUpAdmin = async (data) => {
    const res = await fetch(`${url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setEmail(result?.email);
    return result;
  };

  const loginAdmin = async (data) => {
    const res = await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setUser(result.user);
    if (result.user) {
      storeAdmin(result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  const SignUpUser = async (data) => {
    const res = await fetch(`${url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setEmail(result?.email);
    return result;
  };

  const loginUser = async (data) => {
    const res = await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setUser(result.user);
    storeUser(result.user);
    return result;
  };
  const createLoan = async (data) => {
    const res = await fetch(`${url}/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };
  const updateLoan = async (data) => {
    const res = await fetch(`${url}/update`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };
  const makeRepayment = async (data) => {
    const res = await fetch(`${url}/make-repayment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  const getAllLoans = async () => {
    const res = await fetch(`${url}/all-loans`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };

  const getLoansByUserId = async (userId) => {
    const res = await fetch(`${url}/loans/${userId}`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };
  const getRepaymentsByLoanId = async (loanId) => {
    const res = await fetch(`${url}/repayments/${loanId}`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };

  //   const getSlots = async (data) => {
  //     const res = await fetch(`${url}/user/getslots`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await res.json();
  //     return result;
  //   };
  //   const addData = async (data) => {
  //     const res = await fetch(`${url}/user/add`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await res.json();
  //     return result;
  //   };

  //   const getUsers = async () => {
  //     const res = await fetch(`${url}/admin/registrations`, {
  //       method: "GET",
  //     });
  //     const result = await res.json();
  //     return result;
  //   };
  //   const getRegistration = async (id) => {
  //     const res = await fetch(`${url}/admin/registration/${id}`, {
  //       method: "GET",
  //     });
  //     const result = await res.json();
  //     return result;
  //   };
  //   const deleteRegistration = async (id) => {
  //     const res = await fetch(`${url}/admin/delete/${id}`, {
  //       method: "delete",
  //     });
  //     const result = await res.json();
  //     return result;
  //   };
  //   const editRegistration = async (id, data) => {
  //     const res = await fetch(`${url}/admin/registration/${id}`, {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await res.json();
  //     return result;
  //   };

  return (
    <AuthContext.Provider
      value={{
        user,
        SignUpAdmin,
        loginAdmin,
        logout,
        SignUpUser,
        loginUser,
        createLoan,
        getAllLoans,
        updateLoan,
        getLoansByUserId,
        getRepaymentsByLoanId,
        makeRepayment
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
