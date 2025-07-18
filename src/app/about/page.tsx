"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

interface ServiceContent {
  title: string;
  description: string;
  image: string;
}

interface AboutContent {
  heading: string;
  intro: string;
  services: ServiceContent[];
  principlesTitle: string;
  principles: string[];
  outro: string;
}

const AboutPage = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const langParam = searchParams.get("lang");
      const lang = langParam === "gr" || langParam === "ru" ? langParam : "en";

      try {
        const res = await fetch(`/data/about/about-${lang}.json`);
        const data = await res.json();
        setContent(data);
      } catch (error) {
        console.error("Failed to load About page data:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  if (!content) {
    return <div className="text-center py-20 text-gray-600">Loading...</div>;
  }

  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-white text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center text-primary drop-shadow-md">
          {content.heading}
        </h1>

        <p className="text-lg mb-16 text-center max-w-3xl mx-auto text-gray-700">
          {content.intro}
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {content.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <Image
                width={200}
                height={200}
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white p-10 rounded-2xl shadow-md mb-16">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-4">
            {content.principlesTitle}
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            {content.principles.map((principle, i) => (
              <li key={i}>{principle}</li>
            ))}
          </ul>
        </section>

        <section className="text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {content.outro}
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
