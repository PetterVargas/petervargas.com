import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DownloadCV } from './download-cv';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DownloadCV,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
