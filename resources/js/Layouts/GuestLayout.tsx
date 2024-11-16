import { PropsWithChildren } from 'react';
import { Header } from '@/components/header';
import Footer from '@/components/Footer';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
                <div className="bg-gray-50 dark:bg-black dark:text-white/50 pt-1 pb-5">
                    {children}
                </div>
            <Footer />
        </>
    );
}
