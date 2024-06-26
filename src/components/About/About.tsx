import React from 'react';
import CheckList from '../utils/CheckList/CheckList';
import { quotusFeatures } from '@/data/dataQuotusFeature';
import style from './about.module.css';
import Image from 'next/image';

const About = () => {



    return (
        <section className={style.container}>
            <div className={style.featureContainer}>
                <h2>INTRODUCING QUOTUS</h2>
                <p>The breakthrough in financial intelligence for automotive retail groups</p>
                <div className={style.checkListContainer}>
                    {quotusFeatures.map((item, key) => (
                        <CheckList text={item.text} key={item.id} />
                    ))}
                </div>
            </div>
            <div className={style.imageContainer}>
                <Image src="/images/quotus-feature.webp" alt='logo quotus' width={700} height={500} priority={true} />
            </div>
        </section>
    )
}

export default About