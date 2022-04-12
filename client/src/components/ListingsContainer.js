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

    return (
        <div>listings container
            <Map />
            <div id='listingscontainer'>
                {listingCards}
            </div>
        </div>
    )
}

export default ListingsContainer;