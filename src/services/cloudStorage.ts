/**
 * Servicio para gestionar imágenes desde Google Cloud Storage
 */

// Interfaz para imágenes
export interface CloudImage {
  id: string;
  filename: string;
  alt: string;
  section?: string;
}

// Crear la URL completa para una imagen en el bucket
export const getImageUrl = (imageId: string): string => {
  const GCS_URL: string = import.meta.env.PUBLIC_GCS_URL || '';
  
  if (!GCS_URL) {
    console.error('Error: PUBLIC_GCS_URL no está definido en el archivo .env');
    return '';
  }
  
  return `${GCS_URL}/${imageId}`;
};

// Obtener objeto de imagen con toda la información
export const getImageData = (imageId: string, alt: string, section?: string): CloudImage => {
  return {
    id: imageId,
    filename: imageId,
    alt,
    section
  };
};

// Listado de imágenes del proyecto (puedes expandir esto según necesites)
export const projectImages: Record<string, CloudImage> = {
  hero: {
    id: 'building-background.jpg',
    filename: 'building-background.jpg',
    alt: 'Edificio Astre Panama',
    section: 'hero'
  },
  logo: {
    id: 'astre-logo.png',
    filename: 'astre-logo.png',
    alt: 'Logo de Astre by Ihsus',
    section: 'general'
  }
};
