const input = document.querySelector("#username");
const inputBtn = document.querySelector("#btn-username");
const inputBtn2 = document.querySelector("#buttonrepo");
const list = document.querySelector("#list");

const usernameDetail = () => {
  const username = input.value;

  const response = fetch("https://api.github.com/users/" + username)
    .then((value) => value.json())
    .then((value) => createData(value))
    .catch((error) => console.log(error));
};

const fetchDetail = async () => {
  const username = input.value;

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=3`
  )
    .then((value) => value.json())
    .then((value) => displayTable(value))
    .catch((error) => console.log(error));
};

const displayTable = (repos) => {
  const table = document.getElementById("repoTable");
  const repoData = document.getElementById("repoData");

  repoData.innerHTML = "";

  repos.forEach((repo) => {
    let { name, description, html_url } = repo;
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const urlCell = document.createElement("td");

    nameCell.textContent = name;
    descriptionCell.textContent = description || "No description available";
    urlCell.innerHTML = html_url;
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(urlCell);
    repoData.appendChild(row);
  });

  table.style.display = "table";
};

const createData = (value) => {
  let { login, id, created_at, repos_url } = value;

  document.getElementById("displayUsername").textContent = login;
  document.getElementById("displayID").textContent = id || "Not available";
  document.getElementById("createddate").textContent =
    created_at || "Not available";
  document.getElementById("repourls").textContent = repos_url || 0;
  list.style.display = "block";
};
