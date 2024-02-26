
import { useSelector, useDispatch } from 'react-redux';
import { SET_TEME } from '@/redux/action';

// Componente donde manipulamos el estado del Dark/Light Mode.
export default function BtTheme() {

    const dispatch = useDispatch();

    // Seleccionamos el estado global para capturar el estado actual.
    const { txt, state } = useSelector(state => state.bgTheme);

    // funcion que cambia el estado global del Dark/Light Mode.
    const changeTheme = () => {

        dispatch({ type: SET_TEME, payload: { state: !state, txt: txt != 'Oscuro' ? 'Oscuro' : 'Claro'} })

    }

    return (

        <div className={`flex justify-around py-2 ${state ? 'bg-gradient-to-r from-light-bgBodyFrom to-light-bgBodyTo' : 'bg-gradient-to-r from-dark-bgBodyFrom to-dark-bgBodyTo'} hover:cursor-pointer`}>

            <h1 className={`font-bold text-4xl ${state ? 'text-light-secondText' : 'text-dark-primaryText'}`}>Pokemon App</h1>

            <div className='flex justify-center items-center bg-gray-200 px-3 rounded-sm' onClick={changeTheme}>

                <p>{txt}</p>

            </div>

        </div>

    );

};