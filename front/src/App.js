/* import logo from './logo.svg'; */
import './App.css';
import '../src/assets/css/app.css'
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';

function App() {
  return (
    <>
      <div id="wrapper">
        <SideBar/>
        <ContentWrapper/>
      </div>
    </>
  );
}

export default App;
