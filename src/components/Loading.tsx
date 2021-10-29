import Lottie from 'react-lottie-player';
import lottieJson from '../assets/animations/blockchain-animation.json';

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 500, height: 500 }}
        speed={2}
      />
    </div>
  );
};

export default Loading;
