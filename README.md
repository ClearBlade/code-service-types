# code-service-types

TypeScript type declarations for the [ClearBlade library](https://github.com/ClearBlade/native-libraries/blob/master/clearblade.md) that runs inside the ClearBlade code service engine.

## Installation

`npm i --save-dev @clearblade/code-service-types`

## Configuration

Add an entry to the files compiler option in tsconfig.json.

```
{
  "files": [
    "node_modules/@clearblade/code-service-types/types/globals.d.ts",
    "node_modules/@clearblade/code-service-types/types/index.d.ts"
  ]
}
```

## Motivation

Going through the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) PR process has proven to be difficult for our team as the [ClearBlade library](https://github.com/ClearBlade/native-libraries/blob/master/clearblade.md) is being constantly updated. To provide up-to-date type declarations, we have temporarily moved outside of DefinitelyTyped. Once changes to the library become less frequent, we will move back to the standard `@types` declaration system.
