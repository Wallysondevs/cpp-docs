# std::filesystem::directory_entry

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
class directory_entry;
```

Representa uma entrada de diretório. O objeto armazena um `path` como membro e também pode armazenar atributos de arquivo adicionais (contagem de hard links, status, status de symlink, tamanho do arquivo e tempo da última escrita) durante a iteração de diretório.

### Funções Membro

[ (constructor)](<#/doc/filesystem/directory_entry/directory_entry>) | constrói uma entrada de diretório
(função membro pública)
(destructor) | destrutor padrão
(função membro pública)

##### Modificadores

[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ assign](<#/doc/filesystem/directory_entry/assign>) | atribui conteúdo
(função membro pública)
[ replace_filename](<#/doc/filesystem/directory_entry/replace_filename>) | define o nome do arquivo
(função membro pública)
[ refresh](<#/doc/filesystem/directory_entry/refresh>) | atualiza os atributos de arquivo em cache
(função membro pública)

##### Observadores

[ pathoperator const path&](<#/doc/filesystem/directory_entry/path>) | retorna o path ao qual a entrada se refere
(função membro pública)
[ exists](<#/doc/filesystem/directory_entry/exists>) | verifica se a entrada de diretório se refere a um objeto existente do sistema de arquivos
(função membro pública)
[ is_block_file](<#/doc/filesystem/directory_entry/is_block_file>) | verifica se a entrada de diretório se refere a um dispositivo de bloco
(função membro pública)
[ is_character_file](<#/doc/filesystem/directory_entry/is_character_file>) | verifica se a entrada de diretório se refere a um dispositivo de caractere
(função membro pública)
[ is_directory](<#/doc/filesystem/directory_entry/is_directory>) | verifica se a entrada de diretório se refere a um diretório
(função membro pública)
[ is_fifo](<#/doc/filesystem/directory_entry/is_fifo>) | verifica se a entrada de diretório se refere a um pipe nomeado
(função membro pública)
[ is_other](<#/doc/filesystem/directory_entry/is_other>) | verifica se a entrada de diretório se refere a um arquivo _outro_
(função membro pública)
[ is_regular_file](<#/doc/filesystem/directory_entry/is_regular_file>) | verifica se a entrada de diretório se refere a um arquivo regular
(função membro pública)
[ is_socket](<#/doc/filesystem/directory_entry/is_socket>) | verifica se a entrada de diretório se refere a um socket IPC nomeado
(função membro pública)
[ is_symlink](<#/doc/filesystem/directory_entry/is_symlink>) | verifica se a entrada de diretório se refere a um link simbólico
(função membro pública)
[ file_size](<#/doc/filesystem/directory_entry/file_size>) | retorna o tamanho do arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ hard_link_count](<#/doc/filesystem/directory_entry/hard_link_count>) | retorna o número de hard links que se referem ao arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ last_write_time](<#/doc/filesystem/directory_entry/last_write_time>) | obtém o tempo da última modificação de dados do arquivo ao qual a entrada de diretório se refere
(função membro pública)
[ statussymlink_status](<#/doc/filesystem/directory_entry/status>) | status do arquivo designado por esta entrada de diretório;
status do arquivo/symlink designado por esta entrada de diretório
(função membro pública)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/filesystem/directory_entry/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara duas entradas de diretório
(função membro pública)

### Funções Não-Membro

[ operator<<](<#/doc/filesystem/directory_entry/operator_ltlt>) | realiza a saída de stream em uma entrada de diretório
(função)

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3171](<https://cplusplus.github.io/LWG/issue3171>) | C++17 | `directory_entry` não podia ser inserido por `operator<<` devido a LWG2989 | saída reativada