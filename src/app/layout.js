import Header from '@/components/Header';
import './globals.css';

export const metadata = {
    title: 'Code Challenger',
    description: 'developed by @enszrlu',
    keywords: 'code, challenge, react, javascript, html, css'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header></Header>
                {children}
            </body>
        </html>
    );
}
