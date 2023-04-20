// .vitepress/sidebar.ts

// 暂时无用

import fs from 'fs';
import path from 'path';

interface SidebarItem {
  text: string;
  link: string;
}

function generateSidebar (addr: string, hasFile: string[]): SidebarItem[] {
  const docsDir = path.join(process.cwd(), 'doc', addr);
  const sidebar: SidebarItem[] = []
  fs.readdirSync(docsDir, { withFileTypes: true }).forEach((entry) => {
    const nameDir = entry.name.replace(/\.md$/, '')
    if (entry.isFile() && hasFile.includes(nameDir)) {
      const dirPath = path.join(docsDir, entry.name);
      const content = fs.readFileSync(dirPath, 'utf8')
      const firstLine = content.trim().split('\n')[0].replace("#", "").trim();
      const item: SidebarItem = {
        text: firstLine,
        link: `/${addr}/${entry.name.replace(/\.md$/, '')}`
      }
      sidebar.push(item);
    }
  });

  return sidebar;
}

export default generateSidebar;
