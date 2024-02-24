
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_POKE, SET_POKE_SEARCH } from '@/redux/action';
import { usePokemonList, usePokemonByName, usePokemonByType } from '../utils/api';
import { setErrorF } from '@/app/Helpers/Helpers';
import CardProduct from '../components/CardProduct';
import Loading from '@/components/Loading';

const Home = ({ pokeList }) => {

  const dispatch = useDispatch();

  const pokeListG = useSelector(state => state.pokeListG);
  const { state: stateTheme } = useSelector(state => state.bgTheme);
  const [listPoke, setListPoke] = useState(pokeList ? pokeList : []);
  const [textValue, setTextValue] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [clearSearch, setClearSearch] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchTypeApi, setSearchTypeApi] = useState('');

  const { pokemonList, error: errorByList, isLoading } = usePokemonList();
  const { data: pokemonByName, error: errorByName, isLoading: isLoadingName } = usePokemonByName(searchName.toLowerCase());
  const { data: pokemonByType, error: errorByType, isLoading: isLoadingType } = usePokemonByType(searchTypeApi.toLowerCase());

  useEffect(() => {

    if (pokemonList) {

      setListPoke(pokemonList);

      dispatch({ type: GET_ALL_POKE, payload: pokemonList });
      
    }

    if (!isLoadingName && pokemonByName) {
      
      setListPoke([pokemonByName]);

      dispatch({ type: SET_POKE_SEARCH, payload: [pokemonByName] });
      
    }

    if (!isLoadingType && pokemonByType) {
      
      setListPoke(pokemonByType);

      dispatch({ type: SET_POKE_SEARCH, payload: pokemonByType });
      
    }

  }, [pokemonList, pokemonByName, pokemonByType]);

  useEffect(() => {
    if (errorByList) {
      setErrorF(dispatch, `Error al obtener la lista de Pokemon`);
      setClearSearch(false);
    } else if (errorByName) {
      setErrorF(dispatch, `Error al buscar Pokemon con el nombre '${searchName.toUpperCase()}'`);
      setSearchName('');
      setClearSearch(false);
    } else if (errorByType) {
      setErrorF(dispatch, `Error al buscar Pokemon del tipo '${searchTypeApi.toUpperCase()}'`);
      setSearchTypeApi('');
      setClearSearch(false);
    }
  }, [dispatch, errorByList, errorByName, errorByType]);

  const onChangeInput = (e) => {
    const { value } = e.target;
    setTextValue(value);
  }

  const pokeSearch = (e) => {

    e.preventDefault();

    if (searchType === 'name') {

      setSearchName(textValue);
      
    } else {

      setSearchTypeApi(textValue);

    }
      
    setClearSearch(true);

  }

  const clearSearchF = () => {
    setListPoke(pokeListG);
    setClearSearch(false);
    setTextValue('');
  }

  return (
    <div className={`${stateTheme ? 'bg-light-lightBackground' : 'bg-dark-darkBackground'}`}>
      { (isLoading || isLoadingName || isLoadingType) && <Loading /> }
      <div className={`flex flex-col w-4/5 mx-auto min-h-screen h-full ${stateTheme ? 'bg-gradient-to-r from-light-lightFrom to-light-lightTo' : 'bg-gradient-to-r from-dark-darkFrom to-dark-darkTo'}`}>
        <div className='flex justify-between pt-6 px-10 pb-2'>
          <h1 className={`font-bold text-4xl ${stateTheme ? 'text-light-primaryText' : 'text-dark-primaryText'}`} >Busca Tu Pokemon</h1>
          <div className='flex flex-col items-end h-16 xl:w-1/2 2xl:w-2/5'>
            <div className='flex'>
              <input
                type='text'
                className='font-bold uppercase h-10 pl-5 rounded-l-lg border-amber-400 border-y-2 border-l-2 focus:outline-none xl:w-11/12 2xl:w-4/5'
                value={textValue}
                onChange={e => onChangeInput(e)}
              />
              <p
                className={`flex justify-center items-center font-bold border-amber-400 border-y-2 hover:cursor-pointer hover:scale-105 transition delay-75 ${searchType === 'name' ? 'bg-amber-400 text-black hover:bg-amber-500' : `${stateTheme ? `text-light-btnTextInActive bg-light-btInActive hover:bg-light-btInActiveHover` : `text-dark-btnTextInActive bg-dark-btInActive hover:bg-dark-btInActiveHover`}`} xl:w-28 2xl:w-20`}
                onClick={() => setSearchType(searchType === 'type' ? 'name' : 'name')}
              >
                NAME
              </p>
              <p
                className={`flex justify-center items-center font-bold border-amber-400 border-y-2 hover:cursor-pointer hover:scale-105 transition delay-75 ${searchType === 'type' ? 'bg-amber-400 text-black hover:bg-amber-500' : `${stateTheme ? `text-light-btnTextInActive bg-light-btInActive hover:bg-light-btInActiveHover` : `text-dark-btnTextInActive bg-dark-btInActive hover:bg-dark-btInActiveHover`}`} xl:w-28 2xl:w-20`}
                onClick={() => setSearchType(searchType === 'name' ? 'type' : 'type')}
              >
                TYPE
              </p>
              <input
                type='submit'
                className='font-bold w-20 px-3 bg-white border-amber-400 border-y-2 border-r-2 rounded-r-lg hover:cursor-pointer hover:scale-105 hover:bg-slate-300 transition delay-75'
                onClick={e => pokeSearch(e)}
              />
            </div>
            {clearSearch && <p className='text-white mt-2 hover:cursor-pointer' onClick={clearSearchF}>Limpiar Busqueda.</p>}
          </div>
        </div>
        <div className='grid grid-cols-3 w-4/5 mx-auto'>
          {
            listPoke?.length > 0 &&
            listPoke?.map(({ id, name, types, abilities }) => (
            <CardProduct id={id} name={name} types={types} abilities={abilities} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

// export async function getStaticProps({ products }) {
//   const pokeList = await getPokemonList();
//   return {
//     props: {
//       pokeList,
//     },
//   };
// }

export default Home;








// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { GET_ALL_POKE, SET_POKE_SEARCH } from '@/redux/action';
// import { getPokemonList, getPokemonByName, getPokemonByType } from '../utils/api';
// import CardProduct from '../components/CardProduct';
// import Loading from '@/components/Loading';

// const Home = ({ pokeList }) => {

//   const dispatch = useDispatch();

//   const pokeListG = useSelector(state => state.pokeListG);

//   const [listPoke, setListPoke] = useState(pokeList);
//   const [textValue, setTextValue] = useState('')
//   const [searchType, setSearchType] = useState('name');
//   const [clearSearch, setClearSearch] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {

//     dispatch({ type: GET_ALL_POKE, payload: pokeList });

//   }, []);

//   const onChangeInput = (e) => {

//     const { value } = e.target;

//     setTextValue(value);

//   }

//   const pokeSearch = (e) => {

//     e.preventDefault();

//     setLoading(true);

//     if (searchType == 'name') {

//       getPokemonByName(String(textValue).toLowerCase()).then(data => {
  
//         setListPoke([data]);
  
//         dispatch({ type: SET_POKE_SEARCH, payload: [data] });
  
//         setClearSearch(true);
  
//       }).catch(err => console.log('Error: ', err)).finally(() => setLoading(false));
      
//     } else {

//       getPokemonByType(String(textValue).toLowerCase()).then(data => {
  
//         setListPoke(data);
  
//         dispatch({ type: SET_POKE_SEARCH, payload: data });
  
//         setClearSearch(true);
  
//       }).catch(err => console.log('Error: ', err)).finally(() => setLoading(false));
      
//     }

//   }

//   const clearSearchF = () => {

//     setListPoke(pokeListG);

//     setClearSearch(false);

//   }

//   return (
//     <div className='bg-slate-900'>

//       { loading && <Loading /> }

//       <div className={`
//         bg-gradient-to-r from-cyan-800 to-blue-600
//         flex flex-col w-4/5 mx-auto min-h-screen h-full`}
//        >

//         <div className='flex justify-between pt-6 px-10 pb-2'>

//           <h1 className='font-bold text-4xl text-amber-300' >Busca Tu Pokemon</h1>

//           <div className='flex flex-col items-end w-2/5 h-16'>

//             <div className='flex'>

//               <input 
//                 type='text' 
//                 className='
//                 font-bold uppercase 
//                 w-4/5 h-10
//                 pl-5
//                 rounded-l-lg border-amber-400 border-y-2 border-l-2 
//                 focus:outline-none' 
//                 onChange={e => onChangeInput(e)}
//               />

//               <p className={`
//                 flex justify-center items-center 
//                 font-bold w-20 
//                 border-amber-400 border-y-2 
//                 hover:cursor-pointer hover:scale-105
//                 transition delay-75
//                 ${searchType == 'name' ? 'bg-amber-400 text-black hover:bg-amber-500' : 'text-amber-300 bg-slate-700 hover:bg-slate-500'}
//               `} onClick={() => setSearchType(searchType == 'type' ? 'name' : 'name')}>NAME</p>

//               <p className={`
//                 flex justify-center items-center 
//                 font-bold w-20 
//                 border-amber-400 border-y-2 
//                 hover:cursor-pointer hover:scale-105
//                 transition delay-75
//                 ${searchType == 'type' ? 'bg-amber-400 text-black hover:bg-amber-500' : 'text-amber-300 bg-slate-700 hover:bg-slate-500'}
//               `} onClick={() => setSearchType(searchType == 'name' ? 'type' : 'type')}>TYPE</p>

//               <input type='submit' className='
//                 font-bold
//                 w-20
//                 px-3
//                 bg-white
//                 border-amber-400 border-y-2 border-r-2 rounded-r-lg
//                 hover:cursor-pointer hover:scale-105 hover:bg-slate-300
//                 transition delay-75' 
//                 onClick={e => pokeSearch(e)}
//               />

//             </div>

//             { clearSearch && <p className='text-white mt-2 hover:cursor-pointer' onClick={clearSearchF}>Limpiar Busqueda.</p> }

//           </div>

//         </div>

//         <div className='grid grid-cols-3 w-4/5 mx-auto'>

//           {listPoke.map(({ id, name, types, abilities }) => (
//             <CardProduct id={id} name={name} types={types} abilities={abilities} />
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// };

// export async function getStaticProps({ products }) {

//   const pokeList = await getPokemonList();

//   return {
//     props: {
//       pokeList,
//     },
//   };
// }

// export default Home;
