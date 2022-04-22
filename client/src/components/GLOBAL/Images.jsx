import React from 'react';

export function Icon({ src, height, width, classname, href, altText }) {
    const link = href ? href : '';
    const alt = altText ? altText : '';
    const classes = classname ? classname : '';
    const styles = {
        height: height ? height : '50px',
        width: width ? width : '50px',
    };
    console.log({ styles });
    return (
        <a className={classes} href={link}>
            <span>
                <img
                    loading="lazy"
                    src={src}
                    alt={alt}
                    className="icon"
                    width={styles.width}
                    height={styles.height}
                />
            </span>
        </a>
    );
}

export function Image({ src, height, width, classname, href, altText }) {
    const link = href ? href : '';
    const alt = altText ? altText : '';
    const classes = classname ? classname : '';
    const styles = {
        height: height ? height : 'auto',
        width: width ? width : '40%',
    };
    return (
        <a className={classes} href={link}>
            <span>
                <img
                    loading="lazy"
                    src={src}
                    alt={alt}
                    width={styles.width}
                    height={styles.height}
                />
            </span>
        </a>
    );
}
