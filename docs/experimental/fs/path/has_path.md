# std::experimental::filesystem::path::has_...

bool has_root_path() const; | (1) | (filesystem TS)
---|---|---
bool has_root_name() const; | (2) | (filesystem TS)
bool has_root_directory() const; | (3) | (filesystem TS)
bool has_relative_path() const; | (4) | (filesystem TS)
bool has_parent_path() const; | (5) | (filesystem TS)
bool has_filename() const; | (6) | (filesystem TS)
bool has_stem() const; | (7) | (filesystem TS)
bool has_extension() const; | (8) | (filesystem TS)

Verifica se o path contém o elemento de path correspondente.

1) Verifica se [root_path()](<#/doc/experimental/fs/path/root_path>) está vazio.

2) Verifica se [root_name()](<#/doc/experimental/fs/path/root_name>) está vazio.

3) Verifica se [root_directory()](<#/doc/experimental/fs/path/root_directory>) está vazio.

4) Verifica se [relative_path()](<#/doc/experimental/fs/path/relative_path>) está vazio.

5) Verifica se [parent_path()](<#/doc/experimental/fs/path/parent_path>) está vazio.

6) Verifica se [filename()](<#/doc/experimental/fs/path/filename>) está vazio.

7) Verifica se [stem()](<#/doc/experimental/fs/path/stem>) está vazio.

8) Verifica se [extension()](<#/doc/experimental/fs/path/extension>) está vazio.

### Parâmetros

(nenhum)

### Valor de retorno

true se o path correspondente não estiver vazio, false caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ empty](<#/doc/experimental/fs/path/empty>) | verifica se o path está vazio
(função membro pública)