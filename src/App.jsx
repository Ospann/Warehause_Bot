import { Box } from '@chakra-ui/react';
import Footer from './components/Footer';
import Header from './components/Header';
import CustomTable from './components/Table';
import Tabs from './components/Tabs';
import { useEffect } from 'react';
import { useAppContext } from './utils/AppContext';
import useTelegram from './utils/hooks/useTelegram';

const App = () => {
  const { user } = useTelegram();
  const { setSupplier } = useAppContext();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch('');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      setSupplier(data);
    }
    fetchData();
  }, [setSupplier, user]);

  return (
    <Box className='container'>
      <Header />
      <Box className='content'>
        <Tabs />
        <CustomTable />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
