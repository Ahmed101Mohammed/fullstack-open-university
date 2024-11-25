import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from '../notificationStateManage'
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
  </NotificationContextProvider>
)