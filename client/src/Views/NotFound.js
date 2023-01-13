import { Link } from 'react-router-dom';
import '../resources/css/header.css';
import img404 from '../resources/images/3818850.jpg';

export default function NotFound() {
    return (
        <div>
            <h1 className="Notfound">Oops! You seem to be lost.</h1>
            <Link to='/' className='link404'>
            <p className='NotfoundP'> <i class="fa-solid fa-face-laugh-beam"></i> Click me i will take you back </p>
            <img className='image404' src={img404} />
            </Link>

        </div>
    )
}