import React, { useState } from "react";
import Comments from "./Comments";
import RatingForm from "./RatingForm";

function Listings({ listingid, name, address, description, website, phone, comments, username, loginstate }) {
    const [showComments, toggleShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [commentsArray, setCommentsArray] = useState(comments);
    const [bookmarkedState, setBookmarkedState] = useState(false);


    function onDelete(idToDelete) {
        // console.log("ondelete START")
        const filteredComments = commentsArray.filter(comment => comment.id !== idToDelete)
        setCommentsArray(filteredComments)
        console.log("comments array:", commentsArray)
        // console.log("ondeleteEND")
    }

    function handleBookmark() {
        setBookmarkedState(bookmarkedState => !bookmarkedState)
    }
    
    
    let commentCards = commentsArray.map((comment) => {
        return (
            <Comments 
            // userid={comment.user_id}
            key={comment.id}
            id={comment.id}
            username={comment.username}
            text={comment.text}
            handleDelete={onDelete}
            currentuser={username}
            />
        )
    })

    function handleShowComments() {
        toggleShowComments(showComments => !showComments);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let newComment = {
            user_id: 1,
            listing_id: listingid,
            username: username,
            text: commentText
        }

        setCommentsArray([...commentsArray, newComment])
        // console.log(commentText);
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment)
        })
    };

    return (
        <div className='listingcard'>
            {bookmarkedState ? <img onClick={handleBookmark} src="https://cdn-icons-png.flaticon.com/512/786/786352.png"/> : <img onClick={handleBookmark} src="https://cdn-icons-png.flaticon.com/512/786/786251.png" />}
            <h3>{name}</h3>
            <h5>{address}</h5>
            <p>{description}</p>
            <div className='listingcontact'>
                <a href={"http://" + website}>website</a>
                <p>|</p>
                <h6>{phone}</h6>
            </div>
            {/* <RatingForm /> */}
            <h4 onClick={handleShowComments}>{commentsArray.length} comment{commentsArray.length === 1 ? "" : "s"}</h4>
            {/* {comments.length > 0 ? <h4 onClick={handleShowComments}>{comments.length} comments</h4> : null} */}
            {/* {commentCards} */}
            <div style={{ display: showComments ? "block" : "none"}}>
                {commentCards}
                <div className='postcommentform'>
                    {/* <form onSubmit={handleSubmit}>
                        <input type="text" name="commenttext" onChange={(e) => setCommentText(e.target.value)} />
                        <button type="submit">post comment</button>
                    </form> */}
                    {loginstate ? 
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="commenttext" onChange={(e) => setCommentText(e.target.value)} />
                        <button type="submit">post comment</button>
                    </form>
                    :
                    null
                    }
                </div>
            </div>
        </div>
    )
}

export default Listings;