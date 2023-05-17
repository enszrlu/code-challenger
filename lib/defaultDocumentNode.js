// ./src/defaultDocumentNode.ts

import { DefaultDocumentNodeResolver } from 'sanity/desk';
import Iframe from 'sanity-plugin-iframe-pane';

export const defaultDocumentNode = (S, { schemaType }) => {
    switch (schemaType) {
        case `challenge`:
            return S.document().views([
                S.view.form(),
                S.view
                    .component(Iframe)
                    .options({
                        url: `${
                            process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
                        }/api/draft`,
                        reload: { button: true }
                    })
                    .title('Preview')
            ]);
        default:
            return S.document().views([S.view.form()]);
    }
};
