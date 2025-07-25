'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface Translation {
  name: string;
  shortDescription: string;
  description: string;
}

interface Restaurant {
  id: number;
  slug: string;
  image: string;
  city: string;
  translations?: {
    en?: Translation;
    gr?: Translation;
    ru?: Translation;
  };
}

const cityTranslations: Record<'en' | 'gr' | 'ru', string[]> = {
  en: ['All', 'Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Ayia Napa', 'Protaras'],
  gr: ['Όλα', 'Λευκωσία', 'Λεμεσός', 'Λάρνακα', 'Πάφος', 'Αγία Νάπα', 'Πρωταράς'],
  ru: ['Все', 'Никосия', 'Лимассол', 'Ларнака', 'Пафос', 'Айя-Напа', 'Протарас'],
};

export default function RestaurantListClient() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') as 'en' | 'gr' | 'ru') || 'en';

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredCity, setFilteredCity] = useState<string>(cityTranslations[lang][0]);

  const cities = cityTranslations[lang];

  useEffect(() => {
    setFilteredCity(cityTranslations[lang][0]);
  }, [lang]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch('/data/restaurants.json');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data: Restaurant[] = await res.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants =
    filteredCity === cities[0]
      ? restaurants
      : restaurants.filter(
          (r) => r.city === cityTranslations['en'][cities.indexOf(filteredCity)]
        );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/restaurants/booking-6.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 bg-black/60 text-white min-h-screen px-4 py-20">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          {lang === 'en' &&
            'Reserve your table in your preferred section of the restaurant and time and enjoy your day.'}
          {lang === 'gr' &&
            'Κλείστε τραπέζι στο αγαπημένο σας σημείο και ώρα και απολαύστε την ημέρα σας.'}
          {lang === 'ru' &&
            'Забронируйте столик в удобной зоне ресторана и наслаждайтесь днем.'}
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setFilteredCity(city)}
              className={`px-4 py-2 rounded-full border-none cursor-pointer ${
                filteredCity === city
                  ? 'bg-[var(--orange)] text-white'
                  : 'bg-gray-100 text-[var(--mid-teal)]'
              } hover:bg-[var(--orange-hover)] transition`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Restaurant Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredRestaurants.map((restaurant) => {
            const translation =
              restaurant.translations?.[lang] || restaurant.translations?.en;
            if (!translation) return null;

            return (
              <div
                key={restaurant.id}
                className="bg-white text-black shadow rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition"
              >
                <Image
                  width={400}
                  height={300}
                  src={restaurant.image}
                  alt={translation.name}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{translation.name}</h2>
                <p className="text-gray-600 mb-2">{translation.shortDescription}</p>
                <p className="text-gray-500 text-sm mb-4">{translation.description}</p>
                <Link
                  href={`/restaurants/${restaurant.slug}?lang=${lang}`}
                  className="mt-auto bg-[var(--orange)] text-white text-center py-2 rounded-xl hover:bg-[var(--orange-hover)] transition"
                >
                  {lang === 'en' && 'Book a Table'}
                  {lang === 'gr' && 'Κράτηση Τραπεζιού'}
                  {lang === 'ru' && 'Забронировать столик'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

