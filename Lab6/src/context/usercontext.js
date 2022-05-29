import React from "react";

export const userDataContext = React.createContext({ userData: null, setUserData: () => {} });
export const userDataProvider = userDataContext.Provider;