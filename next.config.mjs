import withPWA from 'next-pwa';

const withPWAFunc = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable:false,
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWAFunc(nextConfig);
