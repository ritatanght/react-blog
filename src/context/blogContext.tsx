import { createContext, useContext, useState, useEffect } from "react";

const BlogContext = createContext({} as any);

export const BlogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <BlogContext.Provider value={{}}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => useContext(BlogContext);
