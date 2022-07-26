import React, { useContext, useState } from 'react'

export const ItemModuleContext = React.createContext({
    creating: undefined,
    setCreating: async (creating) => null,
})

export const useCreating = () => useContext(ItemModuleContext)

export const ItemModuleProvider = ({ children }) => {
    const [creating, setCreating] = useState(false)

    return (
        <ItemModuleContext.Provider value={{ creating, setCreating }}>
            {children}
        </ItemModuleContext.Provider>
    )
}