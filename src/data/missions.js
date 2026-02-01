export const missions = [
{
id: 1,
title: "Renfort React",
description: "Intervention sur une application React existante (UI + intégration API).",
tags: ["react", "frontend", "api"],
createdAt: "2026-02-01T10:00:00.000Z"
},
{
id: 2,
title: "API Node/Express",
description: "Mise en place d'une API REST : routes, controllers, gestion d'erreurs.",
tags: ["node.js", "express", "api"],
createdAt: "2026-02-01T10:10:00.000Z"
},
{
id: 3,
title: "Maintenance & évolution",
description: "Corrections, petites évolutions, amélioration des performances.",
tags: ["maintenance", "bugfix", "performance"],
createdAt: "2026-02-01T10:20:00.000Z"
}

];


export function nextId(list) {
    const max = list.reduce((acc, item) => Math.max(acc, item.id), 0);
    return max + 1;
}