import { Product } from "../../app/models/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}
export default function Catalog(props: Props) {
  return <h1>this is catalog component</h1>;
}
