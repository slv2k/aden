import React from "react";
import CommentForm from "./CommentForm";

function Comments({ id, username, text, handleDelete, currentuser }) {
    // TODO: get user's username for each comment



    // TODO: fix post/delete comments

    function deleteComment(commentID) {
        // console.log("deletecomment START")
        handleDelete(commentID)
        fetch(`/comments/${commentID}`, {
            method: 'DELETE'
        })
        // console.log("deletecomment END")
    }

    return (
        <div className='commentcard'>
            {/* <CommentForm /> */}
            {/* <p>{userid}</p> */}
            {/* <p>{id}</p> */}
            <p className='username'>{username}</p>
            <p>{text}</p>
            {/* <button onClick={() => deleteComment(id)}>delete comment</button> */}
            {currentuser === username ? <button onClick={() => deleteComment(id)}>x</button> : null}
        </div>
    )
}

export default Comments;