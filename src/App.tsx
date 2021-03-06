import { Container } from './styles/styles';

type AppProps = {
	clientId: string;
};

export function App({ clientId }: AppProps) {
	return <Container>Client: {clientId}</Container>;
}
