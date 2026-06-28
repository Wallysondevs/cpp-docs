# std::experimental::filesystem::permissions

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
void permissions( const path& p, perms prms );
void permissions( const path& p, perms prms, error_code& ec );
```

Altera as permissões de acesso do arquivo para o qual p se resolve, como se por POSIX [fchmodat](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fchmodat.html>). Symlinks são seguidos se `prms::resolve_symlinks` estiver definido.

Os efeitos dependem de prms da seguinte forma:

  * Se nem perms::add_perms nem perms::remove_perms estiver definido, as permissões do arquivo são definidas exatamente para prms & fs::perms::mask (significando que cada bit válido de prms é aplicado).
  * Se perms::add_perms, as permissões do arquivo são definidas exatamente para status(p).permissions() | (prms & perms::mask) (significando que qualquer bit válido que esteja definido em prms, mas não nas permissões atuais do arquivo, é adicionado às permissões do arquivo).
  * Se perms::remove_perms estiver definido, as permissões do arquivo são definidas exatamente para status(p).permissions() & ~(prms & perms::mask) (significando que qualquer bit válido que esteja limpo em prms, mas definido nas permissões atuais do arquivo, é limpo nas permissões do arquivo).
  * Se ambos perms::add_perms e perms::remove_perms estiverem definidos, ocorre um erro.

A sobrecarga que não lança exceções não tem ação especial em caso de erro.

### Parâmetros

- **p** — caminho a ser examinado
- **prms** — permissões a serem definidas, adicionadas ou removidas
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

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
        std::ofstream("test.txt"); // cria o arquivo
    
        std::cout << "Arquivo criado com as permissões: ";
        demo_perms(fs::status("test.txt").permissions());
    
        fs::permissions("test.txt", fs::perms::add_perms |
                                    fs::perms::owner_all | fs::perms::group_all);
    
        std::cout << "Após adicionar o+rwx e g+rwx:  ";
        demo_perms(fs::status("test.txt").permissions());
    
        fs::remove("test.txt");
    }
```

Saída possível:
```
    Arquivo criado com as permissões: rw-r--r--
    Após adicionar o+rwx e g+rwx:  rwxrwxr--
```

### Veja também

[ perms](<#/doc/experimental/fs/perms>) | identifica permissões do sistema de arquivos
(enum)
[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(function)