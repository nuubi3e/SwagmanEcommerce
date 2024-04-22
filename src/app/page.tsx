import Banner1 from '@/assets/images/banner-1.png';
import Banner2 from '@/assets/images/banner-2.png';
import Banner3 from '@/assets/images/banner-3.png';
import HomeContentWrapper from '@/wrappers/HomeContentWrapper/HomeContent.wrapper';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <figure className='w-full h-max'>
        <Image src={Banner3} alt='Top Banner' className='w-full h-auto' />
      </figure>
      <HomeContentWrapper>
        <h2 className='text-center font-semibold text-2xl xs:text-3xl'>
          Top Rated Products
        </h2>
      </HomeContentWrapper>
      <figure className='w-full h-max'>
        <Image src={Banner2} alt='Middle Banner' className='w-full h-auto' />
      </figure>
      <HomeContentWrapper>
        <h2 className='text-center font-semibold text-2xl xs:text-3xl'>
          Herbal Beard Oil
        </h2>
      </HomeContentWrapper>
      <figure className='w-full h-max'>
        <Image src={Banner1} alt='Bottom Banner' className='w-full h-auto' />
      </figure>
      <HomeContentWrapper>
        <h2 className='text-center font-semibold text-2xl xs:text-3xl'>
          Clothing Range
        </h2>
      </HomeContentWrapper>
    </main>
  );
}
