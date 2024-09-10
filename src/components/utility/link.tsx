import type { ComponentPropsWithoutRef } from 'react';

export interface RouteLinkProps extends ComponentPropsWithoutRef<'a'> {}

export function ExternalLink(props: RouteLinkProps) {
  const { target = '_blank', rel = 'noopener noreferrer nofollow external', ...restProps } = props;
  return <a target={target} rel={rel} {...restProps} />;
}
