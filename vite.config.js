import { defineConfig } from 'vite';

function getBasePath() {
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH;
  }

  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
    && process.env.GITHUB_REPOSITORY
    && process.env.NETLIFY !== 'true'
    && process.env.CF_PAGES !== '1';

  if (isGitHubPages) {
    const repositoryName = process.env.GITHUB_REPOSITORY.split('/')[1];
    return repositoryName ? `/${repositoryName}/` : '/';
  }

  return '/';
}

export default defineConfig({
  base: getBasePath(),
  build: {
    assetsDir: 'assets',
    sourcemap: true,
  },
});
