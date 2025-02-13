import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import slide_1 from '../images/slider/sliderImg_1.jpg';
import slide_2 from '../images/slider/sliderImg_2.jpg';
import slide_3 from '../images/slider/sliderImg_3.jpg';
import slide_4 from '../images/slider/sliderImg_4.jpg';

const Banner = () => {
    return (
    <div className='relative'>
            <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={3000}>
                <div>
                    <Image src={slide_1} alt='' />
                </div>
                <div>
                    <Image src={slide_2} alt='' />
                </div>
                <div>
                    <Image src={slide_3} alt='' />
                </div>
                <div>
                    <Image src={slide_4} alt='' />
                </div>
            </Carousel>
                <div className='w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20'></div>
    </div>
    )
}

export default Banner
