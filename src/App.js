import React, { useEffect, useState } from 'react';
import './App.css';

import api from './services/api';

import Header from './components/Header';
import FeaturedMovie from './components/FeaturedMovie';
import MovieRow from './components/MovieRow';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await api.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 5) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className='page'>
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando...'/>
        </div>
      }
      
    </div>
  );
};

export default App;
