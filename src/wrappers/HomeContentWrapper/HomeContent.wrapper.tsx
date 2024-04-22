import { ReactNode } from 'react';

const HomeContentWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <section className='px-8 max-lg:px-6 max-md:px-5'>
      <div className='w-primary max-[1430px]:w-full mx-auto py-5 xs:pt-10 xs:pb-14'>
        {children}
      </div>
    </section>
  );
};

export default HomeContentWrapper;
