import { createContext, useState } from "react";

const defaultValue = {
    reviewToReload: false,
    setReviewToReload: () => {},
    comments: [], 
    addComment: () => {},  
    deleteComment: () => {}, 
    setComments: () => {}, 
}

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [reviewToReload, setReviewToReload] = useState(false);

    const addComment = (comment) => {
        setComments(prevComments => [...prevComments, comment]);
    };

    const deleteComment = (commentId) => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    };

    return (
        <ReviewsContext.Provider value={{ reviewToReload, setReviewToReload, comments, setComments, addComment, deleteComment }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export default ReviewsContext;

