import Header from '@/components/Header';
import '../globals.css';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
    title: 'Code Challenger',
    description: 'developed by @enszrlu',
    keywords: 'code, challenge, react, javascript, html, css'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen dark:bg-slate-700">
                <ThemeProvider>
                    <Header></Header>
                    <div className="flex-1">{children}</div>
                    <Footer></Footer>
                </ThemeProvider>
            </body>
        </html>
    );
}
