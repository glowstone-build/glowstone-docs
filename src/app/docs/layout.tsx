import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircleIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Logo } from '@/components/logo';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const tree = source.getPageTree();
  // Give the root "glowstone" page a logo icon in the sidebar (size-4 to match
  // the lucide section icons next to it).
  for (const node of tree.children) {
    if (node.type === 'page' && node.url === '/docs') {
      node.icon = <Logo className="size-4 shrink-0" res={48} />;
      break;
    }
  }

  return (
    <DocsLayout tree={tree} {...baseOptions()}>
      <AISearch>
        <AISearchPanel />
        <AISearchTrigger
          position="float"
          className={cn(
            buttonVariants({
              variant: 'secondary',
              className: 'text-fd-muted-foreground rounded-2xl',
            }),
          )}
        >
          <MessageCircleIcon className="size-4.5" />
          Ask AI
        </AISearchTrigger>
      </AISearch>


      {children}
    </DocsLayout>
  );
}
