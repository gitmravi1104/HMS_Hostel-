import React, { createContext, useEffect, useState } from 'react';

export const HMContextCreater = createContext();

const ContextMain = ({children}) => {

    const [dataCon,setDataCon] = useState(() =>{
        const saved = sessionStorage.getItem('dataCon');
        return saved ? JSON.parse(saved) : {
            hostelerId : ''
        }
    })

    useEffect(()=>{
        sessionStorage.setItem('dataCon',JSON.stringify(dataCon))
    },[dataCon])

  return (
    <div>
        <HMContextCreater.Provider value={{dataCon,setDataCon}}>
            {children}
        </HMContextCreater.Provider>
    </div>
  )
}

export default ContextMain;