import fs from 'fs';
import path from 'path';

interface LP {
  name: string;
  path: string;
  url: string;
}

interface Cliente {
  name: string;
  lps: LP[];
}

// Função para escanear diretórios e encontrar LPs
function scanLPs(): Cliente[] {
  const appDir = path.join(process.cwd(), 'src/app');
  const clientes: Cliente[] = [];

  try {
    // Lista todas as pastas em src/app
    const items = fs.readdirSync(appDir, { withFileTypes: true });
    
    for (const item of items) {
      // Ignora arquivos e pastas especiais
      if (!item.isDirectory() || 
          item.name.startsWith('.') || 
          ['components', 'globals.css', 'layout.tsx', 'page.tsx', 'dashboard-lps'].includes(item.name)) {
        continue;
      }

      const clientePath = path.join(appDir, item.name);
      const cliente: Cliente = {
        name: item.name,
        lps: []
      };

      // Escaneia subpastas do cliente para encontrar LPs
      try {
        const subItems = fs.readdirSync(clientePath, { withFileTypes: true });
        
        for (const subItem of subItems) {
          if (subItem.isDirectory()) {
            const lpPath = path.join(clientePath, subItem.name);
            const pageFile = path.join(lpPath, 'page.tsx');
            
            // Verifica se existe page.tsx (confirma que é uma LP)
            if (fs.existsSync(pageFile)) {
              cliente.lps.push({
                name: subItem.name,
                path: `${item.name}/${subItem.name}`,
                url: `/${item.name}/${subItem.name}`
              });
            }
          }
        }
      } catch (error) {
        console.warn(`Erro ao escanear cliente ${item.name}:`, error);
      }

      // Só adiciona cliente se tiver pelo menos uma LP
      if (cliente.lps.length > 0) {
        clientes.push(cliente);
      }
    }
  } catch (error) {
    console.error('Erro ao escanear diretório:', error);
  }

  return clientes.sort((a, b) => a.name.localeCompare(b.name));
}

// Componente para renderizar um cliente e suas LPs
function ClienteItem({ cliente }: { cliente: Cliente }) {
  return (
    <details className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <summary className="bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
        <span className="font-semibold text-gray-800">
          📁 {cliente.name}
        </span>
        <span className="ml-2 text-sm text-gray-500">
          ({cliente.lps.length} LP{cliente.lps.length !== 1 ? 's' : ''})
        </span>
      </summary>
      <div className="bg-white">
        {cliente.lps.map((lp) => (
          <div key={lp.path} className="border-t border-gray-100 first:border-t-0">
            <a 
              href={lp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 group-hover:text-blue-700">
                  🔗 {lp.name}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-blue-500">
                  {lp.url}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </details>
  );
}

// Página principal do dashboard
export default function DashboardLPs() {
  const clientes = scanLPs();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Dashboard LPs
          </h1>
          <p className="text-gray-600">
            Lista completa de todos os clientes e suas landing pages
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Total: {clientes.length} cliente{clientes.length !== 1 ? 's' : ''} • {' '}
            {clientes.reduce((total, cliente) => total + cliente.lps.length, 0)} LPs
          </div>
        </div>

        {/* Lista de Clientes */}
        {clientes.length > 0 ? (
          <div className="space-y-2">
            {clientes.map((cliente) => (
              <ClienteItem key={cliente.name} cliente={cliente} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma LP encontrada
            </h3>
            <p className="text-gray-500">
              Adicione clientes e LPs na estrutura src/app/ para vê-los aqui
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              💡 <strong>Como usar:</strong> Clique em um cliente para expandir suas LPs, 
              depois clique no link da LP para abrir em nova aba
            </p>
            <p className="mt-2">
              🔄 Esta lista é atualizada automaticamente a cada deploy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
