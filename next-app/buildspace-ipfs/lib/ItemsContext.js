import React, { useContext, useState } from 'react'

export const ItemsContext = React.createContext({
    items: undefined,
    setItems: async (creating) => null,
})

export const useItems = () => useContext(ItemsContext)

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([])

    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    )
}