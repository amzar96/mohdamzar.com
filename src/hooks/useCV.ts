import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import type { CV } from '../types/cv';

export function useCV() {
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/cv.yaml')
      .then((res) => res.text())
      .then((text) => setCV(yaml.load(text) as CV))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { cv, loading, error };
}
