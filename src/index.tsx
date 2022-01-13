import { render } from 'react-dom';
import { App } from './App';
import { loader } from './loader';

loader((element, props) => render(<App {...props} />, element));
