import { useState } from "react";
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ItemList } from '../../components/ItemList';
import background from '../../assets/background.png';
import "./styles.css";

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleGetData = async () => {
    try {

      const userData = await fetch(`https://api.github.com/users/${user}`);
      if (userData.status === 404) {
        setUserNotFound(true);
        setTimeout(() => {
          setUserNotFound(false);
        }, 2500);

        return;
      }

      const newUser = await userData.json();

      if (newUser.login) {
        const { avatar_url, name, bio, login, followers, following } = newUser;
        setCurrentUser({ avatar_url, name, bio, login, followers, following });

        const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
        const newRepos = await reposData.json();

        if (newRepos.length) {
          setRepos(newRepos);
        }
      }
      
      setUserNotFound(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserNotFound(true);
    }
  };

  return (
    <div className="App">
      <Header></Header>
      <div className="conteudo">
        <img src={background} className="background" alt="background app"></img>
        <div className="info">
          <Input value={user} onChange={(value) => setUser(value)} />
          <Button onClick={handleGetData} />

          {userNotFound ? (
            <div className="error-message">User not found. Enter a valid username.</div>
          ) : null}

          {currentUser?.login ? (
            <div>
              <div className="perfil">
                <img src={currentUser.avatar_url} className="profile" alt="profile app"></img>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                  <p> <svg fill="#FFFFFF" text="muted" aria-hidden="true" height="16" viewBox="1 -2 18 16" version="1.1" width="20" data-view-component="true" class="octicon octicon-people">
                      <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
                      <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path></svg> 
                      {currentUser.followers} followers · {currentUser.following} following </p> 
                </div>
              </div>
              <hr />
            </div>
          ) : null}

          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositories</h4>
              {repos.map((repo) => (
                <ItemList title={repo.name} description={repo.description}></ItemList>
              ))}
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}

export default App;
