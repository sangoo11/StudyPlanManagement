import { Link } from 'react-router-dom'

function ErrorPage(props) {
    return (
        <div className="relative bg-black min-h-screen flex items-center justify-center">
            <svg
                width="1123"
                height="837"
                viewBox="0 0 1123 837"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
            >
                <rect width="1123" height="837" fill="black" />
                <g id="sky" filter="url(#filter0_d)">
                    <rect id="background" x="30" y="26" width="1063" height="777" rx="20" fill="black" />
                    <g id="stars">
                        <path d="M202.12 319.2C204.937 319.2 207.22 316.917 207.22 314.1C207.22 311.283 204.937 309 202.12 309C199.303 309 197.02 311.283 197.02 314.1C197.02 316.917 199.303 319.2 202.12 319.2Z" fill="white" />
                        <path d="M566.12 615.2C568.937 615.2 571.22 612.917 571.22 610.1C571.22 607.283 568.937 605 566.12 605C563.303 605 561.02 607.283 561.02 610.1C561.02 612.917 563.303 615.2 566.12 615.2Z" fill="white" />
                        <path d="M351.12 638.95C352.694 638.95 353.97 637.674 353.97 636.1C353.97 634.526 352.694 633.25 351.12 633.25C349.546 633.25 348.27 634.526 348.27 636.1C348.27 637.674 349.546 638.95 351.12 638.95Z" fill="white" />
                        <path d="M985.11 503.99C986.684 503.99 987.96 502.714 987.96 501.14C987.96 499.566 986.684 498.29 985.11 498.29C983.536 498.29 982.26 499.566 982.26 501.14C982.26 502.714 983.536 503.99 985.11 503.99Z" fill="white" />
                        <path d="M822.11 247.99C823.684 247.99 824.96 246.714 824.96 245.14C824.96 243.566 823.684 242.29 822.11 242.29C820.536 242.29 819.26 243.566 819.26 245.14C819.26 246.714 820.536 247.99 822.11 247.99Z" fill="white" />
                        <path d="M1053.11 372.99C1054.68 372.99 1055.96 371.714 1055.96 370.14C1055.96 368.566 1054.68 367.29 1053.11 367.29C1051.54 367.29 1050.26 368.566 1050.26 370.14C1050.26 371.714 1051.54 372.99 1053.11 372.99Z" fill="white" />
                        {/* Add more stars if needed */}
                    </g>
                    <g id="rocket">
                        {/* Add Rocket Paths Here */}
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d" x="0" y="0" width="1123" height="837" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="15" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                </defs>
            </svg>

            <div className="text-center text-white z-10">
                <h1 className="text-6xl font-bold mb-4 animate-bounce">404 Error</h1>
                <h2 className="text-3xl font-light mb-6">Couldn&#39;t launch :&#40;</h2>
                <h3 className="text-xl">
                    Page Not Found - let&#39;s take you <Link to='/' className="underline text-yellow-500">BACK</Link>
                </h3>
            </div>
        </div>
    );
};

export default ErrorPage;