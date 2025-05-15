import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CollectPropertyPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="mb-4 inline-flex items-center text-sm text-primary hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Volver al Inicio
      </Link>
      <PageHeader title="Recolectar Información de Propiedad" />
      <form className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" placeholder="Ej: Calle Falsa 123, Ciudad" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="propertyType">Tipo de Propiedad (Ej: Casa, Apartamento)</Label>
          <Input id="propertyType" placeholder="Apartamento" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="status">Estado (Ej: En Venta, En Renta)</Label>
          <Input id="status" placeholder="En Venta" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="price">Precio (Opcional)</Label>
          <Input id="price" type="number" placeholder="250000" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="description">Descripción Adicional</Label>
          <Textarea id="description" placeholder="Detalles sobre la propiedad, número de habitaciones, etc." className="mt-1" />
        </div>
        <div>
          <Label htmlFor="photo">Subir Foto (Opcional)</Label>
          <Input id="photo" type="file" className="mt-1" />
        </div>
        <Button type="submit" className="w-full sm:w-auto">Enviar Información</Button>
      </form>
    </div>
  );
}
