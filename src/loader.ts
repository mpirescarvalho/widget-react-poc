const DEFAULT_NAME = '_myWidget';

type WidgetConfiguration = {
	clientId: string;
};

type MethodNames = 'init';

type LoaderObject = {
	q: Array<[MethodNames, WidgetConfiguration]>;
};

export function loader(
	win: Window,
	scriptElement: Element | null,
	render: (element: HTMLElement, config: WidgetConfiguration) => void
) {
	const instanceName =
		scriptElement?.attributes.getNamedItem('id')?.value ?? DEFAULT_NAME;

	const loaderObject: LoaderObject = win[instanceName];

	if (!loaderObject || !loaderObject.q) {
		throw new Error(
			`Widget didn't find LoaderObject for instance [${instanceName}]. ` +
				`The loading script was either modified, no call to 'init' method was done ` +
				`or there is conflicting object defined in \`window.${instanceName}\` .`
		);
	}

	if (win[`loaded-${instanceName}`]) {
		throw new Error(
			`Widget with name [${instanceName}] was already loaded. ` +
				`This means you have multiple instances with same identifier (e.g. '${DEFAULT_NAME}')`
		);
	}

	let targetElement: HTMLElement;

	for (let i = 0; i < loaderObject.q.length; i++) {
		const item = loaderObject.q[i];
		const methodName = item[0];
		if (i === 0 && methodName !== 'init') {
			throw new Error(
				`Failed to start Widget [${instanceName}]. 'init' must be called before other methods.`
			);
		} else if (i !== 0 && methodName === 'init') {
			continue;
		}

		switch (methodName) {
			case 'init':
				const loadedObject = item[1];

				targetElement = win.document.body.appendChild(
					win.document.createElement('div')
				);

				targetElement.setAttribute('id', `widget-${instanceName}`);
				render(targetElement, loadedObject);

				win[`loaded-${instanceName}`] = true;
				break;
			default:
				console.warn(`Unsupported method [${methodName}]`, item[1]);
		}
	}
}
