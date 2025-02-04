// MyContextProvider.js
import React, { createContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Export the context
export { MyContext };

// Export the provider component as default
export default function MyContextProvider({ children }) {
  // Define the state or values you want to share
  const num = 'Heeeeeeeeeeloooooooooo'
  const opt= ['BMW','Mercedes','TESLA','FORD']

  const _ = {
   num,
   opt,
  }

  // Return the provider with the value
  return <MyContext.Provider value={_}>{children}</MyContext.Provider>;
}
