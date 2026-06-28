# std::filesystem::permissions

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void permissions( const std::filesystem::path& p,
std::filesystem::perms prms,
std::filesystem::perm_options opts = perm_options::replace );
void permissions( const std::filesystem::path& p,
std::filesystem::perms prms,
std::error_code& ec ) noexcept;
void permissions( const std::filesystem::path& p,
std::filesystem::perms prms,
std::filesystem::perm_options opts,
std::error_code& ec );
```

Altera as permissões de acesso do arquivo para o qual p se resolve, como se por POSIX [`fchmodat`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fchmodat.html>). Symlinks são seguidos a menos que `perm_options::nofollow` seja definido em opts.

A segunda assinatura se comporta como se fosse chamada com opts definido como perm_options::replace.

Os efeitos dependem de prms e opts da seguinte forma:

*   Se opts for perm_options::replace, as permissões do arquivo são definidas exatamente como prms & [std::filesystem::perms::mask](<#/doc/filesystem/perms>) (significando que cada bit válido de prms é aplicado).
*   Se opts for perm_options::add, as permissões do arquivo são definidas exatamente como status(p).permissions() | (prms & perms::mask) (significando que qualquer bit válido que esteja definido em prms, mas não nas permissões atuais do arquivo, é adicionado às permissões do arquivo).
*   Se opts for perm_options::remove, as permissões do arquivo são definidas exatamente como status(p).permissions() & ~(prms & perms::mask) (significando que qualquer bit válido que esteja limpo em prms, mas definido nas permissões atuais do arquivo, é limpo nas permissões do arquivo).

opts é exigido que tenha apenas um de `replace`, `add`, ou `remove` definido.

A sobrecarga que não lança exceções não possui ação especial em caso de erro.

### Parâmetros

- **p** — caminho a ser examinado
- **prms** — permissões a serem definidas, adicionadas ou removidas
- **opts** — opções que controlam a ação realizada por esta função
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construída com p como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento de código de erro.

2,3) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

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

[ perms](<#/doc/filesystem/perms>)(C++17) | identifica permissões do sistema de arquivos
(enum)
[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)