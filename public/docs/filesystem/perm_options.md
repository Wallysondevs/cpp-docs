# std::filesystem::perm_options

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
enum class perm_options {
replace = /* unspecified */,
add = /* unspecified */,
remove = /* unspecified */,
nofollow = /* unspecified */
};
```

  
Este tipo representa as opções disponíveis que controlam o comportamento da função [std::filesystem::permissions()](<#/doc/filesystem/permissions>). 

`perm_options` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para este tipo). 

### Constantes de membro

No máximo um de `add`, `remove`, `replace` pode estar presente, caso contrário, o comportamento da função permissions é indefinido. 

Constante de membro | Significado   
---|---
`replace` | As permissões serão completamente substituídas pelo argumento de `permissions()` (comportamento padrão)   
`add` | As permissões serão substituídas pelo OR bit a bit do argumento e das permissões atuais   
`remove` | As permissões serão substituídas pelo AND bit a bit do argumento negado e das permissões atuais   
`nofollow` | As permissões serão alteradas no próprio symlink, em vez de no arquivo para o qual ele resolve   
  
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

[ permissions](<#/doc/filesystem/permissions>)(C++17) |  modifica as permissões de acesso a arquivos   
(função)  
[ perms](<#/doc/filesystem/perms>)(C++17) |  identifica as permissões do sistema de arquivos   
(enum)