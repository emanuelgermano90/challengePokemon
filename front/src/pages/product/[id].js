import React from 'react';
import { useRouter } from 'next/router';
import { usePokemonDetail } from '../../utils/api';
import Link from 'next/link';
import Loading from '@/components/Loading';
import arrow from '../../../public/arrow.png';
import Image from 'next/image';

const ProductDetail = ({ pokeDetail }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = usePokemonDetail(id);

  const { abilities, name, types, forms, height, weight, species } = data;

  return (
    <div className='bg-gradient-to-r from-cyan-800 to-blue-600 flex flex-col mx-auto xl:w-11/12 2xl:w-4/5'>

      { isLoading && <Loading /> }

      <div className="bg-blue-900 flex flex-col mx-auto h-screen m-6 xl:w-11/12 2xl:w-4/5">

        <div className='flex justify-between pt-5 px-20'>

          <Link href='/'>

            <Image src={arrow} className='-rotate-90 w-20 transition delay-200 hover:cursor-pointer hover:scale-125' />

          </Link>

          <h1 className='my-auto font-bold text-4xl text-yellow-300'>Detalles Principales</h1>

        </div>

        <h3 className='ml-32 my-6 font-bold text-4xl text-orange-400' >Pokemon: {String(name).toUpperCase()}</h3>

        <div className='grid grid-cols-2 gap-10 w-4/6 mx-auto' >

          <div className='text-white text-lg border-2 flex items-center p-5 xl:px-20'>

            <p className='mr-3 font-bold' >Tipo</p>

            {

              types?.map(e => {

                return (<p>{e?.type?.name}</p>)

              })

            }

          </div>

          <div className='text-white text-lg border-2 p-5 xl:px-20'>

            <p className='font-bold'>Medidas</p>

            <p>Alto: {height}</p>

            <p>Peso: {weight}</p>

          </div>

          <div className='text-white text-lg border-2 p-5 xl:px-20'>

            <p className='font-bold'>Habilidades</p>

            {

              abilities?.map(e => {

                return (<p>{e?.ability?.name}</p>)

              })

            }

          </div>

          <div className='text-white text-lg border-2 p-5 xl:px-20'>

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
