# std::experimental::filesystem::path::is_absolute,is_relative

bool is_absolute() const; | (1) | (filesystem TS)
---|---|---
bool is_relative() const; | (2) | (filesystem TS)

Verifica se o caminho é absoluto ou relativo. Um caminho absoluto é tal que os elementos de `root_path()` identificam unicamente uma localização no sistema de arquivos. A primeira versão retorna `true` se o caminho é absoluto, `false` caso contrário; a segunda versão faz o oposto.

### Parâmetros

(nenhum)

### Valor de retorno

1) `true` se o caminho é absoluto, `false` caso contrário.

2) `false` se o caminho é absoluto, `true` caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ has_root_pathhas_root_namehas_root_directoryhas_relative_pathhas_parent_pathhas_filenamehas_stemhas_extension](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento do caminho correspondente não está vazio
(função membro pública)