import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import background from '../../assets/background.png'
import "./styles.css"

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="conteudo">
        <img src={background} className="background" alt="background app" ></img>
        <div className="info">
          <Input></Input>
          <Button></Button>
          <div className="perfil">
            <img src="https://avatars.githubusercontent.com/u/127464189?v=4" className="profile" alt="profile app" ></img>
            <div>
              <h3>Daniel Guilherme</h3>
              <span>@odeni3</span>
              <p>Descrição</p>
            </div>
          </div>
          <hr />
          <div>
            <h4>Repositórios</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
