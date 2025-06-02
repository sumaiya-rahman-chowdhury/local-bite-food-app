import AboutUs from "@/components/About";
import ContactUs from "@/components/Contact";
import MarketPage from "@/components/market-place/MarketPage";
import ReviewsSection from "@/components/Reviews";
import Banner from "@/components/sections/Banner";
import WhyYouShouldDonate from "@/components/WhyDonate/WhyYouShouldDonate";

// import { fetchBannerImages } from "@/lib/fetch/fetchedBannerImages";

export default async function Home() {
  // const bannerImages = await fetchBannerImages()
  // console.log(bannerImages[0].images)
  return <main>
    <Banner/>
    <MarketPage/>
    <WhyYouShouldDonate/>
    <AboutUs/>
    <ContactUs/>
    <ReviewsSection/>
  </main>;
}
