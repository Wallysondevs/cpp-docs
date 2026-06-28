# std::experimental::filesystem::file_type

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
enum class file_type {
none = 0,
not_found = -1,
regular = 1,
directory = 2,
symlink = 3,
block = 4,
character = 5,
fifo = 6,
socket = 7,
unknown = 8
};
```

Indica um tipo de arquivo ou diretório ao qual um caminho se refere.

| Esta seção está incompleta

### Constantes

Constante | Significado
---|---
`none` | indica que o status do arquivo ainda não foi avaliado, ou que ocorreu um erro ao avaliá-lo
`not_found` | indica que o arquivo não foi encontrado (isso não é considerado um erro)
`regular` | um arquivo regular
`directory` | um diretório
`symlink` | um link simbólico
`block` | um arquivo especial de bloco
`character` | um arquivo especial de caractere
`fifo` | um arquivo FIFO (também conhecido como pipe)
`socket` | um arquivo socket
`unknown` | um arquivo desconhecido

### Veja também

| Esta seção está incompleta