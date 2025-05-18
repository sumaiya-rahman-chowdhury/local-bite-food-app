import MarketPage from "@/components/market-place/MarketPage";
import Banner from "@/components/sections/Banner";

import { fetchBannerImages } from "@/lib/fetch/fetchedBannerImages";

export default async function Home() {
  const bannerImages = await fetchBannerImages()
  // console.log(bannerImages[0].images)
  return <main>
    <Banner images={bannerImages[0].images}/>
    <MarketPage/>
  </main>;
}
