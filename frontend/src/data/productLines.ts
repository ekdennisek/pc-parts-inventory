type ProductLineRule = {
    pattern: RegExp;
    line: string;
};

// First match wins, so more specific lines go before broader ones. A capture group marks a
// tier, and the tiers of one line are listed together, e.g. "Core i3 / i5 / i7"
const productLineRules: ProductLineRule[] = [
    { pattern: /^Athlon 64 X2\b/, line: "Athlon 64 X2" },
    { pattern: /^Athlon 64 FX\b/, line: "Athlon 64 FX" },
    { pattern: /^Athlon 64\b/, line: "Athlon 64" },
    { pattern: /^(?:Low-power )?Athlon XP\b/, line: "Athlon XP" },
    { pattern: /^Athlon II\b/, line: "Athlon II" },
    // Later dual and quad cores dropped the "64", e.g. "Athlon X2 4450e" and "Athlon X4 860K"
    { pattern: /^Athlon (X\d)\b/, line: "Athlon" },
    { pattern: /^Athlon\b/, line: "Athlon" },
    { pattern: /^Phenom II\b/, line: "Phenom II" },
    { pattern: /^Phenom\b/, line: "Phenom" },
    { pattern: /^Sempron\b/, line: "Sempron" },
    { pattern: /^FX-/, line: "FX" },
    // Both "Pro A10-8770" and "A10 Pro-7800B"
    { pattern: /^(?:Pro )?(A\d+)[- ]/, line: "" },
    { pattern: /^(E\d+)-/, line: "" },
    { pattern: /^FirePro\b/, line: "FirePro" },
    { pattern: /^Core (i\d)\b/, line: "Core" },
    { pattern: /^Core 2 Duo\b/, line: "Core 2 Duo" },
    { pattern: /^Core 2 Quad\b/, line: "Core 2 Quad" },
    { pattern: /^Core 2 Extreme\b/, line: "Core 2 Extreme" },
    { pattern: /^Pentium 4 Extreme Edition\b/, line: "Pentium 4 Extreme Edition" },
    { pattern: /^Pentium 4\b/, line: "Pentium 4" },
    { pattern: /^Pentium III\b/, line: "Pentium III" },
    { pattern: /^Pentium II\b/, line: "Pentium II" },
    { pattern: /^(?:Embedded )?Pentium MMX\b/, line: "Pentium MMX" },
    { pattern: /^(?:Embedded )?Pentium\b/, line: "Pentium" },
];

const byNumber = (a: string, b: string): number => a.localeCompare(b, undefined, { numeric: true });

// Product lines among the given CPU names, most common first. Names matching no rule are skipped.
export const getProductLines = (names: string[]): string[] => {
    const found = new Map<ProductLineRule, { count: number; tiers: Set<string> }>();

    for (const name of names) {
        for (const rule of productLineRules) {
            const match = rule.pattern.exec(name);
            if (!match) continue;
            const entry = found.get(rule) ?? { count: 0, tiers: new Set<string>() };
            entry.count++;
            if (match[1]) entry.tiers.add(match[1]);
            found.set(rule, entry);
            break;
        }
    }

    return [...found]
        .sort(
            ([ruleA, a], [ruleB, b]) =>
                b.count - a.count ||
                productLineRules.indexOf(ruleA) - productLineRules.indexOf(ruleB),
        )
        .map(([rule, { tiers }]) =>
            [rule.line, [...tiers].sort(byNumber).join(" / ")].filter(Boolean).join(" "),
        );
};
