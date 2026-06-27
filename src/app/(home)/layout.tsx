import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  const base = baseOptions();

  return (
    <HomeLayout
      {...base}
      // Frosted navbar over the shader: transparent background + backdrop blur.
      nav={{ ...base.nav, transparentMode: 'none' }}
    >
      {children}
    </HomeLayout>
  );
}
