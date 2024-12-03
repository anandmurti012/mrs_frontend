import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Loading';

const ViewAdmins = () => {

    const auth = useSelector((state) => state.doctor);
    const token = auth.token
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])

    useEffect(() => {
        const handler = setTimeout(() => {
            getData();
        }, 500); // Delay in milliseconds (e.g., 300ms)

        // Cleanup function to clear the timeout if searchTerm changes
        return () => {
            clearTimeout(handler);
        };
    }, []);


    const getData = async () => {
        try {
            setIsLoading(true)
            await axios.get(`${process.env.REACT_APP_APIURL}/api/get-admins`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => {
                    setIsLoading(false)
                    setUsers(response.data.results)
                })
                .catch(error => {
                    setIsLoading(false)
                    toast.error(`${error?.response?.data?.msg || error?.message}`)
                    console.error('There was an error fetching the data:', error);
                });
        } catch (error) {
            setIsLoading(false)
            console.log('APi call error', error)
            toast.error(`${error?.response?.data?.msg || error?.message}`)
        }
    };

    const handleDelete = async (id, fileName) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.post(`${process.env.REACT_APP_APIURL}/api/delete-admin`, { id: id, fileName: fileName }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(response => {
                        toast.success('Successfully Deleted')
                        getData()
                    })
                    .catch(error => {
                        toast.error(`${error?.response?.data?.msg || error?.message}`)
                        console.error('There was an error:', error);
                    });
            } catch (error) {
                toast.error(`${error?.response?.data?.msg || error?.message}`)
                console.log('Api Call Error:', error);
            }
        }
    }


    return (
        <>
            <ToastContainer />
            {
                isLoading ?
                    <Loading />
                    :
                    <div >
                        <div>
                            <table style={{ width: '100%', maxWidth: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }} >
                                <thead >
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email (Login Id)</th>
                                        <th>Address</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0 ?
                                            users.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.adminName}</td>
                                                    <td>{item.phoneNo}</td>
                                                    <td>{item.emailId}</td>
                                                    <td style={{overflow:'auto'}} >
                                                        <p >
                                                            {item.address}
                                                        </p>
                                                    </td>
                                                    <td>{item.type}</td>
                                                    <td>
                                                        <button
                                                            className='btn btn-danger btn-sm'
                                                            onClick={() => { handleDelete(item.id, item.image) }}
                                                            style={{ marginRight: 5 }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            'No Data Available..'
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default ViewAdmins;