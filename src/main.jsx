import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react' 
import { Provider } from 'react-redux'
import store from './store/index.js'
import './index.css'
import App from './components/App/App.jsx'

createRoot(document.getElementById('root')).render(
    <ChakraProvider>
        <Provider store={store}>
    <App />
    </Provider>
    </ChakraProvider>
)
