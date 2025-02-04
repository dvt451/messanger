import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import MyContextProvider from './shared/hooks/MyContextProvider';
import Chat from './components/Chat';
import './scss/style.scss'

function App() {
	return (

		<div className="wrapper">
			<MyContextProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<Chat />} path='/' />
						<Route element={<Chat />} path='/dd' />
					</Routes>
				</BrowserRouter>
			</MyContextProvider>
		</div>
	);
}

export default App;