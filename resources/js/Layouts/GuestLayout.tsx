import { PropsWithChildren } from 'react';
import { Header } from '@/components/header';
import Footer from '@/components/Footer';
import { CartManager } from '@/hooks/CartManager';
import { useEffect } from'react';
import { usePage } from '@inertiajs/react';

export default function Guest({ children }: PropsWithChildren) {
    const user = usePage().props.auth;
    useEffect(() => {
        if (user){
        async function syncOnLogin() {
            await CartManager.fetchCart(); 
            await CartManager.syncCart(); 
        }
        syncOnLogin();
    }
    }, [user]);
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
