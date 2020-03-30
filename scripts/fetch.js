const clientId = '5d5f3add1a27510d7995';
const clientSecret = 'b385f78560c396635adeca98c9c56986bc227240';
const reposCount = 5;
const repostSort = 'created: asc';

async function getUser(user) {
  // Fetch User
  const profileReponse = await fetch(
    `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`
  );
  const profile = await profileReponse.json();

  // Fetch Repos
  const repoReponse = await fetch(
    `https://api.github.com/users/${user}/repos?per_page=${reposCount}&sort=${repostSort}&client_id=${clientId}&client_secret=${clientSecret}`
  );
  const repos = await repoReponse.json();

  // Return both as an Object
  return {
    profile,
    repos,
  };
}

export default getUser;
