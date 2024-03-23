import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Sidebar } from '../components/Sidebar';
import { useParams } from 'react-router-dom';

function NewsPage() {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsCollection = collection(db, 'news');
                const newsSnapshot = await getDocs(newsCollection);
                const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const selectedNews = newsData.find(news => news.id === id);
                
                console.log('Selected News:', selectedNews);
                
                if (selectedNews) {
                    const updatedContent = selectedNews.content.split('|n|').join('\n');
                    const updatedParagraph = selectedNews.paragraph.split('|n|').join('\n');
                    
                    console.log('Updated Content:', updatedContent);
                    console.log('Updated Paragraph:', updatedParagraph);
                    
                    setNews({
                        ...selectedNews,
                        content: updatedContent,
                        paragraph: updatedParagraph
                    });
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [id]);
    
    return (
        <div>
            <Sidebar />
            <div className="md:mr-10 md:ml-10 mb-10 font-link">
                <div className="items-center justify-between m-10">
                    <div className="md:p-8 p-5 text-justify">
                        <h1 className="text-2xl font-bold mb-2">{news?.header}</h1>
                        <p className="text-md whitespace-pre-wrap">{news?.paragraph}</p>
                    </div>
                    <div className="p-8 flex justify-center">
                        <img src={news?.imageUrl} alt="news" className='h-96' />
                    </div>
                    <p className="text-md text-justify whitespace-pre-wrap">{news?.content}</p>
                </div>
            </div>
        </div>
    );
}

export default NewsPage;
