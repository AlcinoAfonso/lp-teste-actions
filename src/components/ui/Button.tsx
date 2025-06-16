import Link from 'next/link';
import { cn } from '@/lib/utils';
import { typography } from '@/config/typography';

interface ButtonProps {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export function Button({ 
  text, 
  href, 
  style = 'primary', 
  backgroundColor,
  textColor,
  className 
}: ButtonProps) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:');
  const baseClasses = typography.button.base;
  const variantClasses = typography.button.variants[style as keyof typeof typography.button.variants] || '';
  
  const customStyle = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
  } as React.CSSProperties;

  const finalClassName = cn(baseClasses, variantClasses, className);

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={finalClassName}
        style={customStyle}
      >
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={finalClassName} style={customStyle}>
      {text}
    </Link>
  );
}
