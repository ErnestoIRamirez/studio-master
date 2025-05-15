import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ScanLine } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CollectScanPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="mb-4 inline-flex items-center text-sm text-primary hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Volver al Inicio
      </Link>
      <PageHeader title="Realizar Escaneo" />
      <Card className="text-center shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Listo para Escanear</CardTitle>
            <CardDescription>Apunta tu dispositivo al área que deseas escanear y presiona el botón.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
            <ScanLine className="h-24 w-24 text-primary animate-pulse" />
            <p className="text-muted-foreground">
              Aquí se activaría la funcionalidad de escaneo del dispositivo.
              Por ahora, esto es una simulación.
            </p>
            <Button size="lg" className="w-full sm:w-auto">
                <ScanLine className="mr-2 h-5 w-5" /> Iniciar Escaneo
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
