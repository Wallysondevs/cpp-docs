# std::experimental::filesystem::equivalent

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool equivalent( const path& p1, const path& p2 );
bool equivalent( const path& p1, const path& p2, error_code& ec );
```

Verifica se os caminhos p1 e p2 se referem ao mesmo arquivo ou diretório e têm o mesmo status de arquivo, conforme determinado por [`status`](<#/doc/experimental/fs/status>) (symlinks são seguidos).

Se p1 ou p2 não existir ou se o tipo de arquivo não for arquivo, diretório ou symlink (conforme determinado por [`is_other`](<#/doc/experimental/fs/is_other>)), um erro é reportado.

A sobrecarga que não lança exceções retorna `false` em caso de erros.

### Parâmetros

- **p1, p2** — caminhos para verificar equivalência
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

`true` se p1 e p2 se referirem ao mesmo arquivo ou diretório e o status de seus arquivos for o mesmo. `false` caso contrário.

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com p1 como o primeiro argumento, p2 como o segundo argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui a especificação [`noexcept`](<#/doc/language/noexcept_spec>):

`noexcept`

### Notas

Dois caminhos são considerados como resolvendo para a mesma entidade do sistema de arquivos se `st_dev` e `st_ino` de sua [estrutura stat](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html>) POSIX, obtidos como se por [stat](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) POSIX, forem iguais (significando que os arquivos estão localizados no mesmo dispositivo e no mesmo local).

Em particular, todos os hard links para o mesmo arquivo ou diretório são equivalentes, e um symlink e seu alvo no mesmo sistema de arquivos são equivalentes.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        // hard link equivalency
        fs::path p1 = ".";
        fs::path p2 = fs::current_path();
        if (fs::equivalent(p1, p2))
            std::cout << p1 << " is equivalent to " << p2 << '\n';
    
        // symlink equivalency
        fs::path p3 = "/lib/libc.so.6";
        fs::path p4 = p3.parent_path() / fs::read_symlink(p3);
        if (fs::equivalent(p3, p4))
            std::cout << p3 << " is equivalent to " << p4 << '\n';
    }
```

Saída possível:
```
    "." is equivalent to "/var/tmp/test"
    "/lib/libc.so.6" is equivalent to "/lib/libc-2.12.so"
```

### Veja também

[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)