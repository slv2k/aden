import React from "react";
import Listings from "./Listings";
import Map from "./Map";

function ListingsContainer({ listings, identity, service, location, username, loginstate, onAddBookmark, onDeleteBookmark }) {

    let listingCards = listings.map((listing) => {
        return (
            <Listings 
            key={listing.id}
            listingid={listing.id}
            name={listing.name}
            address={listing.address}
            description={listing.description}
            website={listing.website}
            phone={listing.phone}
            comments={listing.comments}
            username={username}
            loginstate={loginstate}
            onAddBookmark={onAddBookmark}
            onDeleteBookmark={onDeleteBookmark}
            />
        )
    })

    // console.log("listing from listingscontainer", listings)

    return (
        <div id='contentcontainer'>
            <h1>results for <i>{identity}</i> <i>{service}</i> near <i>{location}</i></h1>
            {/* <Map /> */}
            <div id='listingscontainer'>
                {listingCards}
            </div>
        </div>
    )
}

export default ListingsContainer;