import { InferenceClient } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@4.6.1/+esm';
import { createRepo, commit, deleteRepo, listFiles } from 'https://cdn.jsdelivr.net/npm/@huggingface/hub@2.4.1/+esm';


const HF_TOKEN ="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";
// Example usage
const client = new InferenceClient(HF_TOKEN);
console.log("Hugging Face client initialized");

let selectedSource = null;
function showNYTOptions() {
        selectedSource = 'nyt';
        console.log(selectedSource);
        document.getElementById('filterContent').innerHTML = `
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

async function searchNews() {
    const query = document.getElementById('searchInput').value.trim();
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    if (!query) return;

    try {
        // If NYT is selected
        if (selectedSource === 'nyt') {
            console.log("Hello nyt");
            const fromDate = document.getElementById('nytFromDate')?.value;
            const toDate = document.getElementById('nytToDate')?.value;

            let nytUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&sort=best&api-key=ZtHh7l6hPlAyPAqfqinDMvLriAOTsuRO`;

            if (fromDate) nytUrl += `&begin_date=${fromDate.replace(/-/g, '')}`;
            if (toDate) nytUrl += `&end_date=${toDate.replace(/-/g, '')}`;

            const response = await fetch(nytUrl);
            const data = await response.json();
            const articles = data.response.docs.slice(0, 10);

            articles.forEach(article => {
                const title = article.headline.main;
                const content = article.abstract || article.lead_paragraph || 'No preview available';

                const card = document.createElement('div');
                card.className = 'col-md-6';
                card.innerHTML = `
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title"><strong>NYT:</strong> ${title}</h5>
                            <p class="card-text">${content}</p>
                            <button class="btn btn-outline-primary" onclick="showSummary('${escapeQuotes(title)}', '${escapeQuotes(content)}')">Summarize</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });

        // If Other Resources is selected
        } 
        //other api search
       // both api search

    } catch (error) {
        console.error('Error fetching news:', error);
        container.innerHTML = `<p class="text-danger">Failed to fetch news. Please try again later.</p>`;
    }
}


//escapeQuotes function
function escapeQuotes(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
  }
//show summary function


async function showSummary(title, content) {
const out = await client.chatCompletion({
  model: "meta-llama/Llama-3.1-8B-Instruct",
  messages: [
    {
      role: "user",
      content: `Here is a news headline and its description. Please summarize or elaborate it in a clear and informative way for readers.

Headline: ${title}
Description: ${content}`
    }
  ],
  max_tokens: 512
});

console.log(out.choices[0].message.content);
   const summary = out.choices[0].message.content
 
    document.getElementById('summaryModalLabel').textContent = title;
   document.getElementById('summaryContent').textContent = summary;
 
   const modal = new bootstrap.Modal(document.getElementById('summaryModal'));
   modal.show();
 }



window.showNYTOptions = showNYTOptions;
window.searchNews = searchNews;
window.showSummary = showSummary;
window.escapeQuotes = escapeQuotes;