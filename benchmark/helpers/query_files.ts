import { walkSync } from "walk";
import { basename } from "path";

const testFolder = "./benchmark/queries";

export interface QueryFile {
  name: string;
  speed: string;
  filePath: string;
}

export function getQueryFileForName(name): QueryFile {
  const queryFiles = getQueryFiles();
  const matches = queryFiles.filter(queryFile => queryFile.name == name);
  if (matches.length > 1) {
    throw new Error("more than one test matched the given name. Provide a non ambiguous name.");
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
          const query = {
            name: parts[parts.length - 2],
            speed: parts[parts.length - 1],
            filePath: root + "/" + fileStats.name
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
  return queryFiles;
}
