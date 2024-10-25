import { createContext, useState } from "react";

export const PostReviewsContext = createContext();

export const PostReviewsProvider = ({ children }) => {  const [reviewToReload, setReviewToReload] = useState(false);

    return (
        <PostReviewsContext.Provider value={{reviewToReload, setReviewToReload}}>
            {children}
        </PostReviewsContext.Provider>
    )
}