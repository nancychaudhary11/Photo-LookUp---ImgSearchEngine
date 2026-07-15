const accessKey = "xWVXv0Mq1P8sufXKGBPK2S9fnqVxunpy8eucQqsJ-UA"; //access key of unsplash
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1; //page 1

async function searchImages() {
    keyword = searchBox.value.trim();
    // Alert if no keyword entered
    if (keyword === "") {
        alert("⚠️ Please enter a search term before searching!");
        return;
    }
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=24`;

    try { //error handling
        const response = await fetch(url);
        // Alert if API fails
        if (!response.ok) {
            alert("❌ Unable to fetch images. Please check your internet connection or try again later.");
            return;
        }
        const data = await response.json();

        // Alert if no results found
        if (data.results.length === 0) {
            alert(`😕 No results found for "${keyword}". Try a different keyword.`);
            showMoreBtn.style.display = "none";
            return;
        }
        if (page === 1) {
            searchResult.innerHTML = " ";
        }
        const results = data.results;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        })
        document.body.classList.add("loading");
        document.body.classList.remove("loading");
        showMoreBtn.style.display = "block";

    } catch (error) {
        alert("⚠️ Something went wrong while searching. Please try again later.");
        console.error(error);
    }
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
