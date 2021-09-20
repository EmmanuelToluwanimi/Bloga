import React, { createContext, useContext } from 'react';

const BlogContext = createContext()

export function useBlog(){
    return useContext(BlogContext);
}

export function BlogProvider({children}) {
    

    const value = {
        name: '',
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}
