import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Characters/Reptile.scss';
import {REPTILE} from "../../DATA/PLAYER_DESC.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

const Reptile = () => {

    return REPTILE.map((item) => (
        <main key={item.name}>
            <section className='Contain_Info_Reptile'>
                <div className='Character_Reptile'>
                    <img className='Character_W' src={item.img} alt="#"/>
                </div>
                <div className='Specs'>{item.specs.map(spec => (
                        <>
                            <div>
                                <span>{spec}</span>
                                <br/>
                            </div>
                            <br/>
                        </>
                    )
                )}
                </div>
                <div className='Description'>{item.descriptionType}</div>
                <div className='Button_Character'>
                    <button className='GoLab'>
                        <Link to={'/about'} className='Link'>GO BACK</Link>
                    </button>
                </div>
            </section>
        </main>
    ))
}
export default Reptile;