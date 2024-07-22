function GamePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Game Page</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}

export default GamePage;
