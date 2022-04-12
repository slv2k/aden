import React from "react";
import Listings from "./Listings";
import Map from "./Map";

function ListingsContainer({ listings }) {

    let listingCards = listings.map((listing) => {
        return (
            <Listings 
            key={listing.id}
            name={listing.name}
            address={listing.address}
            description={listing.description}
            website={listing.website}
            phone={listing.phone}
            />
        )
    })

    // console.log("listing from listingscontainer", listings)

    return (
        <div>listings container shown
            {/* <Map /> */}
            <div id='listingscontainer'>
                {listingCards}
            </div>
        </div>
    )
}

export default ListingsContainer;