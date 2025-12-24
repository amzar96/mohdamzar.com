import yaml from 'js-yaml';
import type { Config } from '../types/config';

let cachedConfig: Config | null = null;

export async function loadConfig(): Promise<Config> {
  if (cachedConfig) {
    return cachedConfig;
  }

  const response = await fetch('/config.yaml');
  const text = await response.text();
  const config = yaml.load(text) as Config;

  cachedConfig = config;
  return config;
}

export function getYearsOfExperience(startYear: number): number {
  return new Date().getFullYear() - startYear;
}

export function interpolateDescription(description: string, years: number): string {
  return description.replace('{years}', years.toString());
}
