export const ErrorBoundary = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        gap: "1rem",
      }}
    >
      <h2>Ooops</h2>
      <h2>Algo deu errado, contate um administrador</h2>
    </div>
  );
};
