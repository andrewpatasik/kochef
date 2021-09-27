// const home = () => {
//   console.log('home page');
//   const parentDiv = document.createElement('div');
//   const sectionHeader = document.createElement('h1');
//   const logoutBtn = document.createElement('button');
//   sectionHeader.innerText = 'Home Page';

//   logoutBtn.innerText = 'Logout';

//   logoutBtn.addEventListener('click', () => {
//     const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
//     userLoginSession.logStatus = !userLoginSession.logStatus;
//     localStorage.setItem('userLoginSession', JSON.stringify(userLoginSession));

//     window.location.replace(`${window.location.origin}`);
//   });

//   parentDiv.append(sectionHeader, logoutBtn);

//   return parentDiv;
// };

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h1>Home Page</h1>
      <button id="logout-btn">Logout</button>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
      const userLoginSession = JSON.parse(localStorage.getItem('userLoginSession'));
      userLoginSession.logStatus = !userLoginSession.logStatus;
      localStorage.setItem('userLoginSession', JSON.stringify(userLoginSession));

      window.location.replace(`${window.location.origin}`);
    });
  }
}

customElements.define('home-element', Home);
