"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Restaurant {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  slug: string;
  image: string;
  city: string;
}

const cities = [
  "All",
  "Nicosia",
  "Limassol",
  "Larnaca",
  "Paphos",
  "Ayia Napa",
  "Protaras",
];

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredCity, setFilteredCity] = useState<string>('All');

  useEffect(() => {
    fetch('/data/restaurants.json')
      .then((res) => res.json())
      .then((data: Restaurant[]) => {
        setRestaurants(data);
      })
      .catch((error) => console.error('Failed to fetch restaurants:', error));
  }, []);

  const filteredRestaurants = filteredCity === 'All'
    ? restaurants
    : restaurants.filter(r => r.city === filteredCity);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Reserve your table in your preferred section of the restaurant and time and enjoy your day.</h1>

      {/* City Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setFilteredCity(city)}
            className={`px-4 py-2 rounded-full border ${
              filteredCity === city ? 'bg-[var(--orange)] text-white' : 'bg-gray-100 text-gray-800'
            } hover:bg-[var(--orange-hover)] transition`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Restaurant Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            <Image
              width={100}
              height={100}
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
            <p className="text-gray-600 mb-2">{restaurant.shortDescription}</p>
            <p className="text-gray-500 text-sm mb-4">{restaurant.description}</p>
            <Link
              href={`/restaurants/${restaurant.slug}`}
              className="mt-auto bg-[var(--orange)] text-white text-center py-2 rounded-xl hover:bg-[var(--orange-hover)] transition"
            >
              Book a Table
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}



