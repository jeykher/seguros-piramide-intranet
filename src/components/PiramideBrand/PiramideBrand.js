import React from "react";

const PiramideBrand = ({ width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={width}
            height={height}
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 62 75"
            xmlSpace="preserve"
        >
            <path
                fill="#E39B30"
                d="M4.018 11.803v.002a3.553 3.553 0 00-.478 1.678l.004 59.528 15.967-9.222.042-.021.047-.026a3.575 3.575 0 001.692-2.937V21.776L4.018 11.803z"
            ></path>
            <path
                fill="#A32531"
                d="M56.313 41.996a3.563 3.563 0 00.472-1.685l.003-16.578a3.575 3.575 0 00-.476-1.681L39.04 32.024l17.273 9.972z"
            ></path>
            <path
                fill="#D35B2B"
                d="M21.293 1.83h-.003a3.54 3.54 0 00-1.688.428l-14.36 8.294c-.528.321-.937.75-1.224 1.25l17.275 9.973V1.83z"
            ></path>
            <path
                fill="#CC2229"
                d="M56.313 22.05a3.511 3.511 0 00-1.222-1.253L39.04 11.531l-16.054-9.27a3.509 3.509 0 00-1.693-.431v19.946L39.04 32.024l17.273-9.972v-.002z"
            ></path>
            <defs>
                <path
                id="SVGID_1_"
                d="M21.293 42.27l15.969 9.224v-.005l.019.014.072.044c.54.284 1.116.426 1.688.42a3.555 3.555 0 001.685-.416l14.367-8.302a3.536 3.536 0 001.223-1.252L39.04 32.025 21.293 42.27z"
                ></path>
            </defs>
            <clipPath id="SVGID_2_">
                <use overflow="visible" xlinkHref="#SVGID_1_"></use>
            </clipPath>
            <linearGradient
                id="SVGID_3_"
                x1="-167.354"
                x2="-166.701"
                y1="435.652"
                y2="435.652"
                gradientTransform="scale(46.6194 -46.6194) rotate(30.001 731.5 530.595)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#BFC0C1"></stop>
                <stop offset="1" stopColor="#808183"></stop>
            </linearGradient>
            <path
                fill="url(#SVGID_3_)"
                d="M12.654 37.012L47.558 16.86 64.952 46.985 30.048 67.137z"
                clipPath="url(#SVGID_2_)"
            ></path>
        </svg>
    );
}

export default PiramideBrand;