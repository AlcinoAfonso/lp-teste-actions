import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-lp">
        <h1 className="text-4xl font-bold text-center mb-12">
          🏭 LP Factory - Sistema
        </h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 mb-8">
            Sistema de criação de landing pages de alta conversão.
          </p>
          <div className="space-y-4">
            <Link href="/unico-digital" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-orange-500">
              <h2 className="font-semibold text-xl mb-2">🏭 LP Factory</h2>
              <p className="text-sm text-gray-600 mb-2">Criação de Landing Pages</p>
              <p className="text-xs text-green-600 font-medium">✅ ATIVA</p>
            </Link>
            <Link href="/fitnutri" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-blue-500">
              <h2 className="font-semibold text-xl mb-2">💪 FitNutri</h2>
              <p className="text-sm text-gray-600 mb-2">Nutrição personalizada</p>
              <p className="text-xs text-green-600 font-medium">✅ ATIVA</p>
            </Link>
            <Link href="/dashboard-lps" className="block bg-white p-6 rounded-lg shadow hover:shadow-lg border-l-4 border-purple-500">
              <h2 className="font-semibold text-xl mb-2">📊 Dashboard</h2>
              <p className="text-sm text-gray-600 mb-2">Gerenciamento de LPs</p>
              <p className="text-xs text-green-600 font-medium">✅ ATIVA</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
