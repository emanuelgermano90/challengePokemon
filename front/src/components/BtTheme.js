
import { useSelector, useDispatch } from 'react-redux';
import { SET_TEME } from '@/redux/action';

export default function BtTheme() {

    const dispatch = useDispatch();

    const { txt, state } = useSelector(state => state.bgTheme);

    const changeTheme = () => {

        dispatch({ type: SET_TEME, payload: { state: !state, txt: txt != 'Oscuro' ? 'Oscuro' : 'Claro'} })

    }

    return (

        <div className={`flex justify-around py-2 ${state ? 'bg-light-lightBackground' : 'bg-dark-darkBackground'} hover:cursor-pointer`}>

            <h1 className={`font-bold text-4xl ${state ? 'text-light-secondText' : 'text-dark-secondText'}`}>Pokemon App</h1>

            <div className='flex justify-center items-center bg-gray-200 px-3 rounded-sm' onClick={changeTheme}>

                <p>{txt}</p>

            </div>

        </div>

    );

};