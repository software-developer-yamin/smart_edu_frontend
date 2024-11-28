import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton
} from '@/components/ui/core/carousel';
import Image from 'next/image';
import { imgPreview } from '@/constants/data';

export default function ImageCarousel() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <Carousel options={OPTIONS} isAutoPlay={true} className="mx-auto w-4/5">
      <SliderContainer className="gap-2">
        <Slider className="w-full">
          <div className="h-[400px] w-full bg-white dark:bg-black">
            <Image
              src={imgPreview.img9}
              width={1400}
              height={800}
              alt="image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </Slider>
        <Slider className="w-full">
          <div className="h-[400px] w-full bg-white dark:bg-black">
            <Image
              src={imgPreview.img10}
              width={1200}
              height={800}
              alt="image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </Slider>
        <Slider className="w-full">
          <div className="h-[400px] w-full bg-white dark:bg-black">
            <Image
              src={imgPreview.img11}
              width={1200}
              height={800}
              alt="image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </Slider>
        <Slider className="w-full">
          <div className="h-[400px] w-full bg-white dark:bg-black">
            <Image
              src={imgPreview.img12}
              width={1200}
              height={800}
              alt="image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </Slider>
      </SliderContainer>
      <div className="flex justify-center py-4">
        <SliderDotButton />
      </div>
    </Carousel>
  );
}
