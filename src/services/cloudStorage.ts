export const ENV_STORAGE_URL = 'GCS_STORAGE_URL';
export const ENV_BUCKET_NAME = 'GCS_BUCKET_NAME';
export const ENV_PROJECT_ID = 'GCS_PROJECT_ID';

export type FileType = 'image' | 'pdf' | 'video' | 'document' | 'other';
export interface CloudFile {
  id: string;
  filename: string;
  alt?: string;
  section?: string;
  type: FileType;
  mimeType?: string;
}

export interface CloudImage extends CloudFile {
  type: 'image';
  alt: string;
}

export interface CloudPdf extends CloudFile {
  type: 'pdf';
  title?: string;
}

export interface CloudVideo extends CloudFile {
  type: 'video';
  title?: string;
  poster?: string; 
  duration?: number; 
}

type EnvVariables = Record<string, string | undefined>;
const getEnvVariable = (name: string, defaultValue: string = ''): string => {
  const env = import.meta.env as EnvVariables;
  const value = env[name];
  
  if (!value && defaultValue !== '' && import.meta.env.DEV) {
    console.debug(`Variable de entorno ${name} no definida, usando valor predeterminado.`);
  }
  
  return value || defaultValue;
};

export const getStorageBaseUrl = (): string => {
  const storageUrl = getEnvVariable(ENV_STORAGE_URL, 'https://storage.googleapis.com');
  const bucketName = getEnvVariable(ENV_BUCKET_NAME);
  
  if (!bucketName && import.meta.env.DEV) {
    console.warn(`${ENV_BUCKET_NAME} no está definido en las variables de entorno.`);
    return '';
  }
  
  return `${storageUrl}/${bucketName}`;
};


export const buildFileUrl = (fileId: string, folder?: string): string => {
  const baseUrl = getStorageBaseUrl();
  
  if (!baseUrl || !fileId) {
    console.warn('Error al construir URL: baseUrl o fileId no definidos');
    return '';
  }
  
  return folder ? `${baseUrl}/${folder}/${fileId}` : `${baseUrl}/${fileId}`;
};



export const getImageUrl = (imageId: string, folder?: string): string => {
  return buildFileUrl(imageId, folder);
};


export const getPdfUrl = (pdfId: string, folder?: string): string => {
  return buildFileUrl(pdfId, folder);
};


export const getVideoUrl = (videoId: string, folder?: string): string => {
  return buildFileUrl(videoId, folder);
};

export const getImageData = (imageId: string, alt: string, section?: string, folder?: string): CloudImage => {
  return {
    id: imageId,
    filename: folder ? `${folder}/${imageId}` : imageId,
    alt,
    section,
    type: 'image'
  };
};

export const getPdfData = (pdfId: string, title?: string, section?: string): CloudPdf => {
  return {
    id: pdfId,
    filename: pdfId,
    title,
    section,
    type: 'pdf',
    mimeType: 'application/pdf'
  };
};


export const getVideoData = (videoId: string, title?: string, poster?: string, section?: string): CloudVideo => {
  return {
    id: videoId,
    filename: videoId,
    title,
    poster,
    section,
    type: 'video'
  };
};

// Configuración de archivos del proyecto usando funciones de utilidad para crear objetos estandarizados
export const projectFiles = {
  images: {
    hero: getImageData(
      'Disen%CC%83o_Imagenes-06.webp', 
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
      'astre-brochure.pdf', 
      'Brochure Astre Panamá',
      'downloads'
    )
  },
  videos: {
    presentation: getVideoData(
      'astre-presentation.mp4',
      'Presentación Astre Panamá',
      'astre-video-poster.jpg',
      'media'
    )
  }
};

export const projectImages: Record<string, CloudImage> = {
  hero: projectFiles.images.hero,
  logo: projectFiles.images.logo
};
