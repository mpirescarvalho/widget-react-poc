import { render } from 'react-dom';
import { App } from './App';
import { loader } from './loader';

loader(window, window.document.currentScript, (element, props) =>
	render(<App {...props} />, element)
);
