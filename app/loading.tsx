import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Image
        src="/images/logo-light.svg"
        alt="Loading..."
        width={201}
        height={48}
        className="animate-pulse-scale"
      />
    </div>
  );
};

export default Loading;
