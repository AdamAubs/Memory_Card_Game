export default function ScoreBoard({ currScore, bestScore }) {
  return (
    <div className="flex flex-col items-start pl-10 mt-5 divide-y divide-solid md:divide-solid">
      <h1 className="text-3xl font-bold font-[Tektur]">Score Board</h1>
      <p className="text-2xl font-bold font-[Tektur]">
        Current Memory Count: {currScore}
      </p>
      <p className="text-2xl font-bold font-[Tektur]">
        Best Memory Score: {bestScore}
      </p>
    </div>
  );
}
