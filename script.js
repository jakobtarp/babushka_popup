let data;
let filter = "alle";

const endpoint = "https://babushka-dd8a.restdb.io/rest/menu";

const mereinfo = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

console.log(endpoint);

const header = document.querySelector("alle");
const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));
hentData;

function filtrerRetter() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
  header.textContent = this.textContent;
  console.log("hej");
}

async function hentData() {
  const respons = await fetch(endpoint, mereinfo);
  data = await respons.json();
  vis(data);
}

function vis() {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";
  data.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".billedurl").src = "medium/" + ret.billednavn + "-md.jpg";
      klon.querySelector("article").addEventListener("click", () => visRet(ret));
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = ret.pris + ",-";

      main.appendChild(klon);
    }
  });
}
function visRet(ret) {
  console.log(ret);
  const popup = document.querySelector("#popup");
  popup.style.display = "flex";
  popup.querySelector(".billedurl").src = "medium/" + ret.billednavn + "-md.jpg";
  popup.querySelector("h2").textContent = ret.navn;
  popup.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
  popup.querySelector(".pris").textContent = ret.pris + ",-";
  popup.addEventListener("click", () => (popup.style.display = "none"));
}

hentData();
