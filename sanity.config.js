/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { defaultDocumentNode } from './lib/defaultDocumentNode';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';
import { myTheme } from './theme';
import StudioNavbar from '@/components/StudioNavbar';

export default defineConfig({
    basePath: '/studio',
    name: 'Code-Challenger-Studio',
    title: 'Code Challenger Studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        deskTool({
            defaultDocumentNode
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion })
    ],
    theme: myTheme,
    studio: {
        components: {
            navbar: StudioNavbar
        }
    }
});
