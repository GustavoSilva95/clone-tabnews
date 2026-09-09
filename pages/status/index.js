import useSwr from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSwr("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let version = "Carregando...";
  let openedConnections = "Carregando...";
  let maxConnections = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    version = data.dependencies.database.version;
    openedConnections = data.dependencies.database.opened_connections;
    maxConnections = data.dependencies.database.max_connections;
  }

  return (
    <>
      <p>Última atualização: {updatedAtText}</p>
      <p>
        Versão do Banco de Dados:{version}
        <br />
        Conexões abertas:{openedConnections}
        <br />
        Conexões máximas:{maxConnections}
      </p>
    </>
  );
}
