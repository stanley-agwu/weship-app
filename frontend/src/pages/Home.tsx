import LocationCard from '../components/LocationCard';
import { MESSAGES } from '../constants/messages';
import { LocationProps } from '../types.ts';
import './styles.scss';

const delivery: LocationProps = {
  deliveryData: {
    customerName: 'Darwin Enterprises',
    warehouseAddressLat: '51.505',
    warehouseAddressLng: '-0.09',
    deliveryDate: '24th January, 2023',
    deliveryAddressLat: '91.2',
    deliveryAddressLng: '41.2',
  }
}

const Home = () => {
  return (
    <main className="main">
      <section className="banner"></section>
      <section className="content">
        <h2 className="header content-header">{MESSAGES.h1}</h2>
        <p>{MESSAGES.m1}</p>
        <hr />
      </section>
      <h2 className="header">{MESSAGES.h2}</h2>
      <section className="articles">
        <article className="map-cards">
          <div className="map-card">
            <LocationCard {...delivery} />
          </div>
          <div className="map-card">
            <LocationCard {...delivery} />
          </div>
          <div className="map-card">
            <LocationCard {...delivery} />
          </div>
          <div className="map-card">
            <LocationCard {...delivery} />
          </div>
        </article>
      </section>
    </main>
  )
}

export default Home;