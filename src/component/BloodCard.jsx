import React from 'react'
import { Btn } from './Btn'
import { useNavigate } from 'react-router-dom'

export const BloodCard = (props) => {
    const navigate = useNavigate();
    const { bloodGroup, username, email, firstName, lasttName, uid, birthDate} = props.data;
    return (
        <div className=' m-2 rounded-lg p-2  bg-card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className="text-4xl font-bold">{bloodGroup}</h1>
                        <h1 className="text-sm">Blood Group</h1>
                </div>
                <div>
                    <h1 className="text-xl font-bold">{username}</h1>
                    <h1 className="text-sm">User Name</h1>
                </div>
            </div>
            hassan428/Hackathon-Blood-Bank
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className="text-base font-bold">{email}</h1>
                    <h1 className="text-sm">Email</h1>
                </div>
                <div>
                    <Btn
                        tooltip_text="Details"
                        onclick={() => {
                            navigate(`/home/${username}`)
                        }
                        }
                        text="View Details"
                        sx={{
                            mx: 0,
                            "@media(max-width: 500px)": {
                                mx: 0,
                            },
                            fontSize: "x-small",
                            // tex
                            textTransform: "capitalize",

                            p: 0.5,
                            width: "100%",
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                        }} />
                </div>
            </div>






        </div>
    )
}
