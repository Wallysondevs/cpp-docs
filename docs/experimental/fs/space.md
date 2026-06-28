# std::experimental::filesystem::space

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
space_info space( const path& p );
space_info space( const path& p, error_code& ec ) noexcept;
```

Determina as informações sobre o sistema de arquivos no qual o caminho p está localizado, como se fosse por POSIX [`statvfs`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/statvfs.html>).

Preenche e retorna um objeto do tipo [`space_info`](<#/doc/experimental/fs/space_info>), definido a partir dos membros da `struct statvfs` POSIX da seguinte forma:

*   space_info.capacity é definido como se fosse por f_blocks * f_frsize.
*   space_info.free é definido como f_bfree * f_frsize.
*   space_info.available é definido como f_bavail * f_frsize.
*   Qualquer membro que não pôde ser determinado é definido como static_cast<[std::uintmax_t](<#/doc/types/integer>)>(-1).

A sobrecarga que não lança exceções define todos os membros como static_cast<[std::uintmax_t](<#/doc/types/integer>)>(-1) em caso de erro.

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

As informações do sistema de arquivos (um objeto [`space_info`](<#/doc/experimental/fs/space_info>)).

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui a especificação

[`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Notas

space_info.available pode ser menor que space_info.free.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::space_info devi = fs::space("/dev/null");
        fs::space_info tmpi = fs::space("/tmp");
    
        std::cout << "         Capacity         Free    Available\n"
                  << "/dev:   " << devi.capacity << "   "
                  << devi.free << "   " << devi.available << '\n'
                  << "/tmp: " << tmpi.capacity << ' '
                  << tmpi.free << ' ' << tmpi.available << '\n';
    }
```

Saída possível:
```
              Capacity         Free    Available
    /dev:   4175114240   4175110144   4175110144
    /tmp: 420651237376 411962273792 390570749952
```

### Veja também

[ space_info](<#/doc/experimental/fs/space_info>) | informações sobre espaço livre e disponível no sistema de arquivos
(classe)