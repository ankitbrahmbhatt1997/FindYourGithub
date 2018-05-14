let input = document.querySelector("#icon_prefix");

input.addEventListener("keyup", function(e) {
  let user = e.target.value;
  if (user !== "") {
    axios
      .get(`/user/${user}`)
      .then(function(response) {
        if (response.data.message == "Not Found") {
          let message = response.data.message;
          let alertContainer = document.querySelector(".alert");
          alertContainer.innerHTML = "";
          let alert = document.createElement("div");
          alert.classList.add("card-panel");
          alert.classList.add("red");
          alert.classList.add("lighten-3");
          alert.innerHTML = `<h4 class="white-text center-align ">User Not Found</h4>`;
          alertContainer.appendChild(alert);
        } else {
          document.querySelector(".alert").innerHTML = "";
          let profileContainer = document.querySelector(".show-profile");
          profileContainer.innerHTML = "";
          let source = document.getElementById("profile-template").innerHTML;
          let template = Handlebars.compile(source);
          let context = {
            profileImage: response.data.profile.avatar_url,
            name: response.data.profile.name,
            repo: response.data.profile.public_repos,
            gist: response.data.profile.public_gists,
            followers: response.data.profile.followers,
            following: response.data.profile.following,
            company: response.data.profile.company,
            blog: response.data.profile.blog,
            location: response.data.profile.location,
            hireable: response.data.profile.hireable,
            url: response.data.profile.html_url
          };
          let html = template(context);
          let row = document.createElement("div");
          row.classList.add("row");

          row.innerHTML = html;
          profileContainer.appendChild(row);
        }
      })
      .catch(function(e) {
        console.log(e);
      });

    axios
      .get(`/repos/${user}`)
      .then(function(response) {
        console.log(response.data.repos);
        let repos = response.data.repos;
        document.querySelector(".alert").innerHTML = "";

        document.querySelector(".show-repo").innerHTML = "";

        repos.forEach(function(repo) {
          let repoContainer = document.querySelector(".show-repo");

          let source = document.getElementById("repo-template").innerHTML;
          let template = Handlebars.compile(source);
          let context = {
            name: repo.name,
            watchers: repo.watchers_count,
            forks: repo.forks_count,
            stargazers: repo.stargazers_count,
            url: repo.html_url
          };
          let html = template(context);
          let row = document.createElement("div");
          row.classList.add("row");

          row.innerHTML = html;
          repoContainer.appendChild(row);
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  }
});
