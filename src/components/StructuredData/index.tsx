import { memo, useMemo } from 'react';

import pkg from '@/../package.json';
import { ldModule } from '@/components/StructuredData/ld';

const TITLE = 'Stable Diffusion · LobeHub';
const DESC = pkg.description;

const StructuredData = memo(() => {
  const ld = useMemo(
    () =>
      ldModule.generate({
        description: DESC,
        image:
          'https://repository-images.githubusercontent.com/606329910/7fd79db5-fd91-450c-9e95-8ccce8ffdc0b',
        title: TITLE,
        url: '/',
      }),
    [],
  );

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      id="structured-data"
      type="application/ld+json"
    />
  );
});
export default StructuredData;
