import { useEffect, type FC } from 'react';

const PipedriveForm: FC = () => {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'https://webforms.pipedrive.com/f/loader';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/2TC1i6Fuw5xQBNkn6yqqjCZVGvPZf1C6tVSykl17rK5QvxtfWoQJkh6Yy4mWix0pd" />
  );
}

export default PipedriveForm;
