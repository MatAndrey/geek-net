interface TreeObject {
  answeron: number | null;
  [x: string]: any;
}

export function listToTree(list: TreeObject[]) {
  const map: any = {};
  const roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
    list[i].comments = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    let node = list[i];
    if (node.answeron !== null) {
      list[map[`${node.answeron}`]].comments.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
