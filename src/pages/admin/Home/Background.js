import '../../../css/backend/home/Background.css';
import teacup from '../../../image/teacup.png'
function Background() {
    return (
        <div className="container-bg">
            <div className="left" >
                <h2>Come and wake up with us</h2>
                <ul className="social-icons">
                    <li>Brewed for Your Soul</li>
                    <li>Where Every Cup Tells a Story</li>
                    <li>Fuel Your Day with Flavor</li>
                </ul>
            </div>
            <div className="right">
                <div className="coffee-image">
                    <img src={teacup} alt="Black Coffee" />
                </div>
                <span className='brand-name'>DYN COFFEE AND TEA</span>
            </div>
        </div>
    );
}

export default Background;