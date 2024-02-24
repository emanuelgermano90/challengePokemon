
import { useSelector } from 'react-redux';

export default function ErrorMsj() {

    const { state, msj } = useSelector(state => state.error);

    return (

        <div className={`transition-all absolute top-5 bg-amber-500 px-3 pt-1 pb-2 rounded-md ${state ? 'left-10' : '-left-full'} duration-500`}>

            <h3 className="text-xl font-semibold mb-2">ERROR</h3>

            <div className='bg-gray-200 p-3 rounded-sm'>

                <p>{msj}</p>

            </div>

        </div>

    );

};