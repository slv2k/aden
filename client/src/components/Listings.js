import React, { useState } from "react";
import Comments from "./Comments";
import RatingForm from "./RatingForm";

function Listings({ listingid, name, address, description, website, phone, comments, username, loginstate, onAddBookmark, onDeleteBookmark, detectBookmark }) {
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
        // setBookmarkedState(bookmarkedState => !bookmarkedState)
        console.log("listing id", listingid)

        let listing = {
            id: listingid,
            name: name,
            address: address,
            description: description,
            website: website,
            phone: phone,
            comments: comments,
            username: username,
            loginstate: loginstate,
            onAddBookmark: onAddBookmark,
            onDeleteBookmark: onDeleteBookmark
        }

        if (bookmarkedState === true) {
            console.log("removed from bookmarks")
            setBookmarkedState(false);
            onDeleteBookmark(listing)
        } else if (bookmarkedState === false) {
            console.log("added to bookmarks")
            setBookmarkedState(true);
            onAddBookmark(listing);
        }
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
            loginstate={loginstate}
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

    // if (detectBookmark === true) {
    //     let icon = document.getElementById('bookmarkicon');
    //     icon.style.display = "none";

    //     let commentsbutton = document.getElementById('commentsbutton');
    //     commentsbutton.style.display = "none";
    // }

    // console.log(detectBookmark)

    return (
        <div className='listingcard'>
            {detectBookmark ? null :
            <div>
                {bookmarkedState ? <img id='bookmarkicon' onClick={handleBookmark} src="https://cdn-icons-png.flaticon.com/512/786/786352.png"/> : <img id='bookmarkicon' onClick={handleBookmark} src="https://cdn-icons-png.flaticon.com/512/786/786251.png" />}
            </div>
            }
            <h3>{name}</h3>
            <h5>{address}</h5>
            <p>{description}</p>
            <div className='listingcontact'>
                <a href={"http://" + website}>website</a>
                <p>|</p>
                <h6>{phone}</h6>
            </div>
            {/* <RatingForm /> */}
            {detectBookmark ? null :
            <div>
                <h4 id='commentsbutton' onClick={handleShowComments}>{commentsArray.length} comment{commentsArray.length === 1 ? "" : "s"}</h4>
            </div>
}
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