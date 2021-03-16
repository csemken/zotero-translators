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
	"lastUpdated": "2021-03-16 15:16:39"
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
	if (url.includes('/read')) {
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
	scrape(doc, url);
}

function scrape(doc, url) {
	var item = new Zotero.Item(detectWeb(doc, url));

	// All meta information is contained in "article header"
	// Title is h1
	item.title = doc.querySelector('article header h1').textContent;
	
	// Original link is href with id reader.external-link.view-original
	item.url = doc.querySelector('article header a').href;
	
	// Below the the h1 there is a div which starts with the word "By",
	// followed by the author information (variable no. of divs) and, 
	// finally, the length of the read
	var metaDivs = doc.querySelector('article header div').children;
	var authors, publisher;
	if (metaDivs.length == 4) {
		// 1. If there are 4 divs in, then the second is the (list of)
		//    author name(s) and the third is the publisher
		authors = metaDivs[1].textContent;
		publisher = metaDivs[2].textContent;
	} else if (metaDivs.length == 3) {
		// 2. If there are only 3 divs in, the second is the publisher 
		authors = null;
		publisher = metaDivs[1].textContent;
	} else {
		throw 'Unexpected number of divs in article header';
	}
	
	var author;
	if (authors) {
		// split authors on "," and "and"
		for (var raw_author of authors.split(/,\s|\sand\s/)) {
			// clean and append author
			author = Zotero.Utilities.cleanAuthor(raw_author, 'Author')
			item.creators.push(author);
		}
	} 
	
	item.publicationTitle = publisher;
	
	item.attachments = [
		{
			url: item.url,
			title: "Original Link",
			mimeType: "text/html",
			snapshot: true,
		},
		{
			url: url,
			title: "Pocket Link",
			mimeType: "text/html",
			snapshot: true,
		},
	];
	
	item.complete();
}

