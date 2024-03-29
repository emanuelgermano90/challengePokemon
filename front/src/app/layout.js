import { Provider, useSelector } from 'react-redux'; // Importa Provider desde react-redux
import { Inter } from 'next/font/google';
import store from '@/redux/store';
import BtTheme from '@/components/BtTheme';
import ErrorMsj from '@/components/ErrorMsj';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <div>
      <Provider store={store}>
        <BtTheme />
        {children}
        <ErrorMsj />
      </Provider>
    </div>
  );
}
