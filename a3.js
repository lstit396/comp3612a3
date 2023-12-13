const path = require("path");

const express = require("express");
const provider = require("./provider.js");
const handlers = require("./handlers.js");

const app = express();

const options = {
    root: path.join(__dirname, "static/")
}

// /api/paintings - Returns JSON for all paintings
handlers.handleAllPaintings(provider,app);
// /api/painting/id - Returns JSON for the single painting whose id
//                    matches the provided id.
handlers.handleSinglePainting(provider,app);
// /api/painting/gallery/id - Returns JSON for the paintings whose gallery id
//                            matches the provided gallery id.
handlers.handleGalleryID(provider,app);
// /api/painting/artist/id - Returns JSON for the paintings whose artist id
//                           matches the provided artist id.
handlers.handleArtistID(provider,app);
// /api/painting/year/min/max - Returns all paintings whose yearOfWork field
//                              is between the two supplied values.
handlers.handleYearRange(provider,app);
// /api/painting/title/text - Returns JSON for the paintings whose title
//                            contains (somewhere) the provided text. This
//                            search should be case insensitive.
handlers.handleTitleSearch(provider,app);
// /api/painting/color/name - Returns JSON for the paintings that have a
//                            color that matches the provided hex value. Each
//                            painting has a dominantColors array with the
//                            six most common colors in the painting; each of
//                            these color values comes with a property named
//                            name that contains the name for that color.
//                            This should be case-insensitive.
handlers.handleColorSearch(provider,app);
// /api/artists - Returns JSON for all artists
handlers.handleArtists(provider,app);
// /api/artists/country - Returns JSON for all artists from the specified
//                        country. This should be case insensitive.
handlers.handleArtistCountrySearch(provider,app);
// /api/galleries - Returns JSON for all galleries
handlers.handleGalleries(provider,app);
// /api/galleries/country - Returns JSON for all galleries from the specified
//                          country. This should be case insensitive.
handlers.handleGalleryCountrySearch(provider,app);

app.listen(8080, () => { console.log("Connected to port 8080.") });

