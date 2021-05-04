import { React, useState, useEffect } from 'react';

function ButtonExample({ user }) {
  const [userClicks, setUserClicks] = useState(null);
  const [totalClicks, setTotalClicks] = useState(null);

  useEffect(() => {
    const apiURL = `${process.env.REACT_APP_SERVER_URL}/api`;

    fetch(`${apiURL}/click`)
    .then(res => res.json())
    .then(data => setTotalClicks(data.count));
  }, []);

  useEffect(() => {
    const apiURL = `${process.env.REACT_APP_SERVER_URL}/api`;
    fetch(`${apiURL}/user`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => setUserClicks(data.count))
    .catch(err => console.error(err));
  }, []);

  const doClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/click`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    setTotalClicks(totalClicks + 1);
    setUserClicks(userClicks + 1);
  }

  return (
    <>
      <h3>click counter</h3>
      <p>button example of using the auth with express + mongodb</p>

      <code>{`total clicks: ${totalClicks || "loading..." }`}</code>
      {user && <code>{`your clicks: ${userClicks || "loading..." }`}</code>}

      {user && <button onClick={doClick}>click me 👉</button> }
    </>
  );
}

function Home(props) {
  const { user } = props;
  const authURL = `${process.env.REACT_APP_SERVER_URL}/auth`;

  return (
    <>
      <h1>smern auth example</h1>
      <p>a tiny example of using google oauth with express</p>

      <h2>try it yourself!</h2>
      {((user && user.name) && (
        <span>
          Hi {user.name}!
          {' - '}
          <a href={`${authURL}/logout`}>logout</a>
        </span>
      )) ||
      <a href={`${authURL}/google`}>
        Sign in with Google
      </a>
      }

      <ButtonExample user={user} />

      <h2>see more</h2>
      <a
        href="https://zimboboys.com/smern/"
        rel="noreferrer"
        target="_blank"
      >
        the deployment process
      </a>

      <br />
      <a
        href="https://github.com/Zimboboys/smern"
        rel="noreferrer"
        target="_blank"
      >
        the code for this site
      </a>
    </>
  );
}

export default Home;