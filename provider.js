const fs = require("fs");
const path = require("path");

const paintingsPath = path.join(__dirname, "data/", "paintings-nested.json");
const paintingsFile = fs.readFileSync(paintingsPath, "utf8");
const paintings = JSON.parse(paintingsFile);

const galleriesPath = path.join(__dirname, "data/", "galleries.json");
const galleriesFile = fs.readFileSync(galleriesPath, "utf8");
const galleries = JSON.parse(galleriesFile);

const artistsPath = path.join(__dirname, "data/", "artists.json");
const artistsFile = fs.readFileSync(artistsPath, "utf8");
const artists = JSON.parse(artistsFile);

function getPaintings() {
    return paintings;
}

function getArtists() {
    return artists;
}

function getGalleries() {
    return galleries;
}

module.exports = {getPaintings,getGalleries,getArtists};

