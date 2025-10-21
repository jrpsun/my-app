'use client'

import React, { useEffect, useState } from 'react';

type Card = {
  id: number;
  name: string;
  card_images: { image_url: string }[];
};

const page = () => {
    const [mainpool, setMainpool] = useState<Card[]>([]);
    const [extrapool, setExtrapool] = useState<Card[]>([]);
    const [maindeck, setMaindeck] = useState<Card[]>([]);
    const [extradeck, setExtradeck] = useState<Card[]>([]);
    const [randomCards, setRandomCards] = useState<Card[]>([]);
    const [currentDeckType, setCurrentDeckType] = useState<'main' | 'extra' | null>(null);

    const MAX_MAIN = 40;
    const MAX_EXTRA = 15;

    const fetchAllCards = async () => {
        try {
            const responseMain = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal%20Monster,Effect%20Monster,Spell%20Card,Trap%20Card');
            const dataMain = await responseMain.json();
            setMainpool(dataMain.data);

            const responseExtra = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Fusion%20Monster,Synchro%20Monster,Xyz%20Monster,Link%20Monster');
            const dataExtra = await responseExtra.json();
            setExtrapool(dataExtra.data);
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useEffect(() => {
        fetchAllCards();
    }, []);

    const getCards = (type: any) => {
        setCurrentDeckType(type);
        const pool = type === 'main' ? mainpool : extrapool;
        const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
        setRandomCards(shuffled);
    };

    const addToDeck = (card: any, type: any) => {
        if (type === 'main') {
            if (maindeck.length >= MAX_MAIN) return;
                const updated = [...maindeck, card];
                setMaindeck(updated);
            if (updated.length < MAX_MAIN) {
                getCards('main');
            } else {
                setRandomCards([]);
            }
        } else {
            if (extradeck.length >= MAX_EXTRA) return;
                const updated = [...extradeck, card];
                setExtradeck(updated);
            if (updated.length < MAX_EXTRA) {
                getCards('extra');
            } else {
                setRandomCards([]);
            }
        }
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Yu-Gi-Oh! Deck Builder</h1>

        <div className="flex gap-4 mb-4">
            <button
            onClick={() => getCards('main')}
            disabled={maindeck.length >= MAX_MAIN || mainpool.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
            สุ่ม Main Deck
            </button>
            <button
            onClick={() => getCards('extra')}
            disabled={extradeck.length >= MAX_EXTRA || extrapool.length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
            สุ่ม Extra Deck
            </button>
        </div>

        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">🎲 การ์ดที่สุ่มมา</h2>
            <div className="flex flex-wrap gap-4">
            {randomCards.map((card) => (
                <div
                key={card.id}
                onClick={() => addToDeck(card, currentDeckType)}
                className="w-28 cursor-pointer border rounded hover:scale-120 transition-all duration-200 ease-in-out relative"
                >
                <img src={card.card_images[0].image_url} alt={card.name} className="w-full object-cover rounded"  />
                </div>
            ))}
            </div>
        </div>
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
                🗂 Main Deck ({maindeck.length} / {MAX_MAIN})
            </h2>
            <div className="flex flex-wrap gap-2">
                {maindeck.map((card) => (
                <div key={card.id} className="w-28 h-32 border rounded flex flex-col items-center">
                    <img
                    src={card.card_images[0].image_url}
                    alt={card.name}
                    className="w-full object-cover rounded-t"
                    />
                </div>
                ))}
            </div>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
                🗂 Main Deck ({extradeck.length} / {MAX_EXTRA})
            </h2>
            <div className="flex flex-wrap gap-2">
                {extradeck.map((card) => (
                <div key={card.id} className="w-28 h-32 border rounded flex flex-col items-center">
                    <img
                    src={card.card_images[0].image_url}
                    alt={card.name}
                    className="w-full object-cover rounded-t"
                    />
                </div>
                ))}
            </div>
        </section>
        </div>
    )
}

export default page