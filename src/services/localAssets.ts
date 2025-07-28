export type FileType = 'image' | 'pdf' | 'video' | 'document' | 'other';

export interface LocalFile {
  id: string;
  filename: string;
  alt?: string;
  section?: string;
  type: FileType;
  mimeType?: string;
}

export interface LocalImage extends LocalFile {
  type: 'image';
  alt: string;
}

export interface LocalPdf extends LocalFile {
  type: 'pdf';
  title?: string;
}

export interface LocalVideo extends LocalFile {
  type: 'video';
  title?: string;
  poster?: string; 
  duration?: number; 
}

// Función para construir URLs de archivos locales desde public
export const buildFileUrl = (filename: string, folder?: string): string => {
  const basePath = folder ? `/${folder}/${filename}` : `/${filename}`;
  return basePath;
};

// Funciones de utilidad para obtener URLs de diferentes tipos de archivos
export const getImageUrl = (filename: string, folder?: string): string => {
  return buildFileUrl(filename, folder);
};

export const getPdfUrl = (filename: string, folder?: string): string => {
  return buildFileUrl(filename, folder);
};

export const getVideoUrl = (filename: string, folder?: string): string => {
  return buildFileUrl(filename, folder);
};

// Funciones para crear objetos de datos tipados
export const getImageData = (filename: string, alt: string, section?: string, folder?: string): LocalImage => {
  return {
    id: filename,
    filename,
    alt,
    section,
    type: 'image',
    mimeType: 'image/webp'
  };
};

export const getPdfData = (filename: string, title?: string, section?: string): LocalPdf => {
  return {
    id: filename,
    filename,
    title,
    section,
    type: 'pdf',
    mimeType: 'application/pdf'
  };
};

export const getVideoData = (filename: string, title?: string, poster?: string, section?: string): LocalVideo => {
  return {
    id: filename,
    filename,
    title,
    poster,
    section,
    type: 'video',
    mimeType: 'video/mp4'
  };
};

// Configuración de archivos del proyecto usando archivos locales
export const projectFiles = {
  images: {
    hero: getImageData(
      'Diseno_Imagenes-06.webp', 
      'Edificio Astre Panama', 
      'hero', 
      'DISENO'
    ),
    logo: getImageData(
      'astre-logo.png', 
      'Logo de Astre by Ihsus', 
      'general'
    )
  },
  documents: {
    brochure: getPdfData(
      'Plantas_Astre.pdf', 
      'Brochure Astre Panamá',
      'downloads'
    )
  },
  videos: {
    presentation: getVideoData(
      'Astre (Hero Header).mp4',
      'Presentación Astre Panamá',
      'Diseño_Imagenes-05.webp',
      'HERO'
    ),
    apartmentModel: getVideoData(
      'Video Astre (Apto Modelo).mp4',
      'Video Apartamento Modelo',
      'Diseño_Imagenes-05.webp',
      'APARTAMENTOS'
    )
  }
};

export const projectImages: Record<string, LocalImage> = {
  hero: projectFiles.images.hero,
  logo: projectFiles.images.logo
};
