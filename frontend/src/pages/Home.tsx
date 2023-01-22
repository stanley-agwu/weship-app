import LocationCard from '../components/LocationCard';
import { MESSAGES } from '../constants/messages';
import { Delivery, LocationProps } from '../types.ts';
import './styles.scss';

const deliveryArray: Delivery[] = [
  {
    customerName: 'Hiu Yuan',
    deliveryDate: '2023-01-12',
    warehouseAddress: 'Guangdong, china',
    warehouseAddressLat: '23.1357694',
    warehouseAddressLng: '113.1982688',
    deliveryAddress: '2667 St. John Street, Saskatchewan, canada',
    deliveryAddressLat: '50.4839294',
    deliveryAddressLng: '-104.6020486',
  },
  {
    customerName: 'Darwin Enterprises',
    deliveryDate: '24th January, 2023',
    warehouseAddress: '546 High Town road, New Hampton, London, England',
    warehouseAddressLat: '51.505',
    warehouseAddressLng: '-0.09',
    deliveryAddress: '2134 Free way road, Highbury, Massachussets, USA',
    deliveryAddressLat: '91.2',
    deliveryAddressLng: '41.2',
  },
  {
    customerName: 'Warner Bros',
    deliveryDate: '2023-01-17',
    warehouseAddress: '3568 Wellington Avenue, Chilliwack, canada',
    warehouseAddressLat: '49.1737572',
    warehouseAddressLng: '-121.9610018',
    deliveryAddress: 'Columbia Road, Wisconsin, united states',
    deliveryAddressLat: '43.3716052',
    deliveryAddressLng: '-89.5217053',
  },
  {
    customerName: 'Darwin Ent',
    deliveryDate: '2023-01-20',
    warehouseAddress: '345 Edward high road, Minneapolis, USA',
    warehouseAddressLat: '44.9772995',
    warehouseAddressLng: '-93.2654692',
    deliveryAddress: 'Edmonton Canada',
    deliveryAddressLat: '53.5462055',
    deliveryAddressLng: '-113.491241',
  },
];

const Home = () => (
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
        {deliveryArray.map((delivery, idx) => {
          const deliveryData: LocationProps = {
            deliveryData: delivery,
          };
          return (
            <div className="map-card" key={idx}>
              <LocationCard {...deliveryData} />
            </div>
          );
        })}
      </article>
    </section>
  </main>
);

export default Home;
