import { InferenceClient } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@4.6.1/+esm';
import { createRepo, commit, deleteRepo, listFiles } from 'https://cdn.jsdelivr.net/npm/@huggingface/hub@2.4.1/+esm';


const HF_TOKEN ="";
// Example usage
const client = new InferenceClient(HF_TOKEN);
console.log("Hugging Face client initialized");

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
                    <label class="form-label"><i class="bi bi-geo-alt"></i> Country</label>
                    <select class="form-select" id="otherCountry" onchange="searchNews()">
                        <option selected disabled>Select a country</option>
                        <option value="us">United States</option>
                        <option value="gb">United Kingdom</option>
                        <option value="ae">United Arab Emirates</option>
                        <option value="af">Afghanistan</option>
                        <option value="al">Albania</option>
                        <option value="dz">Algeria</option>
                        <option value="as">American Samoa</option>
                        <option value="ad">Andorra</option>
                        <option value="ao">Angola</option>
                        <option value="ai">Anguilla</option>
                        <option value="aq">Antarctica</option>
                        <option value="ag">Antigua And Barbuda</option>
                        <option value="ar">Argentina</option>
                        <option value="am">Armenia</option>
                        <option value="aw">Aruba</option>
                        <option value="au">Australia</option>
                        <option value="at">Austria</option>
                        <option value="az">Azerbaijan</option>
                        <option value="bs">Bahamas</option>
                        <option value="bh">Bahrain</option>
                        <option value="bd">Bangladesh</option>
                        <option value="bb">Barbados</option>
                        <option value="by">Belarus</option>
                        <option value="be">Belgium</option>
                        <option value="bz">Belize</option>
                        <option value="bj">Benin</option>
                        <option value="bm">Bermuda</option>
                        <option value="bt">Bhutan</option>
                        <option value="bo">Bolivia</option>
                        <option value="ba">Bosnia And Herzegovina</option>
                        <option value="bw">Botswana</option>
                        <option value="bv">Bouvet Island</option>
                        <option value="br">Brazil</option>
                        <option value="io">British Indian Ocean Territory</option>
                        <option value="bn">Brunei Darussalam</option>
                        <option value="bg">Bulgaria</option>
                        <option value="bn">Brunei</option>
                        <option value="bf">Burkina Fasco</option>
                        <option value="bi">Burundi</option>
                        <option value="kh">Cambodia</option>
                        <option value="cm">Cameroon</option>
                        <option value="ca">Canada</option>
                        <option value="cv">Cape Verde</option>
                        <option value="ky">Cayman Islands</option>
                        <option value="cf">Central African Republic</option>
                        <option value="td">Chad</option>
                        <option value="cl">Chile</option>
                        <option value="cn">China</option>
                        <option value="cx">Christmas Island</option>
                        <option value="co">Colombia</option>
                        <option value="km">Comoros</option>
                        <option value="cg">Congo</option>
                        <option value="cd">Congo, The Democratic Republic Of The</option>
                        <option value="ck">Cook Islands</option>
                        <option value="cr">Costa Rica</option>
                        <option value="cd">Dr Congo</option>
                        <option value="ci">Cote D Ivoire</option>
                        <option value="ci">Ivory Coast</option>
                        <option value="hr">Croatia</option>
                        <option value="je">Jersey</option>
                        <option value="cu">Cuba</option>
                        <option value="cy">Cyprus</option>
                        <option value="cw">Curaçao</option>
                        <option value="cz">Czech Republic</option>
                        <option value="dk">Denmark</option>
                        <option value="dj">Djibouti</option>
                        <option value="dm">Dominica</option>
                        <option value="do">Dominican Republic</option>
                        <option value="tp">East Timor</option>
                        <option value="ec">Ecuador</option>
                        <option value="eg">Egypt</option>
                        <option value="sv">El Salvador</option>
                        <option value="gq">Equatorial Guinea</option>
                        <option value="er">Eritrea</option>
                        <option value="ee">Estonia</option>
                        <option value="et">Ethiopia</option>
                        <option value="fk">Falk</option>
                        <option value="fo">Faroe Islands</option>
                        <option value="fj">Fiji</option>
                        <option value="fi">Finland</option>
                        <option value="fr">France</option>
                        <option value="gf">French Guiana</option>
                        <option value="pf">French Polynesia</option>
                        <option value="tf">French Southern Territories</option>
                        <option value="ga">Gabon</option>
                        <option value="gm">Gambia</option>
                        <option value="ge">Georgia</option>
                        <option value="de">Germany</option>
                        <option value="gh">Ghana</option>
                        <option value="gi">Gibraltar</option>
                        <option value="gr">Greece</option>
                        <option value="gl">Greenland</option>
                        <option value="gd">Grenada</option>
                        <option value="gp">Guadeloupe</option>
                        <option value="gu">Guam</option>
                        <option value="gt">Guatemala</option>
                        <option value="gn">Guinea</option>
                        <option value="gw">Guinea-Bissau</option>
                        <option value="gy">Guyana</option>
                        <option value="ht">Haiti</option>
                        <option value="hm">Heard Island And Mcdonald Islands</option>
                        <option value="va">Holy</option>
                        <option value="va">Vatican</option>
                        <option value="hn">Honduras</option>
                        <option value="tl">Timor</option>
                        <option value="hk">Hong Kong</option>
                        <option value="hu">Hungary</option>
                        <option value="is">Iceland</option>
                        <option value="in">India</option>
                        <option value="id">Indonesia</option>
                        <option value="ir">Iran, Islamic Republic Of</option>
                        <option value="iq">Iraq</option>
                        <option value="ir">Iran</option>
                        <option value="ie">Ireland</option>
                        <option value="il">Israel</option>
                        <option value="it">Italy</option>
                        <option value="jm">Jamaica</option>
                        <option value="jp">Japan</option>
                        <option value="jo">Jordan</option>
                        <option value="kz">Kazakhstan</option>
                        <option value="ke">Kenya</option>
                        <option value="ki">Kiribati</option>
                        <option value="xk">Kosovo</option>
                        <option value="kp">Korea Democratic Peoples Republic Of</option>
                        <option value="kr">Korea Republic Of</option>
                        <option value="kw">Kuwait</option>
                        <option value="kp">North Korea</option>
                        <option value="kr">South Korea</option>
                        <option value="kg">Kyrgyzstan</option>
                        <option value="la">Lao Peoples Democratic Republic</option>
                        <option value="lv">Latvia</option>
                        <option value="la">Laos</option>
                        <option value="lb">Lebanon</option>
                        <option value="ls">Lesotho</option>
                        <option value="lr">Liberia</option>
                        <option value="ly">Libyan Arab Jamahiriya</option>
                        <option value="li">Liechtenstein</option>
                        <option value="ly">Libya</option>
                        <option value="lt">Lithuania</option>
                        <option value="lu">Luxembourg</option>
                        <option value="mo">Macau</option>
                        <option value="mk">Macedonia, The Former Yugoslav Republic Of</option>
                        <option value="mg">Madagascar</option>
                        <option value="mk">Macedonia</option>
                        <option value="mw">Malawi</option>
                        <option value="my">Malaysia</option>
                        <option value="mv">Maldives</option>
                        <option value="ml">Mali</option>
                        <option value="mt">Malta</option>
                        <option value="mh">Marshall Islands</option>
                        <option value="mq">Martinique</option>
                        <option value="mr">Mauritania</option>
                        <option value="mu">Mauritius</option>
                        <option value="yt">Mayotte</option>
                        <option value="mx">Mexico</option>
                        <option value="fm">Micronesia, Federated States Of</option>
                        <option value="md">Moldova, Republic Of</option>
                        <option value="mc">Monaco</option>
                        <option value="md">Moldova</option>
                        <option value="fm">Micronesia</option>
                        <option value="mn">Mongolia</option>
                        <option value="ms">Montserrat</option>
                        <option value="ma">Morocco</option>
                        <option value="mz">Mozambique</option>
                        <option value="mm">Myanmar</option>
                        <option value="me">Montenegro</option>
                        <option value="na">Namibia</option>
                        <option value="nr">Nauru</option>
                        <option value="np">Nepal</option>
                        <option value="nl">Netherland</option>
                        <option value="an">Netherlands Antilles</option>
                        <option value="nc">New Caledonia</option>
                        <option value="nz">New Zealand</option>
                        <option value="ni">Nicaragua</option>
                        <option value="ne">Niger</option>
                        <option value="ng">Nigeria</option>
                        <option value="nu">Niue</option>
                        <option value="nf">Norfolk Island</option>
                        <option value="mp">Northern Mariana Islands</option>
                        <option value="no">Norway</option>
                        <option value="om">Oman</option>
                        <option value="pk">Pakistan</option>
                        <option value="pw">Palau</option>
                        <option value="ps">Palestinian Territory, Occupied</option>
                        <option value="pa">Panama</option>
                        <option value="ps">Palestine</option>
                        <option value="pg">Papua New Guinea</option>
                        <option value="py">Paraguay</option>
                        <option value="pe">Peru</option>
                        <option value="ph">Philippines</option>
                        <option value="pn">Pitcairn</option>
                        <option value="pl">Poland</option>
                        <option value="pt">Portugal</option>
                        <option value="pr">Puerto Rico</option>
                        <option value="qa">Qatar</option>
                        <option value="re">Reunion</option>
                        <option value="ro">Romania</option>
                        <option value="ru">Russian Federation</option>
                        <option value="rw">Rwanda</option>
                        <option value="ru">Russia</option>
                        <option value="sh">Saint Helena</option>
                        <option value="kn">Saint Kitts And Nevis</option>
                        <option value="lc">Saint Lucia</option>
                        <option value="pm">Saint Pierre And Miquelon</option>
                        <option value="vc">Saint Vincent And The Grenadines</option>
                        <option value="ws">Samoa</option>
                        <option value="sm">San Marino</option>
                        <option value="st">Sao Tome And Principe</option>
                        <option value="sa">Saudi Arabia</option>
                        <option value="sn">Senegal</option>
                        <option value="sc">Seychelles</option>
                        <option value="sl">Sierra Leone</option>
                        <option value="sg">Singapore</option>
                        <option value="sk">Slovakia</option>
                        <option value="si">Slovenia</option>
                        <option value="sb">Solomon Islands</option>
                        <option value="so">Somalia</option>
                        <option value="za">South Africa</option>
                        <option value="gs">South Georgia And The South Sandwich Islands</option>
                        <option value="es">Spain</option>
                        <option value="lk">Sri Lanka</option>
                        <option value="sd">Sudan</option>
                        <option value="sr">Suriname</option>
                        <option value="sj">Svalbard And Jan Mayen</option>
                        <option value="sz">Swaziland</option>
                        <option value="sz">Eswatini</option>
                        <option value="se">Sweden</option>
                        <option value="ch">Switzerland</option>
                        <option value="sy">Syrian Arab Republic</option>
                        <option value="sy">Syria</option>
                        <option value="tw">Taiwan, Province Of China</option>
                        <option value="tj">Tajikistan</option>
                        <option value="tz">Tanzania, United Republic Of</option>
                        <option value="tz">Tanzania</option>
                        <option value="th">Thailand</option>
                        <option value="tg">Togo</option>
                        <option value="tk">Tokelau</option>
                        <option value="to">Tonga</option>
                        <option value="tw">Taiwan</option>
                        <option value="tt">Trinidad And Tobago</option>
                        <option value="tn">Tunisia</option>
                        <option value="tr">Turkey</option>
                        <option value="tm">Turkmenistan</option>
                        <option value="tc">Turks And Caicos Islands</option>
                        <option value="tv">Tuvalu</option>
                        <option value="ug">Uganda</option>
                        <option value="ua">Ukraine</option>
                        <option value="us">United States Of America</option>
                        <option value="uy">Uruguay</option>
                        <option value="uz">Uzbekistan</option>
                        <option value="vu">Vanuatu</option>
                        <option value="ve">Venezuela</option>
                        <option value="vn">Vietnam</option>
                        <option value="vg">Virgin Islands, British</option>
                        <option value="vg">Virgin Islands (British)</option>
                        <option value="vi">Virgin Islands, U.S.</option>
                        <option value="wf">Wallis And Futuna</option>
                        <option value="eh">Western Sahara</option>
                        <option value="ye">Yemen</option>
                        <option value="yu">Yugoslavia</option>
                        <option value="zm">Zambia</option>
                        <option value="zw">Zimbabwe</option>
                        <option value="rs">Serbia</option>
                        <option value="sx">Saint Martin(Dutch)</option>
                        <option value="wo">World</option>
                    </select>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label"><i class="bi bi-translate"></i> Language</label>
                    <select class="form-select" id="languageSelector" onchange="searchNews()">
                        <option selected disabled>Select a language</option>
                        <option value="af">Afrikaans</option>
                        <option value="sq">Albanian</option>
                        <option value="am">Amharic</option>
                        <option value="ar">Arabic</option>
                        <option value="hy">Armenian</option>
                        <option value="as">Assamese</option>
                        <option value="az">Azerbaijani</option>
                        <option value="bm">Bambara</option>
                        <option value="eu">Basque</option>
                        <option value="be">Belarusian</option>
                        <option value="bn">Bengali</option>
                        <option value="bs">Bosnian</option>
                        <option value="bg">Bulgarian</option>
                        <option value="my">Burmese</option>
                        <option value="ca">Catalan</option>
                        <option value="ckb">Central Kurdish</option>
                        <option value="zh">Chinese</option>
                        <option value="hr">Croatian</option>
                        <option value="cs">Czech</option>
                        <option value="da">Danish</option>
                        <option value="nl">Dutch</option>
                        <option value="en">English</option>
                        <option value="et">Estonian</option>
                        <option value="pi">Filipino</option>
                        <option value="fi">Finnish</option>
                        <option value="fr">French</option>
                        <option value="gl">Galician</option>
                        <option value="ka">Georgian</option>
                        <option value="de">German</option>
                        <option value="el">Greek</option>
                        <option value="gu">Gujarati</option>
                        <option value="ha">Hausa</option>
                        <option value="he">Hebrew</option>
                        <option value="hi">Hindi</option>
                        <option value="hu">Hungarian</option>
                        <option value="is">Icelandic</option>
                        <option value="id">Indonesian</option>
                        <option value="it">Italian</option>
                        <option value="jp">Japanese</option>
                        <option value="kn">Kannada</option>
                        <option value="kz">Kazakh</option>
                        <option value="kh">Khmer</option>
                        <option value="rw">Kinyarwanda</option>
                        <option value="ko">Korean</option>
                        <option value="ku">Kurdish</option>
                        <option value="lv">Latvian</option>
                        <option value="lt">Lithuanian</option>
                        <option value="lb">Luxembourgish</option>
                        <option value="mk">Macedonian</option>
                        <option value="ms">Malay</option>
                        <option value="ml">Malayalam</option>
                        <option value="mt">Maltese</option>
                        <option value="mi">Maori</option>
                        <option value="mr">Marathi</option>
                        <option value="mn">Mongolian</option>
                        <option value="ne">Nepali</option>
                        <option value="no">Norwegian</option>
                        <option value="or">Oriya</option>
                        <option value="ps">Pashto</option>
                        <option value="fa">Persian</option>
                        <option value="pl">Polish</option>
                        <option value="pt">Portuguese</option>
                        <option value="pa">Punjabi</option>
                        <option value="ro">Romanian</option>
                        <option value="ru">Russian</option>
                        <option value="sm">Samoan</option>
                        <option value="sr">Serbian</option>
                        <option value="sn">Shona</option>
                        <option value="sd">Sindhi</option>
                        <option value="si">Sinhala</option>
                        <option value="sk">Slovak</option>
                        <option value="sl">Slovenian</option>
                        <option value="so">Somali</option>
                        <option value="es">Spanish</option>
                        <option value="sw">Swahili</option>
                        <option value="sv">Swedish</option>
                        <option value="tg">Tajik</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                        <option value="th">Thai</option>
                        <option value="zht">Traditional Chinese</option>
                        <option value="tr">Turkish</option>
                        <option value="tk">Turkmen</option>
                        <option value="uk">Ukrainian</option>
                        <option value="ur">Urdu</option>
                        <option value="uz">Uzbek</option>
                        <option value="vi">Vietnamese</option>
                        <option value="cy">Welsh</option>
                        <option value="zu">Zulu</option>
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
console.log(nytUrl);
      const response = await fetch(nytUrl);
      const data = await response.json();
      const articles = data.response.docs.slice(0, 10);
if (articles.length === 0) {
  container.innerHTML = `
    <div class="text-center text-muted my-4">
      <i class="bi bi-newspaper" style="font-size: 2rem;"></i>
      <p class="mt-2">No NYT articles found for "${query}". Try a different keyword or date range.</p>
    </div>
  `;
  return;
}

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
      const language = document.getElementById("languageSelector")?.value;
      let timeFrame = "";

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
      console.log(otherUrl);
      const response = await fetch(otherUrl);
      const data = await response.json();
      const articles = data.results || [];
if (articles.length === 0) {
  container.innerHTML = `
    <div class="text-center text-muted my-4">
      <i class="bi bi-newspaper" style="font-size: 2rem;"></i>
      <p class="mt-2">No articles found from other sources for "${query}". Try a different keyword or filter.</p>
    </div>
  `;
  return;
}

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
    else {
      console.log("Hello both");

      // NYT fetch
      const nytUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
        query
      )}&sort=best&api-key=ZtHh7l6hPlAyPAqfqinDMvLriAOTsuRO`;
      const nytResponse = await fetch(nytUrl);
      const nytData = await nytResponse.json();
      const nytArticles = nytData.response.docs.slice(0, 10);

      nytArticles.forEach((article) => {
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

      // NewsData fetch
      const otherUrl = `https://newsdata.io/api/1/latest?apikey=pub_9e246252d0904458b7dab582502a600d&q=${encodeURIComponent(
        query
      )}&language=en`;
      const otherResponse = await fetch(otherUrl);
      const otherData = await otherResponse.json();
      const otherArticles = otherData.results || [];

      otherArticles.forEach((article) => {
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
        // ✅ Add this check BEFORE rendering
  if (nytArticles.length === 0 && otherArticles.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted my-4">
        <i class="bi bi-newspaper" style="font-size: 2rem;"></i>
        <p class="mt-2">No articles found from any source for "${query}". Try a different keyword.</p>
      </div>
    `;
    return;
  }
    }
  } catch (error) {
    console.error("Error fetching news:", error);
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
});

console.log(out.choices[0].message.content);
   const summary = out.choices[0].message.content
 
    document.getElementById('summaryModalLabel').textContent = title;
   document.getElementById('summaryContent').textContent = summary;
 
   const modal = new bootstrap.Modal(document.getElementById('summaryModal'));
   modal.show();
 }



window.showNYTOptions = showNYTOptions;
window.showOtherOptions = showOtherOptions;
window.searchNews = searchNews;
window.showSummary = showSummary;
window.escapeQuotes = escapeQuotes;