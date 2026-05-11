import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const readProjectFile = (path) => readFileSync(new URL(path, root), "utf8");
const publicHeroSource = (source) => {
  const heroStart = source.indexOf('data-testid="public-hero"');
  const sectionStart = source.lastIndexOf("<section", heroStart);
  const heroEnd = source.indexOf("</section>", heroStart);

  assert.notEqual(heroStart, -1, "public hero section should exist");
  assert.notEqual(sectionStart, -1, "public hero section should start with section tag");
  return source.slice(sectionStart, heroEnd);
};

test("public navigation is rendered inside the hero section", () => {
  const source = readProjectFile("src/PMECRedesignFull.jsx");
  const heroSource = publicHeroSource(source);

  assert.match(heroSource, /publicTabs\.map/, "public tab navigation should be moved into the hero section");
});

test("medical staff header has no horizontal module navigation list", () => {
  const source = readProjectFile("src/components/layout/HeaderPortal.jsx");

  assert.doesNotMatch(source, /topNavItems/, "medical header should not keep the old horizontal module nav list");
});

test("public trends section includes alerts below the charts", () => {
  const source = readProjectFile("src/PMECRedesignFull.jsx");
  const trendsStart = source.indexOf('tab === "tendencias"');
  const trendsEnd = source.indexOf('tab === "prevencion"', trendsStart);
  const trendsSource = source.slice(trendsStart, trendsEnd);

  assert.notEqual(trendsStart, -1, "public trends branch should exist");
  assert.match(trendsSource, /Alertas epidemiologicas/, "public trends should show alerts under the chart cards");
  assert.match(trendsSource, /alertsSeed\.map/, "public trends should reuse the same alert data as the medical alert view");
});

test("public hero blue bar includes the epidemiology dashboard image", () => {
  const source = readProjectFile("src/PMECRedesignFull.jsx");
  const heroSource = publicHeroSource(source);

  assert.ok(
    existsSync(new URL("src/assets/public-hero-epidemiology.png", root)),
    "public hero image asset should exist",
  );
  assert.match(source, /import publicHeroImage from "\.\/assets\/public-hero-epidemiology\.png"/);
  assert.match(heroSource, /src=\{publicHeroImage\}/, "hero should render the imported image");
  assert.match(heroSource, /alt="Mapa epidemiologico y tablero de vigilancia PMEC"/);
});

test("public indicators include a quick reading panel", () => {
  const source = readProjectFile("src/PMECRedesignFull.jsx");
  const indicatorsStart = source.indexOf('tab === "indicadores"');
  const indicatorsEnd = source.indexOf('tab === "mapa"', indicatorsStart);
  const indicatorsSource = source.slice(indicatorsStart, indicatorsEnd);

  assert.notEqual(indicatorsStart, -1, "public indicators branch should exist");
  assert.match(indicatorsSource, /Lectura rapida del corte/);
  assert.match(indicatorsSource, /Semaforo epidemiologico/);
  assert.match(indicatorsSource, /Prioridad territorial/);
});
