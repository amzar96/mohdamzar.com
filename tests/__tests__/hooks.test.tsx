import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from '../../src/hooks/useScrollAnimation';

describe('useScrollAnimation', () => {
  it('should return ref and isVisible state', () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current).toHaveProperty('ref');
    expect(result.current).toHaveProperty('isVisible');
    expect(typeof result.current.isVisible).toBe('boolean');
  });
});
