import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Btn } from './Btn';
import Swal from 'sweetalert2';
import { useTheme } from 'styled-components';
import { push, ref, set } from 'firebase/database';
import { database } from '../config/firebaseConfig';
import { setHitDatabase } from '../store/slices/userLoggedSlice';

export const OtherUserDetails = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { primary, secondary } = theme.palette;
    const param = useParams()
    const store = useSelector((store) => store);
    const { userData, anOtheruserData, userLogged } = store;
    const dispatch = useDispatch()

    const selectedDetails = anOtheruserData.find((obj) => obj.username == param.username);


    const { bloodGroup, username, email, firstName, lasttName, uid, birthDate } = selectedDetails;

    const fullDate = new Date(birthDate).toString();
    let adjustedDate;

    for (let i = 0; i < fullDate.length; i++) {
        if (fullDate[i] === "G") {
            adjustedDate = fullDate.slice(0, i - 9)
        }
    }

    const request = () => {
        Swal.fire({
            title: `Request`,
            text: "Are you sure to send a Request?",
            icon: "info",
            showCancelButton: true,
            iconColor: primary.main,
            background: secondary.main,
            confirmButtonText: "Yes, Send it!",
            confirmButtonColor: primary.main,
            cancelButtonText: "No, cancel"
        }).then(result => {
            if (result.isConfirmed) {
                const uniqueKey = push(ref(database)).key
                set(ref(database, "users/" + uid + '/userRequest/' + uniqueKey), {
                    ...userData
                }).then(() => {
                    const myUniqueKey = push(ref(database)).key
                    set(ref(database, "users/" + userLogged.userID + '/myRequest/' + myUniqueKey), {
                        ...selectedDetails
                    }).then(() => {
                        Swal.fire({
                            title: `Success`,
                            text: "Request Sent Successfully.",
                            icon: "success",
                            iconColor: primary.main,
                            background: secondary.main,
                            confirmButtonText: "OK!",
                            confirmButtonColor: primary.main,
                        }).then(() => {
                            navigate('/request')
                            dispatch(setHitDatabase(!userLogged.hitDatabase));
                        })
                    });
                }).catch((err) => {
                    Swal.fire({
                        title: `Error`,
                        text: err,
                        icon: "error",
                        iconColor: primary.main,
                        background: secondary.main,
                        confirmButtonText: "OK!",
                        confirmButtonColor: primary.main,
                    })
                })
            }
        }
        )
    }
    return (<>
        <h1 className='text-2xl font-bold sm:text-3xl bg-primary-main mt-2 p-2'>Profile Details</h1>
        <hr />
        <div className="container p-2 text-xl">

            <div className='flex items-center'>
                <h1 className='m-2 text-primary-main'>
                    Blood Group:
                </h1>
                <h1 className='m-2 font-bold  rounded '>
                    {bloodGroup}
                </h1>
            </div>

            <div className='flex items-center'>
                <h1 className='m-2 text-primary-main'>
                    Username:
                </h1>
                <h1 className='m-2 font-bold  rounded '>
                    {username}
                </h1>
            </div>

            <div className='flex items-center'>
                <h1 className='m-2 text-primary-main'>
                    Full Name:
                </h1>
                <h1 className='m-2 font-bold  rounded '>
                    {firstName + " " + lasttName}
                </h1>
            </div>

            <div className='flex items-center'>
                <h1 className='m-2 text-primary-main'>
                    Email Address:
                </h1>
                <h1 className='m-2 font-bold  rounded '>
                    {email}
                </h1>
            </div>

            <div className='flex items-center'>
                <h1 className='m-2 text-primary-main'>
                    Date OF Birth:
                </h1>
                <h1 className='m-2 font-bold rounded '>
                    {adjustedDate}
                </h1>
            </div>

            <div className=' m-3'>
                <Btn
                    tooltip_text="Request"
                    onclick={request}
                    text="Send Request"
                    sx={{
                        mx: 0,
                        "@media(max-width: 500px)": {
                            mx: 0,
                            fontSize: "small",
                        },
                        fontSize: "small",
                        textTransform: "capitalize",
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                    }} />
            </div>

        </div>
    </>
    )
}
