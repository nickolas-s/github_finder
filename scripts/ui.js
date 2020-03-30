import wait from 'waait';
import { format } from 'date-fns';
import { profileDisplay } from './elements.js';

export function showProfile(user) {
  profileDisplay.innerHTML = `
  <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}" alt="" />
          <a href="${
            user.html_url
          }" target="_blank" class="btn btn-primary btn-block mb-3">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${
            user.public_repos
          }</span>
          <span class="badge badge-secondary">Public Gists: ${
            user.public_gists
          }</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${
              user.company !== null ? user.company : '---'
            }</li>
            <li class="list-group-item">Website/Blog: ${
              user.blog !== ''
                ? `<a href="${
                    !user.blog.search(/http/)
                      ? user.blog
                      : `http://${user.blog}`
                  }" target="_blank">${user.blog}</a>`
                : '---'
            }</li>
            <li class="list-group-item">Location: ${
              user.location !== null ? user.location : '---'
            }</li>
            <li class="list-group-item">Member Since: ${format(
              new Date(user.created_at),
              'MMMM yyyy'
            )}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos<h3>
    <div id="repos"></div>
  `;
}

export function showRepos(repos) {
  const html = repos.map(
    repo => `
  <div class="card card-body mb-2">
    <div class="row">
      <div class="col-md-6">
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      </div>
      <div class="col-md-6">
        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
        <span class="badge badge-secondary">Watchers ${repo.watchers_count}</span>
        <span class="badge badge-success">Forks: ${repo.forks_count}</span>
      </div>
    </div>
  </div>
  `
  );
  document.querySelector('#repos').innerHTML = html.join('');
}

export function clearProfile() {
  profileDisplay.innerHTML = '';
}

export async function showAlert(message, className1, className2) {
  const currentAlert = document.querySelector('.alert');

  if (!currentAlert) {
    const div = document.createElement('div');
    div.classList.add(`${className1}`, `${className2}`);
    div.textContent = message;
    profileDisplay.insertAdjacentElement('beforebegin', div);
    clearProfile();
    await wait(1000);
    div.remove();
  }
}
