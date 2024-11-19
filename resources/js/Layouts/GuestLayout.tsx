import { PropsWithChildren } from 'react';
import { Header } from '@/components/header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <Toaster />
                <div className="bg-gray-50 dark:bg-black dark:text-white/50 pt-1 pb-5">
                    {children}
                </div>
            <Footer />
        </>
    );
}
