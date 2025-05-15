'use client'; // Required for client component

import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic, Square } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function CollectAudioPage() {
  // Since this page will have interactive elements like a timer, it needs to be a client component.
  // const [isRecording, setIsRecording] = useState(false);
  // const [elapsedTime, setElapsedTime] = useState(0);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (isRecording) {
  //     interval = setInterval(() => {
  //       setElapsedTime(prevTime => prevTime + 1);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [isRecording]);

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  // };


  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="mb-4 inline-flex items-center text-sm text-primary hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Volver al Inicio
      </Link>
      <PageHeader title="Grabar Sonido Ambiental" />
      <Card className="text-center shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Listo para Grabar</CardTitle>
            <CardDescription>Presiona el botón para comenzar a grabar el sonido de tu entorno.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
            {/* Placeholder for recording state */}
            {/* {isRecording ? <Square className="h-24 w-24 text-destructive" /> : <Mic className="h-24 w-24 text-primary" />} */}
            <Mic className="h-24 w-24 text-primary" /> {/* Default state */}
            {/* <p className="text-2xl font-mono">{formatTime(elapsedTime)}</p> */}
            <p className="text-2xl font-mono">00:00</p>
            <p className="text-muted-foreground">
              Aquí se activaría la funcionalidad de grabación de audio.
              Por ahora, esto es una simulación.
            </p>
            <Button size="lg" className="w-full sm:w-auto">
                {/* {isRecording ? <><Square className="mr-2 h-5 w-5" /> Detener Grabación</> : <><Mic className="mr-2 h-5 w-5" /> Iniciar Grabación</>} */}
                <Mic className="mr-2 h-5 w-5" /> Iniciar Grabación
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
