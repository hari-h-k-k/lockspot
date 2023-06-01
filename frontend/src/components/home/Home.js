import './HomeStyle.css';
import Navbar from '../navbar/Navbar.js';
import BgImg from '../../assets/images/HomeBackground.jpg';
function Home() {
  return (
    <div style={{
      backgroundImage: `url(${BgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'auto',
      maxHeight: '100vh',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '2rem'
    }}>
    <Navbar className="navbar"/>
    </div>
  );
}

export default Home;