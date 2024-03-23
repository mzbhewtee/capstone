import React, { useEffect, useState } from "react";
import { auth, storage, db } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, getDoc, doc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { set } from "date-fns";

function AddNews() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email === 'abimbolaikus@gmail.com') {
                setUser(user);
            } else {
                navigate('/signin'); // Redirect to login page if user is not authenticated or is not abimbolaikus@gmail.com
            }
        });
        return unsubscribe;
    }, [navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Replace newline characters with the special delimiter
        const contentWithDelimiter = content.replace(/\n/g, '|n|');
    
        if (image) {
            const storageRef = ref(storage, `news/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', snapshot => {
            }, error => {
                console.error(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    if (id) {
                        updateDoc(doc(db, 'news', id), {
                            header,
                            paragraph,
                            content: contentWithDelimiter, // Store content with delimiter
                            imageUrl: downloadURL,
                            timestamp: serverTimestamp()
                        }).then(() => {
                            navigate('/dashboard');
                        });
                    } else {
                        addDoc(collection(db, 'news'), {
                            header,
                            paragraph,
                            content: contentWithDelimiter, // Store content with delimiter
                            imageUrl: downloadURL,
                            timestamp: serverTimestamp()
                        }).then(() => {
                            navigate('/dashboard');
                        });
                    }
                });
            });
        } else {
            if (id) {
                updateDoc(doc(db, 'news', id), {
                    header,
                    paragraph,
                    content: contentWithDelimiter, // Store content with delimiter
                    imageUrl,
                    timestamp: serverTimestamp()
                }).then(() => {
                    navigate('/dashboard');
                });
            } else {
                addDoc(collection(db, 'news'), {
                    header,
                    paragraph,
                    content: contentWithDelimiter, // Store content with delimiter
                    imageUrl,
                    timestamp: serverTimestamp()
                }).then(() => {
                    navigate('/dashboard');
                });
            }
        }
    }
    
    
    useEffect(() => {
        if (id) {
            getDoc(doc(collection(db, 'news'), id)).then((doc) => {
                if (doc.exists()) {
                    setHeader(doc.data().header);
                    setParagraph(doc.data().paragraph);
                    // Restore newline characters
                    setContent(doc.data().content.replace(/\|n\|/g, '\n'));
                    setImageUrl(doc.data().imageUrl);
                }
            });
        }
    }, [id]);
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <h1 className="text-2xl font-bold mb-2">{id ? 'Edit News' : 'Add News'}</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="header" className="block text-sm font-medium text-gray-700">Header</label>
                        <input type="text" id="header" name="header" value={header} onChange={(e) => setHeader(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paragraph" className="block text-sm font-medium text-gray-700">Paragraph</label>
                        <textarea id="paragraph" name="paragraph" value={paragraph} onChange={(e) => setParagraph(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
                    </div>
                    <button type="submit" className="w-full p-2 bg-primary text-white rounded-md">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddNews;
