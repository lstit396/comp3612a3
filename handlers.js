const prov = require("./provider.js");

const handleSinglePainting = (provider,app) => {
    app.get("/api/painting/:id", (req,resp) => {
	const p = prov.getPaintings();
	const findPainting = p.find(item => item.paintingID == req.params.id);
	if (!findPainting) {
	    resp.json("The request for painting " + req.params.id + " did not locate any data.");
	} else {
	    resp.json(findPainting);
	}
    });
};

const handleAllPaintings = (provider,app) => {
    app.get("/api/paintings", (req,resp) => {
	resp.json(prov.getPaintings());
    });
};

const handleGalleryID = (provider,app) => {
    app.get("/api/painting/gallery/:id", (req,resp) => {
	const g = prov.getGalleries();
	const GalleryData = g.filter(item => item.GalleryID == req.params.id);
	if (GalleryData.length == 0) {
	    resp.json("The request for gallery " + req.params.id + " did not locate any data.");
	} else {
	    resp.json(GalleryData);
	}
    });
};

const handleArtistID = (provider,app) => {
    app.get("/api/painting/artist/:id", (req,resp) => {
	const a = prov.getArtists()
	const ArtistData = a.filter(item => item.ArtistID == req.params.id);
	if (ArtistData.length == 0) {
	    resp.json("The request for artist " + req.params.id + " did not locate any data.");
	} else {
	    resp.json(ArtistData);
	}
    });
};

const handleYearRange = (provider,app) => {
    app.get("/api/painting/year/:min/:max", (req,resp) => {
	const p = prov.getPaintings();
	if (req.params.min > req.params.max) {
	    resp.json("Minimum year greater than maximum year!");
	} else {
	    const lowerSet = p.filter(item => (item.yearOfWork >= req.params.min));
	    const upperSet = lowerSet.filter(item => (item.yearOfWork <= req.params.max));
	    if (upperSet.length == 0) {
		resp.json("No paintings were found between " + req.params.min + " and " + req.params.max + ".");
	    } else {
		resp.json(upperSet);
	    }
	}
    });
};

const handleTitleSearch = (provider,app) => {
    app.get("/api/painting/title/:text", (req,resp) => {
	const p = prov.getPaintings();
	const Titles = p.filter(item => item.title.toLowerCase().includes(req.params.text.toLowerCase()));
	if (!Titles == 0) {
	    resp.json("No matching titles found.");
	} else {
	    resp.json(Titles);
	}
    });
};

const handleColorSearch = (provider,app) => {
// /api/painting/color/name - Returns JSON for the paintings that have a
//                            color that matches the provided hex value. Each
//                            painting has a dominantColors array with the
//                            six most common colors in the painting; each of
//                            these color values comes with a property named
//                            name that contains the name for that color.
//                            This should be case-insensitive.    
    app.get("/api/painting/color/:name", (req,resp) => {
	const p = prov.getPaintings();
	const result = [];
	
	for (const item of p) {
	    for(cols=0;cols<item.details.annotation.dominantColors.length;cols++) {
		const dc = item.details.annotation.dominantColors[cols].web;
		if (dc.toLowerCase().includes(req.params.name.toLowerCase())) {
		    result.push(item);
		}
	    }
	}
	if (result.length == 0) {
	    resp.json("No matching colors found.");
	} else {
	    resp.json(result);
	}
    })
};
    
const handleArtists = (provider,app) => {
    app.get("/api/artists", (req,resp) => {
	resp.json(prov.getArtists());
    });
};

const handleArtistCountrySearch = (provider,app) => {
    app.get("/api/artists/:country", (req,resp) => {
	const a = prov.getArtists();
	const ArtistCountries = a.filter(item => item.Nationality.toLowerCase() == req.params.country.toLowerCase());
	if (ArtistCountries.length == 0) {
	    resp.json("No artists from " + req.params.country + " found.");
	} else {
	    resp.json(ArtistCountries);
	}
    });
};

const handleGalleries = (provider,app) => {
    app.get("/api/galleries", (req,resp) => {
	resp.json(prov.getGalleries());
    });
};
const handleGalleryCountrySearch = (provider,app) => {
    app.get("/api/galleries/:country", (req,resp) => {
	const g = prov.getGalleries();
	const GalleryCountries = g.filter(item => item.GalleryCountry.toLowerCase() == req.params.country.toLowerCase());
	if (GalleryCountries.length == 0) {
	    resp.json("No galleries in " + req.params.country + " found.");
	} else {
	    resp.json(GalleryCountries);
	}
    });
};

module.exports = { handleAllPaintings, handleSinglePainting, handleGalleryID, handleArtistID, handleYearRange, handleTitleSearch, handleColorSearch, handleArtists, handleArtistCountrySearch, handleGalleries, handleGalleryCountrySearch };
