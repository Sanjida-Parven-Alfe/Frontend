import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#0f172a]">
            <InfinitySpin width='200' color="#0D9488" />
            <p className="text-brand-teal font-bold animate-pulse mt-4">Loading StyleDecor...</p>
        </div>
    );
};

export default Loading;