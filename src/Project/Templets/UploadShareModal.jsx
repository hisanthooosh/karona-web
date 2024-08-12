// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadShareModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         username: localStorage.getItem('username'), movie_name: '', movie_description: '', area_of_releasing: '', number_of_theatres: '',
//         number_of_shows_per_day: '', additional_information: '', total_expenditure: '', number_of_shares_divided: '',
//         cost_of_each_share: '', number_of_shares_holding: '', number_of_shares_released: '', number_of_shares_limited: '',
//         share_validity: '', poster: null
//     });

//     const handleChange = (e) => {
//         const { name, value, type, files } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'file' ? files[0] : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         for (const key in formData) {
//             data.append(key, formData[key]);
//         }
//         try {
//             await axios.post('http://localhost:9889/upload_share', data);
//             alert('Share uploaded successfully');
//             onClose();
//         } catch (error) {
//             alert('Error uploading share');
//         }
//     };

//     return (
//         <div className="modal">
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
//                 <input type="text" name="movie_name" value={formData.movie_name} onChange={handleChange} placeholder="Movie Name" />
//                 <textarea name="movie_description" value={formData.movie_description} onChange={handleChange} placeholder="Movie Description"></textarea>
//                 <input type="text" name="area_of_releasing" value={formData.area_of_releasing} onChange={handleChange} placeholder="Area of Releasing" />
//                 <input type="number" name="number_of_theatres" value={formData.number_of_theatres} onChange={handleChange} placeholder="Number of Theatres" />
//                 <input type="number" name="number_of_shows_per_day" value={formData.number_of_shows_per_day} onChange={handleChange} placeholder="Number of Shows Per Day" />
//                 <textarea name="additional_information" value={formData.additional_information} onChange={handleChange} placeholder="Additional Information"></textarea>
//                 <input type="number" name="total_expenditure" value={formData.total_expenditure} onChange={handleChange} placeholder="Total Expenditure" />
//                 <input type="number" name="number_of_shares_divided" value={formData.number_of_shares_divided} onChange={handleChange} placeholder="Number of Shares Divided" />
//                 <input type="number" name="cost_of_each_share" value={formData.cost_of_each_share} onChange={handleChange} placeholder="Cost of Each Share" />
//                 <input type="number" name="number_of_shares_holding" value={formData.number_of_shares_holding} onChange={handleChange} placeholder="Number of Shares Holding" />
//                 <input type="number" name="number_of_shares_released" value={formData.number_of_shares_released} onChange={handleChange} placeholder="Number of Shares Released" />
//                 <input type="number" name="number_of_shares_limited" value={formData.number_of_shares_limited} onChange={handleChange} placeholder="Number of Shares Limited to a Person" />
//                 <input type="date" name="share_validity" value={formData.share_validity} onChange={handleChange} placeholder="Share Validity" />
//                 <input
//                     type="file"
//                     name="poster"
//                     onChange={handleChange}
//                     style={{
//                         display: 'block',
//                         marginBottom: '15px',
//                         padding: '10px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                         fontSize: '16px',
//                         backgroundColor: '#fff'
//                     }}
//                 />

//                 <button type="submit">Upload Share</button>
//                 <button type="button" onClick={onClose}>Close</button>
//             </form>
//         </div>
//     );
// };

// export default UploadShareModal;


import React, { useState } from 'react';
import axios from 'axios';
import '../Static/Css/Alluarjun.css';

const UploadShareModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: localStorage.getItem('username'), movie_name: '', movie_description: '', area_of_releasing: '', number_of_theatres: '',
        number_of_shows_per_day: '', additional_information: '', total_expenditure: '', number_of_shares_divided: '',
        cost_of_each_share: '', number_of_shares_holding: '', number_of_shares_released: '', number_of_shares_limited: '',
        share_validity: '', poster: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            await axios.post('http://localhost:9889/upload_share', data);
            alert('Share uploaded successfully');
            onClose();
        } catch (error) {
            alert('Error uploading share');
        }
    };

    return (
        <div className="allu_arjun_modal">
            <form onSubmit={handleSubmit} className="allu_arjun_form">
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="allu_arjun_input" />
                <input type="text" name="movie_name" value={formData.movie_name} onChange={handleChange} placeholder="Movie Name" className="allu_arjun_input" />
                <textarea name="movie_description" value={formData.movie_description} onChange={handleChange} placeholder="Movie Description" className="allu_arjun_textarea"></textarea>
                <input type="text" name="area_of_releasing" value={formData.area_of_releasing} onChange={handleChange} placeholder="Area of Releasing" className="allu_arjun_input" />
                <input type="number" name="number_of_theatres" value={formData.number_of_theatres} onChange={handleChange} placeholder="Number of Theatres" className="allu_arjun_input" />
                <input type="number" name="number_of_shows_per_day" value={formData.number_of_shows_per_day} onChange={handleChange} placeholder="Number of Shows Per Day" className="allu_arjun_input" />
                <textarea name="additional_information" value={formData.additional_information} onChange={handleChange} placeholder="Additional Information" className="allu_arjun_textarea"></textarea>
                <input type="number" name="total_expenditure" value={formData.total_expenditure} onChange={handleChange} placeholder="Total Expenditure" className="allu_arjun_input" />
                <input type="number" name="number_of_shares_divided" value={formData.number_of_shares_divided} onChange={handleChange} placeholder="Number of Shares Divided" className="allu_arjun_input" />
                <input type="number" name="cost_of_each_share" value={formData.cost_of_each_share} onChange={handleChange} placeholder="Cost of Each Share" className="allu_arjun_input" />
                <input type="number" name="number_of_shares_holding" value={formData.number_of_shares_holding} onChange={handleChange} placeholder="Number of Shares Holding" className="allu_arjun_input" />
                <input type="number" name="number_of_shares_released" value={formData.number_of_shares_released} onChange={handleChange} placeholder="Number of Shares Released" className="allu_arjun_input" />
                <input type="number" name="number_of_shares_limited" value={formData.number_of_shares_limited} onChange={handleChange} placeholder="Number of Shares Limited to a Person" className="allu_arjun_input" />
                <input type="date" name="share_validity" value={formData.share_validity} onChange={handleChange} placeholder="Share Validity" className="allu_arjun_input" />


                <input
                    type="file"
                    name="poster"
                    onChange={handleChange}
                    className="allu_arjun_input"
                    style={{ display: 'block', margin: '10px 0', border: '1px solid black' }}
                />


                <div className="allu_arjun_buttons">
                    <button type="submit" className="allu_arjun_button allu_arjun_submit_button">Upload Share</button>
                    <button type="button" onClick={onClose} className="allu_arjun_button allu_arjun_close_button">Close</button>
                </div>
            </form>
        </div>
    );
};

export default UploadShareModal;
