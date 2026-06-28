# std::experimental::filesystem::directory_options

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
enum class directory_options {
none,
follow_directory_symlink,
skip_permission_denied
};
```

Este tipo representa as opções disponíveis que controlam o comportamento de [`directory_iterator`](<#/doc/experimental/fs/directory_iterator>) e [`recursive_directory_iterator`](<#/doc/experimental/fs/recursive_directory_iterator>).

`directory_options` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|= e operator^= são definidos para este tipo).

### Constantes de membro

Constante de membro | Valor | Significado
---|---|---
`none` | ​0​ | (Padrão) Ignora symlinks de diretório, permissão negada é um erro.
`follow_directory_symlink` | 1 | Segue em vez de ignorar symlinks de diretório.
`skip_permission_denied` | 2 | Ignora diretórios que, de outra forma, resultariam em erros de permissão negada.

### Veja também

[ (construtor)](<#/doc/experimental/fs/directory_iterator/directory_iterator>) | constrói um iterador de diretório
(função membro pública de `std::experimental::filesystem::directory_iterator`)
[ (construtor)](<#/doc/experimental/fs/recursive_directory_iterator/recursive_directory_iterator>) | constrói um iterador de diretório recursivo
(função membro pública de `std::experimental::filesystem::recursive_directory_iterator`)