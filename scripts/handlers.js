import getUser from './fetch.js';
import { showAlert, showProfile, showRepos, clearProfile } from './ui.js';

async function handleClick(e) {
  const userText = e.target.value;

  if (userText) {
    const user = await getUser(userText);
    if (user.profile.message === 'Not Found') {
      showAlert('User not found', 'alert', 'alert-danger');
    } else {
      showProfile(user.profile);
      showRepos(user.repos);
    }
  } else {
    clearProfile();
  }
}

export default handleClick;
