let selectedSource = null;
function showNYTOptions() {
  selectedSource = "nyt";
  console.log(selectedSource);
  document.getElementById("filterContent").innerHTML = `
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-calendar-date"></i> From Date</label>
<input type="date" class="form-control" id="nytFromDate" onchange="searchNews()">
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-calendar-date-fill"></i> To Date</label>
                    <input type="date" class="form-control" id="nytToDate" onchange="searchNews()">
                </div>
            </div>
        `;
  searchNews();
}
//other api
function showOtherOptions() {
  selectedSource = "other";
  document.getElementById("filterContent").innerHTML = `
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-calendar-date"></i> From Date</label>
                    <input type="date" class="form-control" id="otherFromDate" onchange="searchNews()">
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-calendar-date-fill"></i> To Date</label>
                    <input type="date" class="form-control" id="otherToDate" onchange="searchNews()">
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-geo-alt"></i> Country</label>
                    <select class="form-select" id="otherCountry" onchange="searchNews()">
                        <option selected disabled>Select a country</option>
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Japan</option>
                        <option>Brazil</option>
                        <option>South Africa</option>
                    </select>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-translate"></i> Language</label>
                    <select class="form-select" id="otherLanguage" onchange="searchNews()">
                        <option selected disabled>Select a language</option>
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                        <option>Portuguese</option>
                        <option>Arabic</option>
                        <option>Russian</option>
                        <option>Chinese</option>
                    </select>
                </div>
            </div>
        `;
  searchNews();
}
async function searchNews() {
  const query = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  if (!query) return;

  try {
    // If NYT is selected
    if (selectedSource === "nyt") {
      console.log("Hello nyt");
      const fromDate = document.getElementById("nytFromDate")?.value;
      const toDate = document.getElementById("nytToDate")?.value;

      let nytUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
        query
      )}&sort=best&api-key=ZtHh7l6hPlAyPAqfqinDMvLriAOTsuRO`;

      if (fromDate) nytUrl += `&begin_date=${fromDate.replace(/-/g, "")}`;
      if (toDate) nytUrl += `&end_date=${toDate.replace(/-/g, "")}`;

      const response = await fetch(nytUrl);
      const data = await response.json();
      const articles = data.response.docs.slice(0, 10);

      articles.forEach((article) => {
        const title = article.headline.main;
        const content =
          article.abstract || article.lead_paragraph || "No preview available";

        const card = document.createElement("div");
        card.className = "col-md-6";
        card.innerHTML = `
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title"><strong>NYT:</strong> ${title}</h5>
                            <p class="card-text">${content}</p>
                            <button class="btn btn-outline-primary" onclick="showSummary('${escapeQuotes(
                              title
                            )}', '${escapeQuotes(content)}')">Summarize</button>
                        </div>
                    </div>
                `;
        container.appendChild(card);
      });

      // If Other Resources is selected
    }
    //other api search
    else if (selectedSource === "other") {
      console.log("Hello other");
      const fromDate = document.getElementById("otherFromDate")?.value;
      const toDate = document.getElementById("otherToDate")?.value;
      const country = document.getElementById("otherCountry")?.value;
      const language = document.getElementById("otherLanguage")?.value;

      let otherUrl = `https://newsdata.io/api/1/latest?apikey=pub_9e246252d0904458b7dab582502a600d&q=${encodeURIComponent(
        query
      )}`;
      if (language !== "Select a language") {
        otherUrl += `&language=${language.toLowerCase()}`;
      } else {
        otherUrl = `https://newsdata.io/api/1/latest?apikey=pub_9e246252d0904458b7dab582502a600d&q=${encodeURIComponent(
          query
        )}&language=en`;
      }
      if (country !== "Select a country") {
        otherUrl += `&country=${country.toLowerCase()}`;
      }
      if (fromDate) {
        otherUrl += `&from_date=${fromDate}`;
        console.log("fromDtaae: " + fromDate);
      }
      if (toDate) {
        otherUrl += `&to_date=${toDate}`;
        console.log("todate" + toDate);
      }

      const response = await fetch(otherUrl);
      const data = await response.json();
      const articles = data.results || [];

      articles.forEach((article) => {
        const title = article.title;
        const content = article.description || "No preview available";

        const card = document.createElement("div");
        card.className = "col-md-6";
        card.innerHTML = `
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title"><strong>Others:</strong> ${title}</h5>
                            <p class="card-text">${content}</p>
                            <button class="btn btn-outline-primary" onclick="showSummary('${escapeQuotes(
                              title
                            )}', '${escapeQuotes(content)}')">Summarize</button>
                        </div>
                    </div>
                `;
        container.appendChild(card);
      });

      // If no source is selected, fetch both
    }
    // both api search
  } catch (error) {
    console.error("Error fetching news:", error);
    container.innerHTML = `<p class="text-danger">Failed to fetch news. Please try again later.</p>`;
  }
}

//escapeQuotes function

//show summary function
