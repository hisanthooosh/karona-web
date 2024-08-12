import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Static/Css/Alluarjun.css"

const ViewSharesModal = ({ onClose }) => {
    const [shares, setShares] = useState([]);
    const username = localStorage.getItem('username'); // Replace with actual username

    useEffect(() => {
        const fetchShares = async () => {
            try {
                const response = await axios.get(`http://localhost:9889/view_share_status/${username}`);
                console.log(response.data); // Log the response to check its structure
                setShares(response.data);
            } catch (error) {
                console.error("Error fetching shares:", error);
            }
        };
        fetchShares();
    }, [username]);
    

    return (
        // <div className="modal">
        //     {shares.map((share) => (
        //         <div key={share.movie_name}>
        //             <h3>{share.movie_name}</h3>
        //             <p>Total Shares: {share.total_shares}</p>
        //             <p>Released: {share.released}</p>
        //             <p>Holding: {share.holding}</p>
        //             <p>Sold Shares: {share.sold_shares}</p>
        //             <p>Remaining Shares: {share.remaining_shares}</p>
        //             <p>Validity: {share.validity}</p>
        //             {share.bookings.map((booking) => (
        //                 <div key={booking.username}>
        //                     <p>{booking.username} bought {booking.number_of_shares} shares</p>
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        //     <button onClick={onClose}>Close</button>
        // </div>
        <div className="pawankalyan_modal">
    <div className="pawankalyan_modal_content">
        {shares.map((share) => (
            <div key={share.movie_name} className="pawankalyan_modal_body">
                <div className="pawankalyan_modal_header">
                    <h3>{share.movie_name}</h3>
                </div>
                <p>Total Shares: {share.total_shares}</p>
                <p>Released: {share.released}</p>
                <p>Holding: {share.holding}</p>
                <p>Sold Shares: {share.sold_shares}</p>
                <p>Remaining Shares: {share.remaining_shares}</p>
                <p>Validity: {share.validity}</p>
                {share.bookings.map((booking) => (
                    <div key={booking.username} className="pawankalyan_booking_info">
                        <p>{booking.username} bought {booking.number_of_shares} shares</p>
                    </div>
                ))}
            </div>
        ))}
        <div className="pawankalyan_modal_footer">
            <button onClick={onClose}>Close</button>
        </div>
    </div>
</div>

    );
};

export default ViewSharesModal;