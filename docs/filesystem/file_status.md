# std::filesystem::file_status

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
class file_status;  // (desde C++17)
```

Armazena informações sobre o tipo e as permissões de um arquivo.

### Funções membro

[ (construtor)](<#/doc/filesystem/file_status/file_status>) | constrói um objeto `file_status`
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
(destrutor) | destrutor implícito
(função membro pública)
[ type](<#/doc/filesystem/file_status/type>) | obtém ou define o tipo do arquivo
(função membro pública)
[ permissions](<#/doc/filesystem/file_status/permissions>) | obtém ou define as permissões do arquivo
(função membro pública)

### Funções não-membro

[ operator==](<#/>)(C++20) | compara dois objetos `file_status`
(função)

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ statussymlink_status](<#/doc/filesystem/directory_entry/status>) | status do arquivo designado por esta entrada de diretório;
status do arquivo/symlink designado por esta entrada de diretório
(função membro pública de `std::filesystem::directory_entry`)