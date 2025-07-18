export type Partner = {
  src: string;
  alt: string;
};

export type TitleData = {
  dream: string;
  explore: string;
  discover: string;
};

export type PageData = {
  explore: string;
  slogan: string;
  title: TitleData;
};

export type NavbarData = {
  home: string;
  services: string;
  travelsTours: string;
  hotelReservation: string;
  carRentals: string;
  beautySalonBooking: string;
  tourGuideBooking: string;
  restaurantBooking: string;
  blog: string;
  contact: string;
  about: string;
};

export type Service = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export type ServicesData = {
  en: Service[];
  gr: Service[];
  ru: Service[];
};
export interface SliderImage {
  id: number;
  image: string;
  alt: string;
}
export interface NewsItem {
  id: number;
  image: string;
  title: string;
  text: string;
}

export interface FooterTranslation {
  title: string;
  description: string;
  quickLinks: string;
  home: string;
  services: string;
  about: string;
  contact: string;
  email: string;
  phone: string;
  followUs: string;
  copyright: string;
}