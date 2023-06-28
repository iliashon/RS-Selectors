import Controller from './components/control';
import './style.css';

const app = new Controller('https://rs-selectors-iliashon-default-rtdb.firebaseio.com/levels.json');
app.startApp();
