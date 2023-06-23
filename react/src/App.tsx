import { useEffect, useState } from "react";
import uniqid from "uniqid";

function createMap(size: number) {
  const map = new Map<string, { id: string; name: string }>();
  for (let i = 0; i < size; i++) {
    let id = uniqid();
    map.set(id, { id: id, name: `name-${id}` });
  }
  return map;
}

function createArray(size: number) {
  const array = [];
  for (let i = 0; i < size; i++) {
    let id = uniqid();
    array.push({ id: id, name: `name-${id}` });
  }
  return array;
}

function App() {
  const [timeForSpread, setTimeForSpread] = useState(0);
  const [timeForFor, setTimeForFor] = useState(0);
  const [timeForForEach, setTimeForEach] = useState(0);

  const [timeForSpreadArr, setTimeForSpreadArr] = useState(0);

  const [timeForMapToArrSpreadBackToMap, setTimeForMapToArrSpreadBackToMap] =
    useState(0);
  const [remount, setRemount] = useState(0);

  useEffect(() => {
    const bigMap1 = createMap(200000);
    const bigMap2 = createMap(200000);
    const bigMap3 = createMap(200000);

    const bigArray1 = createArray(200000);
    const bigArray2 = createArray(200000);
    const bigArray3 = createArray(200000);

    const startForEach = performance.now();
    const mapForEach = new Map<string, { id: string; name: string }>();
    bigMap1.forEach((value, key) => mapForEach.set(key, value));
    bigMap2.forEach((value, key) => mapForEach.set(key, value));
    bigMap3.forEach((value, key) => mapForEach.set(key, value));
    setTimeForEach(performance.now() - startForEach);

    const startSpread = performance.now();
    const mapSpread = new Map<string, { id: string; name: string }>([
      ...bigMap1,
      ...bigMap2,
      ...bigMap3,
    ]);
    setTimeForSpread(performance.now() - startSpread);

    const startFor = performance.now();
    const mapFor = new Map<string, { id: string; name: string }>();
    for (let [key, value] of bigMap1) mapFor.set(key, value);
    for (let [key, value] of bigMap2) mapFor.set(key, value);
    for (let [key, value] of bigMap3) mapFor.set(key, value);
    setTimeForFor(performance.now() - startFor);

    const startSpreadArr = performance.now();
    const arrSpread = [...bigArray1, ...bigArray2, ...bigArray3];
    setTimeForSpreadArr(performance.now() - startSpreadArr);
  }, [remount]);
  return (
    <main className="p-4">
      <button
        className="p-3 bg-stone-800 rounded text-white"
        onClick={() => setRemount(Math.random())}
      >
        Remount
      </button>
      <div>Time for spread: {timeForSpread}</div>
      <div>Time for for: {timeForFor}</div>
      <div>Time for forEach: {timeForForEach}</div>
      <div>Time for spread array: {timeForSpreadArr}</div>

      <div>Time for spread back to map: {timeForMapToArrSpreadBackToMap}</div>
    </main>
  );
}

export default App;
