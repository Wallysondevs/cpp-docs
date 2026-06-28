# std::filesystem::directory_options

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
enum class directory_options {
none = /* unspecified */,
follow_directory_symlink = /* unspecified */,
skip_permission_denied = /* unspecified */
};
```

Este tipo representa as opções disponíveis que controlam o comportamento de [`directory_iterator`](<#/doc/filesystem/directory_iterator>) e [`recursive_directory_iterator`](<#/doc/filesystem/recursive_directory_iterator>).

`directory_options` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para este tipo). `none` representa a bitmask vazia; cada outro enumerador representa um elemento de bitmask distinto.

### Constantes membro

Constante membro | Significado
---|---
`none` | (Padrão) Ignora symlinks de diretório, permissão negada é um erro.
`follow_directory_symlink` | Segue em vez de ignorar symlinks de diretório.
`skip_permission_denied` | Ignora diretórios que, de outra forma, resultariam em erros de permissão negada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ (construtor)](<#/doc/filesystem/directory_iterator/directory_iterator>) | constrói um iterator de diretório
(função membro pública de `std::filesystem::directory_iterator`)
[ (construtor)](<#/doc/filesystem/recursive_directory_iterator/recursive_directory_iterator>) | constrói um iterator de diretório recursivo
(função membro pública de `std::filesystem::recursive_directory_iterator`)