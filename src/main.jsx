import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react' 
import './index.css'
import App from './components/App/App.jsx'

createRoot(document.getElementById('root')).render(
    <ChakraProvider>
    <App />
    </ChakraProvider>
)
