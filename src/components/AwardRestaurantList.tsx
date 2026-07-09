'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { AwardRestaurant } from '@/lib/award-admin'

interface AwardRestaurantListProps {
  restaurants: AwardRestaurant[]
}

export default function AwardRestaurantList({ restaurants }: AwardRestaurantListProps) {
  const [selectedLocation, setSelectedLocation] = useState('')

  const locations = useMemo(
    () => Array.from(new Set(restaurants.map((restaurant) => restaurant.location))).sort(),
    [restaurants],
  )

  const filteredRestaurants = useMemo(
    () =>
      selectedLocation
        ? restaurants.filter((restaurant) => restaurant.location === selectedLocation)
        : restaurants,
    [restaurants, selectedLocation],
  )

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-3">Select Location</label>
            <select
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
              className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            >
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location} className="bg-background text-white">
                  {location}
                </option>
              ))}
            </select>
          </div>
          {selectedLocation && (
            <button
              type="button"
              onClick={() => setSelectedLocation('')}
              className="inline-flex h-fit items-center justify-center rounded-3xl border border-border bg-card px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Clear location
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[#0d1526] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgb(245,138,39,0.15)]"
            >
              {/* Image / Logo Section */}
              <div className="flex w-full items-center justify-center pt-8 pb-2 shrink-0">
                <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-900 shadow-inner shadow-white/5">
                  {restaurant.logo ? (
                    <img src={restaurant.logo} alt={restaurant.restaurant_name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-slate-300">{restaurant.restaurant_name.charAt(0)}</span>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold text-white leading-snug">{restaurant.restaurant_name}</h2>
                    <a
                      href="/restaurant/owner-login"
                      className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-orange-400 transition hover:text-orange-300"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Owner<br />Login
                    </a>
                  </div>

                  <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-slate-400">
                    <svg className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-2">
                      {restaurant.location}
                      {restaurant.address && `, ${restaurant.address}`}
                    </span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {restaurant.categories.map((category) => (
                      <span
                        key={category.id}
                        className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[11px] font-semibold text-orange-400"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-sm text-slate-400 line-clamp-2">{restaurant.description}</p>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/restaurant/${restaurant.id}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                  >
                    View & Vote
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-slate-800 bg-slate-950/90 p-8 text-center text-white">
            No restaurants found for <span className="font-semibold">{selectedLocation}</span>.
          </div>
        )}
      </div>
    </>
  )
}
