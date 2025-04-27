import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import store from './store/index.js'
import './index.css'
import App from './components/App/App.jsx'




createRoot(document.getElementById('root')).render(
   
     <BrowserRouter>
     <Provider store={store}>
        <App />
        </Provider>
     </BrowserRouter>
)
