import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import LocationCard from '../components/LocationCard';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <LocationCard />
        </Stack>
      </Stack>
      <div>Home</div>
    </Container>
  )
}

export default Home;