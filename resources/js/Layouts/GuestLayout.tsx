import { PropsWithChildren } from 'react';
import { Header } from '@/components/header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { logUserActivity } from '@/Pages/Admin/Analytics/logUserActivity';

export default function Guest({ children }: PropsWithChildren) {
    logUserActivity();
    return (
        <>
            <Header />
            <Toaster />
                <div className="pt-1 pb-5">
                    {children}
                </div>
            <Footer />
        </>
    );
}
