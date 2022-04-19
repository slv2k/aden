import React, { useState } from "react";
import CommentForm from "./CommentForm";

function Comments({ id, username, text, handleDelete, currentuser, loginstate }) {
    // TODO: get user's username for each comment
    const [ display, toggleDisplay ] = useState(true);


    // TODO: fix post/delete comments

    function deleteComment(commentID) {
        // console.log("deletecomment START")
        // fetch(`/comments/${commentID}`, {
        //     method: 'DELETE'
        // })
        // handleDelete(commentID)
        // console.log("deletecomment END")
        toggleDisplay(display => !display);
        handleDelete(commentID)
    }

    return (
        <div className='commentcard' style={{display: display ? "block" : "none"}}>
            {/* <CommentForm /> */}
            {/* <p>{userid}</p> */}
            {/* <p>{id}</p> */}
            <p className='username'>{username}</p>
            <p>{text}</p>
            {/* <button onClick={() => deleteComment(id)}>delete comment</button> */}
            {currentuser === username && loginstate === true ? <button onClick={() => deleteComment(id)}>x</button> : null}
        </div>
    )
}

export default Comments;