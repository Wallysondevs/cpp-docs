# std::filesystem::path::has_root_path, std::filesystem::path::has_root_name, std::filesystem::path::has_root_directory, std::filesystem::path::has_relative_path, std::filesystem::path::has_parent_path, std::filesystem::path::has_filename, std::filesystem::path::has_stem, std::filesystem::path::has_extension

bool has_root_path() const; | (1) | (desde C++17)
---|---|---
bool has_root_name() const; | (2) | (desde C++17)
bool has_root_directory() const; | (3) | (desde C++17)
bool has_relative_path() const; | (4) | (desde C++17)
bool has_parent_path() const; | (5) | (desde C++17)
bool has_filename() const; | (6) | (desde C++17)
bool has_stem() const; | (7) | (desde C++17)
bool has_extension() const; | (8) | (desde C++17)

Verifica se o path contém o elemento de path correspondente.

1) Verifica se [`root_path()`](<#/doc/filesystem/path/root_path>) está vazio.

2) Verifica se [`root_name()`](<#/doc/filesystem/path/root_name>) está vazio.

3) Verifica se [`root_directory()`](<#/doc/filesystem/path/root_directory>) está vazio.

4) Verifica se [`relative_path()`](<#/doc/filesystem/path/relative_path>) está vazio.

5) Verifica se [`parent_path()`](<#/doc/filesystem/path/parent_path>) está vazio.

6) Verifica se [`filename()`](<#/doc/filesystem/path/filename>) está vazio.

7) Verifica se [`stem()`](<#/doc/filesystem/path/stem>) está vazio.

8) Verifica se [`extension()`](<#/doc/filesystem/path/extension>) está vazio.

### Parâmetros

(nenhum)

### Valor de retorno

true se o componente de path correspondente não estiver vazio, false caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ empty](<#/doc/filesystem/path/empty>) | verifica se o path está vazio
(função membro pública)