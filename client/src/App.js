import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Busqueda from './components/Busqueda/Busqueda';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <Busqueda/>
      </Provider>
    </div>
  );
}

export default App;
