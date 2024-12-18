import React, { useState } from 'react';
import axios from 'axios';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const HomepageBuilder: React.FC = () => {
    const [layout, setLayout] = useState<any>('');
    const [preview, setPreview] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLayout(e.target.value);
    };

    const previewLayout = async () => {
        try {
            const response = await axios.post('/shortcodes/parse', { content: layout });
            console.log("response",response)
            setPreview(response.data.content);
        } catch (error) {
            console.error('Error generating preview:', error);
        }
    };

    const saveLayout = async () => {
 
       
        try {
          // const response = await axios.post('/shortcodes/parse', { content: layout });
            await axios.post('/admin/homepage', { title: 'Homepage', content:layout});
            alert('Layout saved!');
        } catch (error) {
            console.error('Error saving layout:', error);
        }
    };
    
    return (
      <Authenticated>

 
        <div>
            <textarea value={layout} onChange={handleInputChange} placeholder="Enter shortcodes here..." />
            <button onClick={previewLayout}>Preview</button>
            <button onClick={saveLayout}>Save</button>
            <div dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
      </Authenticated>
      
    );
};

export default HomepageBuilder;
