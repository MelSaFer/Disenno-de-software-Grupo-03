/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin", // Reemplaza '/mi-pagina-de-inicio' con la ruta deseada
        permanent: true, // Puedes usar true o false según desees una redirección permanente o temporal
      },
    ];
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
