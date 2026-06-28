# std::experimental::filesystem::directory_entry

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
class directory_entry;
```

Representa uma entrada de diretório. Os objetos armazenam um `path` e dois objetos `file_status`: um para o status do arquivo e o segundo para o status do arquivo apontado, caso a entrada de diretório se refira a um link simbólico.

### Funções Membro

[ (constructor)](<#/doc/experimental/fs/directory_entry/directory_entry>) | constrói uma entrada de diretório
(função membro pública)
(destructor) | destrutor padrão
(função membro pública)

##### Modificadores

[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ assign](<#/doc/experimental/fs/directory_entry/assign>) | atribui conteúdo
(função membro pública)
[ replace_filename](<#/doc/experimental/fs/directory_entry/replace_filename>) | define o nome do arquivo
(função membro pública)

##### Observadores

[ pathoperator const path&](<#/doc/experimental/fs/directory_entry/path>) | retorna o path ao qual a entrada se refere
(função membro pública)
[ statussymlink_status](<#/doc/experimental/fs/directory_entry/status>) | status em cache do arquivo designado por esta entrada de diretório
symlink_status em cache do arquivo designado por esta entrada de diretório
(função membro pública)
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/fs/directory_entry/operator_cmp>) | compara duas entradas de diretório
(função membro pública)