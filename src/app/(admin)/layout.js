import '../globals.css';

export const metadata = {
    title: 'Code Challenger',
    description: 'developed by @enszrlu',
    keywords: 'code, challenge, react, javascript, html, css'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
