const input = document.querySelector("#username");
const inputBtn = document.querySelector("#btn-username");
const inputBtn2 = document.querySelector("#buttonrepo");
const list = document.querySelector("#list");

inputBtn.addEventListener("click", async () => {
  const username = input.value;

  try {
    const response = await fetch("https://api.github.com/users/" + username);
    if (response.ok) {
      const result = await response.json();
      document.getElementById("displayUsername").textContent = result.login;
      document.getElementById("displayName").textContent =
        result.id || "Not available";
      document.getElementById("displayLocation").textContent =
        result.created_at || "Not available";
      document.getElementById("displayPublicRepos").textContent =
        result.repos_url || 0;
      console.log(result);
      list.style.display = "block";
    } else {
      throw new Error("Some error in fetching api");
    }
  } catch (error) {
    console.log("Error:", error);
  }
  input.value = "";
});

inputBtn2.addEventListener("click", async () => {
  const username = input.value;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=15`
    );
    if (response.ok) {
      //   const result = await response.json();
      const repos = await response.json();
      displayRepos(repos);
      console.log(repos);

      function displayRepos(repos) {
        const table = document.getElementById("repoTable");
        const repoData = document.getElementById("repoData");

        // Clear previous data
        repoData.innerHTML = "";

        // Populate table with repositories
        repos.forEach((repo) => {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const descriptionCell = document.createElement("td");
          const urlCell = document.createElement("td");

          nameCell.textContent = repo.name;
          descriptionCell.textContent =
            repo.description || "No description available";
          //   urlCell.innerHTML = `<a href="${repo.html_url}" target="_blank">View</a>`;
          urlCell.innerHTML = repo.html_url;
          row.appendChild(nameCell);
          row.appendChild(descriptionCell);
          row.appendChild(urlCell);
          repoData.appendChild(row);
        });

        // Show the table
        table.style.display = "table";
      }
    } else {
      throw new Error("Some error in fetching api");
    }
  } catch (error) {
    console.log("Error:", error);
  }
  input.value = "";
});
