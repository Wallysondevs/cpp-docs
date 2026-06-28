# std::filesystem::perms

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
enum class perms;
```

Este tipo representa permissões de acesso a arquivos.

`perms` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para este tipo). `none` representa a bitmask vazia; cada outro enumerador representa um elemento de bitmask distinto.

As permissões de acesso modelam os [bits de permissão POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html>), e quaisquer permissões de arquivo individuais (conforme relatado por [filesystem::status](<#/doc/filesystem/status>)) são uma combinação de alguns dos seguintes bits:

### Constantes membro

Constante membro | Valor (octal) | Equivalente POSIX | Significado
---|---|---|---
`none` | ​0​ | | Nenhum bit de permissão está definido
`owner_read` | 0400 | S_IRUSR | O proprietário do arquivo tem permissão de leitura
`owner_write` | 0200 | S_IWUSR | O proprietário do arquivo tem permissão de escrita
`owner_exec` | 0100 | S_IXUSR | O proprietário do arquivo tem permissão de execução/busca
`owner_all` | 0700 | S_IRWXU | O proprietário do arquivo tem permissões de leitura, escrita e execução/busca Equivalente a owner_read | owner_write | owner_exec
`group_read` | 040 | S_IRGRP | O grupo de usuários do arquivo tem permissão de leitura
`group_write` | 020 | S_IWGRP | O grupo de usuários do arquivo tem permissão de escrita
`group_exec` | 010 | S_IXGRP | O grupo de usuários do arquivo tem permissão de execução/busca
`group_all` | 070 | S_IRWXG | O grupo de usuários do arquivo tem permissões de leitura, escrita e execução/busca Equivalente a group_read | group_write | group_exec
`others_read` | 04 | S_IROTH | Outros usuários têm permissão de leitura
`others_write` | 02 | S_IWOTH | Outros usuários têm permissão de escrita
`others_exec` | 01 | S_IXOTH | Outros usuários têm permissão de execução/busca
`others_all` | 07 | S_IRWXO | Outros usuários têm permissões de leitura, escrita e execução/busca Equivalente a others_read | others_write | others_exec
`all` | 0777 | | Todos os usuários têm permissões de leitura, escrita e execução/busca Equivalente a owner_all | group_all | others_all
`set_uid` | 04000 | S_ISUID | Define o ID do usuário para o ID do usuário proprietário do arquivo na execução
`set_gid` | 02000 | S_ISGID | Define o ID do grupo para o ID do grupo de usuários do arquivo na execução
`sticky_bit` | 01000 | S_ISVTX | Significado definido pela implementação, mas POSIX XSI especifica que, quando definido em um diretório, apenas os proprietários de arquivos podem excluir arquivos, mesmo que o diretório seja gravável para outros (usado com /tmp)
`mask` | 07777 | | Todos os bits de permissão válidos. Equivalente a all | set_uid | set_gid | sticky_bit

Adicionalmente, as seguintes constantes deste tipo são definidas, as quais não representam permissões:

Constante membro | Valor (hex) | Significado
---|---|---
`unknown` | 0xFFFF | Permissões desconhecidas (por exemplo, quando [filesystem::file_status](<#/doc/filesystem/file_status>) é criado sem permissões)

### Notas

As permissões podem não ser necessariamente implementadas como bits, mas são tratadas dessa forma conceitualmente.

Alguns bits de permissão podem ser ignorados em alguns sistemas, e a alteração de alguns bits pode alterar automaticamente outros (por exemplo, em plataformas sem distinção de proprietário/grupo/todos, definir qualquer um dos três bits de escrita define todos os três).

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    
    void demo_perms(std::filesystem::perms p)
    {
        using std::filesystem::perms;
        auto show = =
        {
            std::cout << (perms::none == (perm & p) ? '-' : op);
        };
        show('r', perms::owner_read);
        show('w', perms::owner_write);
        show('x', perms::owner_exec);
        show('r', perms::group_read);
        show('w', perms::group_write);
        show('x', perms::group_exec);
        show('r', perms::others_read);
        show('w', perms::others_write);
        show('x', perms::others_exec);
        std::cout << '\n';
    }
    
    int main()
    {
        std::ofstream("test.txt"); // create file
    
        std::cout << "Created file with permissions: ";
        demo_perms(std::filesystem::status("test.txt").permissions());
    
        std::filesystem::permissions(
            "test.txt",
            std::filesystem::perms::owner_all | std::filesystem::perms::group_all,
            std::filesystem::perm_options::add
        );
    
        std::cout << "After adding u+rwx and g+rwx:  ";
        demo_perms(std::filesystem::status("test.txt").permissions());
    
        std::filesystem::remove("test.txt");
    }
```

Saída possível:
```
    Created file with permissions: rw-r--r--
    After adding u+rwx and g+wrx:  rwxrwxr--
```

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ permissions](<#/doc/filesystem/permissions>)(C++17) | modifica permissões de acesso a arquivos
(função)