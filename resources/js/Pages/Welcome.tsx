import { Head } from '@inertiajs/react';
import Guest from '@/Layouts/GuestLayout';
import ShortcodeParser from '@/components/ShortcodeParser';

interface HomepageProps {
  content: string;
}

export default function Welcome({ content} : HomepageProps) {

    return (
        <Guest>
     
            <Head title="Welcome " />
           
               
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-4 lg:max-w-8xl">
                        <div className='flex flex-row gap-y-10'>

                        <ShortcodeParser content={content} />
                        </div>
                        
                    </div>
                </div>
          
        </Guest>
    );
}
