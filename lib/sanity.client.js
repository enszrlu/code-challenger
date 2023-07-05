import { createClient } from 'next-sanity';
import { createClient as createClientSanity } from '@sanity/client';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-05';
export const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false
});

export const clientSanity = createClientSanity({
    projectId,
    dataset,
    useCdn: false,
    apiVersion,
    token
});
