import React, { useState } from "react";
import Comments from "./Comments";
import RatingForm from "./RatingForm";

function Listings({ name, address, description, website, phone, comments }) {
    const [showComments, toggleShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    let commentCards = comments.map((comment) => {
        return (
            <Comments 
            // userid={comment.user_id}
            text={comment.text}
            />
        )
    })

    function handleShowComments() {
        toggleShowComments(showComments => !showComments);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(commentText);
    }

    return (
        <div className='listingcard'>
            <h3>{name}</h3>
            <h5>{address}</h5>
            <p>{description}</p>
            <div className='listingcontact'>
                <a href={"http://" + website}>website</a>
                <p>|</p>
                <h6>{phone}</h6>
            </div>
            {/* <RatingForm /> */}
            <h4 onClick={handleShowComments}>{comments.length} comments</h4>
            {/* {comments.length > 0 ? <h4 onClick={handleShowComments}>{comments.length} comments</h4> : null} */}
            {/* {commentCards} */}
            <div style={{ display: showComments ? "block" : "none"}}>
                {commentCards}
                <div className='postcommentform'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="commenttext" onChange={(e) => setCommentText(e.target.value)} />
                        <button type="submit">post comment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Listings;