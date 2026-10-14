import ProductDetailsScreen from '@/features/products/screens/ProductDetailsScreen'
import React from 'react'

export default async function ProductDetailsPage({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
 return <>
  
<ProductDetailsScreen id={id} />
  </>
}

