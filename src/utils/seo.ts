export interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}

/**
 * Validates and returns SEO metadata props.
 * Ensures required fields are present and returns typed props.
 *
 * @param props - SEO metadata object
 * @returns Validated SeoProps
 * @throws Error if required fields are missing
 */
export function defineSeo(props: SeoProps): SeoProps {
  if (!props.title) {
    throw new Error("SEO: title is required");
  }
  if (!props.description) {
    throw new Error("SEO: description is required");
  }
  if (!props.canonical) {
    throw new Error("SEO: canonical is required");
  }

  return props;
}
