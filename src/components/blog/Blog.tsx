'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Item {
  id: number;
  title: string;
  text: string;
}

interface Data {
  en: Item[];
  gr: Item[];
  ru: Item[];
}

export default function Category() {
  const [data, setData] = useState<Item[]>([]);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/news.json");
        const json: Data = await res.json();

        const currentLang = ["en", "gr", "ru"].includes(lang) ? lang : "en";
        setData(json[currentLang as keyof Data] || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, [lang]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item) => (
        <Link href={`/post/${item.id}?lang=${lang}`} key={item.id}>
          <div className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
