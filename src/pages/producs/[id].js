import { Card } from 'antd';


// export const getServerSideProps = async ({ query }) => {
//   const res = await fetch(`https://fakestoreapi.com/products/${query.id}`);
//   const product = await res.json();

//   return { props: { product } }
// }

export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products');
  const characters = await res.json();

  return {
    paths: characters.map(item => {
      return { params: { id: `${item.id}` } };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  console.log(product.name)

  return { props: { product } }
}

export default function SingleProduct({ product = {} }) {

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={product.image} />}
    >
      <Card.Meta title={product.title} description={product.description} />
    </Card>
  )
}
