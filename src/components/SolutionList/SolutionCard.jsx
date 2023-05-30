import ClientSideRoute from '../ClientSideRoute';
import Image from 'next/image';

function SolutionCard({ solution, challenge }) {
    return (
        <ClientSideRoute route={`/solution/${solution.id}`}>
            <div className="flex flex-col group cursor-pointer rounded-2xl border-2 overflow-hidden shadow-lg dark:bg-slate-900 dark:text-gray-200 h-full dark:border-slate-900">
                <div className="relative w-full h-64 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                    <Image
                        className="object-cover object-top lg:object-top"
                        src={`data:image/png;base64,${solution.desktop_screenshot.toString(
                            'base64'
                        )}`}
                        alt={solution.title}
                        fill
                    ></Image>
                </div>
                <div className="flex flex-col p-5 gap-5">
                    <h1
                        className="w-full text-center text-sm font-light line-clamp-1 break-words border-b-2"
                        title={challenge.title}
                    >
                        {challenge.title}
                    </h1>
                    <h1
                        className="w-full text-center text-2xl font-bold h-24 line-clamp-3 break-words"
                        title={solution.title}
                    >
                        {solution.title}
                    </h1>

                    <div className="flex justify-between items-center w-full">
                        {/* User */}
                        <p className="line-clamp-1" title={solution.user_name}>
                            {solution.user_name}
                        </p>
                        <p className="text-sm font-light whitespace-nowrap">
                            {new Date(solution.date).toLocaleString()}
                        </p>
                    </div>
                    {/* Summary */}
                    <p className="text-sm font-light line-clamp-5">{solution.summary}</p>
                </div>
            </div>
        </ClientSideRoute>
    );
}

export default SolutionCard;
