import Image from 'next/image';
import Link from 'next/link';
import urlFor from '@/../lib/urlFor';

export const RichTextComponent = {
    types: {
        image: ({ value }) => {
            return (
                <div className="relative m-10 mx-auto h-96 w-full">
                    <Image
                        className="object-contain"
                        src={urlFor(value).url()}
                        alt="Blog post Image"
                        fill
                    ></Image>
                </div>
            );
        }
    },
    list: {
        bullet: ({ children }) => <ul className="ml-10 list-disc space-y-5 py-5">{children}</ul>,
        number: ({ children }) => <ol className="mt-lg list-decimal">{children}</ol>
    },
    block: {
        h1: ({ children }) => <h1 className="py-10 text-5xl font-bold">{children}</h1>,
        h2: ({ children }) => <h1 className="py-10 text-4xl font-bold">{children}</h1>,
        h3: ({ children }) => <h1 className="py-10 text-3xl font-bold">{children}</h1>,
        h4: ({ children }) => <h1 className="py-10 text-2xl font-bold">{children}</h1>,

        blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-4 border-l-emphasize py-5 pl-5">
                {children}
            </blockquote>
        )
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;

            return (
                <Link
                    href={value.href}
                    rel={rel}
                    className="underline decoration-emphasize hover:decoration-black"
                >
                    {children}
                </Link>
            );
        }
    }
};
