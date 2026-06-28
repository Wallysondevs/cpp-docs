# std::experimental::filesystem::perms

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
enum class perms;
```

  
Este tipo representa permissões de acesso a arquivos. `perms` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para este tipo). 

As permissões de acesso modelam os [bits de permissão POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html>), e quaisquer permissões de arquivo individuais (conforme relatado por [status](<#/doc/experimental/fs/status>)) são uma combinação de alguns dos seguintes bits: 

### Constantes membro

Constante membro  | Valor (octal)  | Equivalente POSIX  | Significado   
---|---|---|---
`none` | ​0​ |  | Nenhum bit de permissão está definido   
`owner_read` | 0400 | S_IRUSR | O proprietário do arquivo tem permissão de leitura   
`owner_write` | 0200 | S_IWUSR | O proprietário do arquivo tem permissão de escrita   
`owner_exec` | 0100 | S_IXUSR | O proprietário do arquivo tem permissão de execução/busca   
`owner_all` | 0700 | S_IRWXU | O proprietário do arquivo tem permissões de leitura, escrita e execução/busca Equivalente a owner_read | owner_write | owner_exec  
`group_read` | 040 | S_IRGRP | O grupo de usuários do arquivo tem permissão de leitura   
`group_write` | 020 | S_IWGRP | O grupo de usuários do arquivo tem permissão de escrita   
`group_exec` | 010 | S_IXGRP | O grupo de usuários do arquivo tem permissão de execução/busca   
`group_all` | 070 | S_IRWXG | O grupo de usuários do arquivo tem permissões de leitura, escrita e execução/busca Equivalente a group_read | group_write | group_exec  
`others_read` | 04 | S_IROTH | Outros usuários têm permissão de leitura   
`others_write` 02 | S_IWOTH | Outros usuários têm permissão de escrita   
`others_exec` | 01 | S_IXOTH | Outros usuários têm permissão de execução/busca   
`others_all` | 07 | S_IRWXO | Outros usuários têm permissões de leitura, escrita e execução/busca Equivalente a others_read | others_write | others_exec  
`all` | 0777 |  | Todos os usuários têm permissões de leitura, escrita e execução/busca Equivalente a owner_all | group_all | others_all  
`set_uid` | 04000 | S_ISUID | Define o ID do usuário para o ID do usuário proprietário do arquivo na execução   
`set_gid` | 02000 | S_ISGID | Define o ID do grupo para o ID do grupo de usuários do arquivo na execução   
`sticky_bit` | 01000 | S_ISVTX | Significado definido pela implementação, mas POSIX XSI especifica que, quando definido em um diretório, apenas os proprietários de arquivos podem excluir arquivos, mesmo que o diretório seja gravável para outros (usado com /tmp)   
`mask` | 07777 |  | Todos os bits de permissão válidos Equivalente a all | set_uid | set_gid | sticky_bit  
  
Além disso, as seguintes constantes deste tipo são definidas, que não representam permissões: 

Constante membro  | Valor (hex)  | Significado   
---|---|---
`unknown` | 0xFFFF | Permissões desconhecidas (por exemplo, quando [file_status](<#/doc/experimental/fs/file_status>) é criado sem permissões)   
`add_perms` | 0x10000 | Bit de controle que instrui [permissions](<#/doc/experimental/fs/permissions>) a adicionar, mas não limpar bits de permissão   
`remove_perms` | 0x20000 | Bit de controle que instrui [permissions](<#/doc/experimental/fs/permissions>) a limpar, mas não adicionar bits de permissão   
`resolve_symlinks` | 0x40000 | Bit de controle que instrui [permissions](<#/doc/experimental/fs/permissions>) a resolver symlinks   
  
### Notas

As permissões podem não ser necessariamente implementadas como bits, mas são tratadas dessa forma conceitualmente. 

Alguns bits de permissão podem ser ignorados em alguns sistemas, e a alteração de alguns bits pode alterar automaticamente outros (por exemplo, em plataformas sem distinção de proprietário/grupo/todos, definir qualquer um dos três bits de escrita define todos os três). 

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    void demo_perms(fs::perms p)
    {
         std::cout << ((p & fs::perms::owner_read) != fs::perms::none ? "r" : "-")
                   << ((p & fs::perms::owner_write) != fs::perms::none ? "w" : "-")
                   << ((p & fs::perms::owner_exec) != fs::perms::none ? "x" : "-")
                   << ((p & fs::perms::group_read) != fs::perms::none ? "r" : "-")
                   << ((p & fs::perms::group_write) != fs::perms::none ? "w" : "-")
                   << ((p & fs::perms::group_exec) != fs::perms::none ? "x" : "-")
                   << ((p & fs::perms::others_read) != fs::perms::none ? "r" : "-")
                   << ((p & fs::perms::others_write) != fs::perms::none ? "w" : "-")
                   << ((p & fs::perms::others_exec) != fs::perms::none ? "x" : "-")
                   << '\n';
    }
    
    int main()
    {
        std::ofstream("test.txt"); // create file
    
        std::cout << "Created file with permissions: ";
        demo_perms(fs::status("test.txt").permissions());
    
        fs::permissions("test.txt", fs::perms::add_perms |
                                    fs::perms::owner_all | fs::perms::group_all);
    
        std::cout << "After adding o+rwx and g+rwx:  ";
        demo_perms(fs::status("test.txt").permissions());
    
        fs::remove("test.txt");
    }
```

Saída possível: 
```
    Created file with permissions: rw-r--r--
    After adding o+rwx and g+rwx:  rwxrwxr--
```

### Veja também

[ statussymlink_status](<#/doc/experimental/fs/status>) |  determina atributos de arquivo  
determina atributos de arquivo, verificando o alvo do symlink   
(função)  
[ permissions](<#/doc/experimental/fs/permissions>) |  modifica permissões de acesso a arquivos   
(função)