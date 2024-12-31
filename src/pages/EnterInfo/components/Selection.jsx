import React ,{useState} from 'react'
import Options from './Options'
const Selection = () => {
    const [OptionsData, setOptionsData] = useState([
        { 
            icon: <i className="fa-solid fa-arrow-pointer"></i>, 
            name: "select" 
        },
        { 
            icon: <i className="fa-solid fa-user"></i>, 
            name: "Customer ID" 
        },
        { 
            icon: <i className="fa-solid fa-mobile-screen"></i>, 
            name: "Phone Number" 
        },
        { 
            icon: <i className="fa-solid fa-wallet"></i>, 
            name: "Amount" 
        },
    ])
    return (
        <div className='mt-8 flex flex-col gap-4'>
            {
                OptionsData.map((option, index) => {
                    return (
                        <Options key={index}
                            icon={option.icon}
                            heading={option.name}
                        />
                    )
                })
            }
        </div>
    )
}

export default Selection
