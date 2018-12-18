import { walkSync } from "walk";
import { basename } from "path";
import { readFileSync } from "fs";

const testFolder = "./benchmark/queries";

export interface QueryFile {
  name: string;
  speed: string;
  filePath: string;
  query: string;
}

export function getQueryFileForName(name): QueryFile {
  const queryFiles = getQueryFiles();
  const matches = queryFiles.filter(queryFile => queryFile.name == name);
  if (matches.length > 1) {
    throw new Error("more than one query matched the given name. Provide a non ambiguous name.");
  }
  if (matches.length == 0) {
    const candidates = queryFiles.filter(queryFile => queryFile.filePath.includes(name)).map(qf => qf.name);
    throw new Error(`No query matched the given name. The following queries included the provided name: ${candidates}`);
  }
  return matches[0];
}

export function getQueryFiles(): QueryFile[] {
  const queryFiles: QueryFile[] = [];

  const options = {
    listeners: {
      file: function(root, fileStats, next) {
        // console.log(fileStats.name);
        if (fileStats.name.endsWith(".graphql")) {
          // console.log(root)
          // console.log(fileStats.name);
          const fileName = basename(fileStats.name, ".graphql");
          const parts = fileName.split("_");
          const filePath = root + "/" + fileStats.name;
          const query = {
            name: parts[parts.length - 2],
            speed: parts[parts.length - 1],
            filePath: filePath,
            query: readFileSync(filePath, { encoding: "utf-8" })
          };
          queryFiles.push(query);
        }
        next();
      },
      errors: function(_0, _1, next) {
        console.log("error");
        console.log(_1);
        next();
      }
    }
  };

  walkSync(testFolder, options);
  return queryFiles.sort((one, two) => {
    if (one.filePath > two.filePath) {
      return 1;
    } else {
      return -1;
    }
  });
}
