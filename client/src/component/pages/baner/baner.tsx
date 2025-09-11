
import hero from '../../../assets/hero.png'
import './baner.css'
function Baner() {
    return (
        <>
        <div className='baner'>
           <div className="section">
            <p>women</p>
            <h1>Slick. Modern. Awesome.</h1>
            <p>up to offer 30%</p>
            <button>ORDER NOW</button>
            </div>         
            <div className="image">
                <img src={hero} alt="baner-img" />  
            </div>
        </div>
        </>
    );
}

export default Baner;