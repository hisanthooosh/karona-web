import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Static/Css/Alluarjun.css"
const BuyShareModal = ({ onClose }) => {
    const [shares, setShares] = useState([]);
    const [selectedShare, setSelectedShare] = useState(null);
    const [numberOfShares, setNumberOfShares] = useState(1);
    const username = localStorage.getItem('username'); // Replace with actual username

    useEffect(() => {
        const fetchShares = async () => {
            try {
                const response = await axios.get('http://localhost:9889/shares'); // Updated endpoint
                setShares(response.data);
            } catch (error) {
                console.error("Error fetching shares:", error);
            }
        };
        fetchShares();
    }, []);

    const handleBuyShare = async () => {
        try {
            await axios.post('http://localhost:9889/buy_share', {
                username,
                share_id: selectedShare.id,
                number_of_shares: numberOfShares
            });
            alert('Share bought successfully');
            onClose();
        } catch (error) {
            alert('Error buying share');
        }
    };

    return (
        // <div className="modal">
        //     {shares.map((share) => (
        //         <div key={share.id} onClick={() => setSelectedShare(share)}>
        //             <h3>{share.movie_name}</h3>
        //             {/* Additional share details */}
        //         </div>
        //     ))}
        //     {selectedShare && (
        //         <div>
        //             <h3>{selectedShare.movie_name}</h3>
        //             <p>Total Shares: {selectedShare.total_shares}</p>
        //             <p>Released: {selectedShare.released}</p>
        //             <p>Holding: {selectedShare.holding}</p>
        //             <p>Validity: {selectedShare.validity}</p>
        //             <input
        //                 type="number"
        //                 value={numberOfShares}
        //                 onChange={(e) => setNumberOfShares(e.target.value)}
        //                 max={selectedShare.number_of_shares_limited}
        //             />
        //             <button onClick={handleBuyShare}>Buy Share</button>
        //         </div>
        //     )}
        //     <button onClick={onClose}>Close</button>
        // </div>
        <div className="chiranjeevi_modal">
    <div className="chiranjeevi_modal_content">
        {shares.map((share) => (
            <div key={share.id} className="chiranjeevi_share_item" onClick={() => setSelectedShare(share)}>
                <h3>{share.movie_name}</h3>
                {/* Additional share details */}
            </div>
        ))}
        {selectedShare && (
            <div className="chiranjeevi_share_details">
                <h3>{selectedShare.movie_name}</h3>
                <p>Total Shares: {selectedShare.total_shares}</p>
                <p>Released: {selectedShare.released}</p>
                <p>Holding: {selectedShare.holding}</p>
                <p>Validity: {selectedShare.validity}</p>
                <input
                    type="number"
                    value={numberOfShares}
                    onChange={(e) => setNumberOfShares(e.target.value)}
                    max={selectedShare.number_of_shares_limited}
                />
                <button onClick={handleBuyShare}>Buy Share</button>
            </div>
        )}
        <div className="chiranjeevi_modal_footer">
            <button onClick={onClose}>Close</button>
        </div>
    </div>
</div>

    );
};

export default BuyShareModal;