import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { usePokemonDetail } from '../../utils/api';
import Link from 'next/link';
import Loading from '@/components/Loading';
import arrow from '../../../public/arrow.png';
import Image from 'next/image';

// Page ID, encargada para mostrar el detalle del Pokemon.
const ProductDetail = ({ pokeDetail }) => {

  // Llamamos a Router para la obtencion del ID del Pokemon que se envia desde la home.
  const router = useRouter();

  const { state: stateTheme } = useSelector(state => state.bgTheme);

  const { id } = router.query;

  // Hacemos uso de nuestro Hook para la obtencion de datos de detalle.
  const { data, error, isLoading } = usePokemonDetail(id);

  const { abilities, name, types, forms, height, weight, species, urlPng } = data;
  
  return (
    <div className={`flex flex-col ${stateTheme ? 'bg-gradient-to-r from-light-bgBodyFrom to-light-bgBodyTo' : 'bg-gradient-to-r from-dark-bgBodyFrom to-dark-bgBodyTo'}`}>

      {isLoading && <Loading />}

      <div className={`flex flex-col mx-auto min-h-screen h-full m-6 xl:w-11/12 2xl:w-4/5 ${stateTheme ? 'bg-gradient-to-r from-light-lightFrom to-light-lightTo' : 'bg-gradient-to-r from-dark-darkFrom to-dark-darkTo'}`}>

        <div className='flex justify-between pt-5 px-20'>

          <Link href='/'>

            <Image src={arrow} className='-rotate-90 w-20 transition delay-200 hover:cursor-pointer hover:scale-125' />

          </Link>

          <h1 className={`my-auto font-bold text-4xl ${stateTheme ? 'text-light-primaryText' : 'text-dark-secondText'}`}>Detalles Principales</h1>

        </div>

        <div className='flex items-center justify-evenly'>

          <h3 className='ml-32 my-6 font-bold text-4xl text-orange-400' >Pokemon: {String(name).toUpperCase()}</h3>

          { urlPng && <Image src={urlPng} width={200} height={200} /> }

        </div>

        <div className='grid grid-cols-2 gap-10 w-4/6 mx-auto mb-10' >

          <div className={`flex flex-col text-white text-lg border-2 flex items-center p-5 xl:px-20 ${stateTheme ? 'border-light-borderColorPrimary' : 'border-dark-borderColorPrimary'}`}>

            <p className='mr-3 font-bold' >Tipo</p>

            {

              types?.map(e => {

                return (<p>{e?.type?.name}</p>)

              })

            }

          </div>

          <div className={`flex flex-col text-white text-lg border-2 flex items-center p-5 xl:px-20 ${stateTheme ? 'border-light-borderColorPrimary' : 'border-dark-borderColorPrimary'}`}>

            <p className='font-bold'>Medidas</p>

            <p>Alto: {height}</p>

            <p>Peso: {weight}</p>

          </div>

          <div className={`flex flex-col text-white text-lg border-2 flex items-center p-5 xl:px-20 ${stateTheme ? 'border-light-borderColorPrimary' : 'border-dark-borderColorPrimary'}`}>

            <p className='font-bold'>Habilidades</p>

            {

              abilities?.map(e => {

                return (<p>{e?.ability?.name}</p>)

              })

            }

          </div>

          <div className={`flex justify-around text-white text-lg border-2 flex items-center p-5 xl:px-20 ${stateTheme ? 'border-light-borderColorPrimary' : 'border-dark-borderColorPrimary'}`}>

            <p className='font-bold'>Especie</p>

            <p>{species?.name}</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export async function getStaticPaths() {

  const paths = [{ params: { id: '1' } }];
  return {
    paths,
    fallback: true,
  };
}


export async function getStaticProps({ params }) {

  const { id } = params;

  return {
    props: {},
  };
}

export default ProductDetail;
