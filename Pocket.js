{
	"translatorID": "87265908-98bf-4eb3-9295-895ab8e4c8e2",
	"label": "Pocket",
	"creator": "Christoph Semken",
	"target": "^https?://getpocket\\.com",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-03-15 14:12:31"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2021 Christoph Semken

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


function detectWeb(doc, url) {
	// check if on read page
	var pattern = /\/read/i;
	var search = url.search(pattern) != -1;
	if (search) {
		/* 
		Pocket can be used with any type of website, including scientific,
		newspaper and magazine articles. However, looking at their own examples
		and suggestions it is mainly used and intended for magazine articles.
		Alternatively, we could change this to "website" to stay more general.
		*/
		return "magazineArticle";
	}
}

function doWeb(doc, url) {
	var contentType = detectWeb(doc, url);
	if (contentType == "magazineArticle") {
		// All meta information is contained in "article header"
		// Title is h1
		
		// Original link is href with id reader.external-link.view-original
		
		// Add pocket information into Extra
		
		// Below the the h1 there is a div which starts with the word "By",
		// followed by the author information (variable no. of divs) and, 
		// finally, the length of the read
		// 1. If there are 4 divs in, then the second is the (list of)
		//    author name(s) and the third is the website
		// 2. If there are only 3 divs in, the second is the website 
		
		
		// react root container: document.querySelector('#__next')
		// some info in first prop of document.querySelector('.reader')
		function findValueByPrefix(object, prefix) {
		  for (var property in object) {
		    if (object.hasOwnProperty(property) && 
		       property.toString().startsWith(prefix)) {
		       return object[property];
		    }
		  }
		}
		
		props = findValueByPrefix(document.querySelector('.reader'), "__reactProps").children[0].props;
		props
	}
}

/** BEGIN TEST CASES **/
/** END TEST CASES **/
