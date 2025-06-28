import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/landingPage/LandingPage';

function App() {

  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}

export default App
