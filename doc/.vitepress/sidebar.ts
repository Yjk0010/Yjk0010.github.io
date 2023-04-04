// .vitepress/sidebar.ts

import fs from 'fs';
import path from 'path';

interface SidebarItem {
  text: string;
  children?: string[];
}

interface SidebarConfig {
  [key: string]: SidebarItem[];
}

function generateSidebar (): SidebarConfig {
  const docsDir = path.join(process.cwd(), 'doc');
  const sidebarConfig: SidebarConfig = {};

  fs.readdirSync(docsDir, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      const dirPath = path.join(docsDir, entry.name);
      const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md'));
      sidebarConfig[`/${entry.name}/`] = [
        {
          text: 'Introduction',
          children: [`/${entry.name}/`, ...files.map((file) => `/${entry.name}/${file.replace(/\.md$/, '')}`)],
        },
      ];
    }
  });

  return sidebarConfig;
}

export default generateSidebar;
