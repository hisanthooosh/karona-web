import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import axios from 'axios';
import "../Static/Css/Alluarjun.css"

const PortfolioModal = () => {
  const { username } = useParams(); // Extract username from URL params
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:9889/profile/portfolio/${username}`);
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };
    fetchPortfolioData();
  }, [username]);

  return (
    // <div className="modal">
    //   <div className="modal-content">
    //     <h2>Portfolio</h2>
    //     <ul>
    //       {portfolioData.map((share, index) => (
    //         <li key={index} style={{ border: '2px solid black' }}>
    //           <p>Movie: {share.movie_name}</p>
    //           <p>Description: {share.movie_description}</p>
    //           <p>Area of Releasing: {share.area_of_releasing}</p>
    //           <p>Number of Theatres: {share.number_of_theatres}</p>
    //           <p>Number of Shows Per Day: {share.number_of_shows_per_day}</p>
    //           <p>Additional Information: {share.additional_information}</p>
    //           <p>Total Expenditure: {share.total_expenditure}</p>
    //           <p>Number of Shares Divided: {share.number_of_shares_divided}</p>
    //           <p>Cost of Each Share: {share.cost_of_each_share}</p>
    //           <p>Number of Shares Holding: {share.number_of_shares_holding}</p>
    //           <p>Number of Shares Released: {share.number_of_shares_released}</p>
    //           <p>Number of Shares Limited: {share.number_of_shares_limited}</p>
    //           <p>Validity: {share.share_validity}</p>
    //           {share.poster && (
    //             <img src={`data:image/jpeg;base64,${share.poster}`} alt="Poster" style={{ height: 100, width: 100 }} />
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <div className="hello_modal">
    <div className="hello_modal-content">
        <h2>Portfolio</h2>
        <ul>
            {portfolioData.map((share, index) => (
                <li key={index}>
                    <p>Movie: {share.movie_name}</p>
                    <p>Description: {share.movie_description}</p>
                    <p>Area of Releasing: {share.area_of_releasing}</p>
                    <p>Number of Theatres: {share.number_of_theatres}</p>
                    <p>Number of Shows Per Day: {share.number_of_shows_per_day}</p>
                    <p>Additional Information: {share.additional_information}</p>
                    <p>Total Expenditure: {share.total_expenditure}</p>
                    <p>Number of Shares Divided: {share.number_of_shares_divided}</p>
                    <p>Cost of Each Share: {share.cost_of_each_share}</p>
                    <p>Number of Shares Holding: {share.number_of_shares_holding}</p>
                    <p>Number of Shares Released: {share.number_of_shares_released}</p>
                    <p>Number of Shares Limited: {share.number_of_shares_limited}</p>
                    <p>Validity: {share.share_validity}</p>
                    {share.poster && (
                        <img src={`data:image/jpeg;base64,${share.poster}`} alt="Poster" />
                    )}
                </li>
            ))}
        </ul>
    </div>
</div>

  );
};

export default PortfolioModal;