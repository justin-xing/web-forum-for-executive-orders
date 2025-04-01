import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

function DocumentForm() {
    const [formData, setFormData] = useState({
        pdf_url: '',
        citation: '',
        start_page: '',
        end_page: '',
        title: '',
        signing_date: '',
        publication_date: '',
        tag: '',
        president: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let user = localStorage.getItem("user");
        const userId = JSON.parse(user).uid;
        console.log(userId)

        if (!userId) {
            alert('User not logged in.');
            return;
        }

        const dataToSend = {
            ...formData,
            user_id: userId,
        };

        try {
            const response = await fetch('/api/document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('Document created successfully!');
            setFormData({
                pdf_url: '',
                citation: '',
                start_page: '',
                end_page: '',
                title: '',
                signing_date: '',
                publication_date: '',
                tag: '',
                president: '',
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the document.');
        }
    };

    const { user } = useAuth();

    if (!user || user.role !== "admin") {
        return (
          <div className="h-screen flex justify-center items-center text-2xl">
            <div className="text-center">
              <div>Access Denied</div>
              <div className="text-xl italic text-gray-500">
                User is not an admin
              </div>
            </div>
          </div>
        );
      }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Create New Document</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="pdf_url" className="block text-sm font-medium text-gray-700">PDF URL:</label>
                    <input type="url" id="pdf_url" name="pdf_url" value={formData.pdf_url} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="citation" className="block text-sm font-medium text-gray-700">Citation:</label>
                    <input type="text" id="citation" name="citation" value={formData.citation} onChange={handleChange} maxLength="15" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="start_page" className="block text-sm font-medium text-gray-700">Start Page:</label>
                    <input type="number" id="start_page" name="start_page" value={formData.start_page} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="end_page" className="block text-sm font-medium text-gray-700">End Page:</label>
                    <input type="number" id="end_page" name="end_page" value={formData.end_page} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} maxLength="100" required className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="signing_date" className="block text-sm font-medium text-gray-700">Signing Date:</label>
                    <input type="date" id="signing_date" name="signing_date" value={formData.signing_date} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700">Publication Date:</label>
                    <input type="date" id="publication_date" name="publication_date" value={formData.publication_date} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag:</label>
                    <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} maxLength="50" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="president" className="block text-sm font-medium text-gray-700">President:</label>
                    <input type="text" id="president" name="president" value={formData.president} onChange={handleChange} maxLength="50" className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
}

export default DocumentForm;