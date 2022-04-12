import React from "react";
import Comments from "./Comments";
import RatingForm from "./RatingForm";

function Listings({ name, address, description, website, phone }) {
    return (
        <div className='listingcard'>
            <h3>{name}</h3>
            <h5>{address}</h5>
            <p>{description}</p>
            <p>{website}</p>
            <p>{phone}</p>

            {/* <RatingForm /> */}
            {/* <Comments /> */}
        </div>
    )
}

export default Listings;


// key={listing.id}
//             name={listing.name}
//             address={listing.address}
//             description={listing.description}
//             website={listing.website}
//             phone={listing.phone}
