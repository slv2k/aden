import React from "react";
import CommentForm from "./CommentForm";

function Comments({ text }) {
    // TODO: get user's username for each comment
    return (
        <div className='commentcard'>
            {/* <CommentForm /> */}
            {/* <p>{userid}</p> */}
            <p>{text}</p>
        </div>
    )
}

export default Comments;