import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "🎉 Big Festive Sale – Up to 50% Off!",
    subtitle: "Grab your favorites before the stock runs out!",
    image: "/herobannerimg1.jpg",
  },
  {
    id: 2,
    title: "🆕 New Arrivals Just Dropped",
    subtitle: "Explore the latest collection of fashion & gadgets.",
    image: "/herobannerimg3.jpg",
  },
  {
    id: 3,
    title: "💳 Special Discount for Members",
    subtitle: "Sign up today and get exclusive offers.",
    image: "/herobannerimg2.jpg",
  },
];

export default function HeroBanner() {
  return (
    <section className="w-full max-w-[90rem] mx-auto mb-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[25rem] md:h-[30rem] lg:h-[35rem] rounded-2xl shadow-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center rounded-2xl relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6 rounded-2xl">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 max-w-2xl">
                  {slide.subtitle}
                </p>
            
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
