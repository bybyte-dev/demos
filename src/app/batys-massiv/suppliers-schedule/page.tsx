import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const mockProducts = [
  { id: 1, name: "Товар 1", category: "Категория 1", price: 1000 },
  { id: 2, name: "Товар 2", category: "Категория 2", price: 2000 },
  { id: 3, name: "Товар 3", category: "Категория 1", price: 1500 },
];

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Товары</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
