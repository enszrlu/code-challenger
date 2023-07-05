import SubmitDesignForm from '@/components/Design/SubmitDesignForm';
import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';

export const revalidate = 60;

export default async function SubmitDesignPage() {
    // Fetch Difficulties & Categories & Assets & Authors from Sanity
    const difficulties = await client.fetch(groq`*[_type == "difficulty"]`);
    const categories = await client.fetch(groq`*[_type == "category"]`);
    const assets = await client.fetch(groq`*[_type == "assets"]`);

    // console.log('difficulties: ', difficulties);
    // console.log('categories: ', categories);
    // console.log('assets: ', assets);

    return (
        <div>
            {/* Header */}
            <div className="flex w-full px-auto sm:px-10 justify-between items-center border-2 bg-gray-100 dark:bg-gray-300">
                <h1 className="text-primary font-bold text-lg md:text-2xl dark:text-secondary my-3">
                    Submit Design
                </h1>
                {/* Challenge Title */}
            </div>
            <SubmitDesignForm
                difficultiesData={difficulties}
                categoriesData={categories}
                assetsData={assets}
            />
        </div>
    );
}
