import React from 'react';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator';
import Footer from '@/components/Footer';

const HomePage = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-1 flex justify-center items-center p-5 mt-3">
                <Calculator />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;