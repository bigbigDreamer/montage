import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type FeatureItem = {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
    imgUrl: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: '功能强大',
        Svg: require('@site/static/img/icons8-human-torch.svg').default,
        imgUrl: 'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/5pIALW.jpg',
        description: <>提供了各种各样的组件以及工具🔧。</>,
    },
    {
        title: '开箱即用',
        Svg: require('@site/static/img/icons8-toolbox.svg').default,
        imgUrl: 'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/5pIALW.jpg',
        description: <>npm 包形式下载使用，完全的 typescript 支持。</>,
    },
    {
        title: 'For React',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        imgUrl: 'https://to-out-use.oss-cn-hangzhou.aliyuncs.com/common/5pIALW.jpg',
        description: <>大部分组件以及工具是针对 React 而言的。</>,
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
