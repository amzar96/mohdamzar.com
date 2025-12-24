import { describe, it, expect } from 'vitest';
import { getYearsOfExperience, interpolateDescription } from '../../src/config/loader';

describe('Config Loader', () => {
  it('should calculate years of experience correctly', () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;
    const expectedYears = currentYear - startYear;

    expect(getYearsOfExperience(startYear)).toBe(expectedYears);
  });

  it('should interpolate description correctly', () => {
    const description = 'I have {years} years of experience';
    const result = interpolateDescription(description, 5);

    expect(result).toBe('I have 5 years of experience');
  });
});
