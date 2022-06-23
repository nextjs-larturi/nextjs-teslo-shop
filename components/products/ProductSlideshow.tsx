import React, { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideshow.module.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
        easing='ease'
        duration={7000}
        indicators
    >
        {
            images.map((image, index) => {
                const url = `/products/${image}`;
                return (
                    <div className={styles['each-slide']} key={index}>
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover'
                        }}>

                        </div>
                    </div>
                )
            })
        }
    </Slide>
  )
}

export default ProductSlideshow;