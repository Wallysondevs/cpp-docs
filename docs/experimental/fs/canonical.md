# std::experimental::filesystem::canonical

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
path canonical( const path& p, const path& base = current_path() );
path canonical( const path& p, error_code& ec );
path canonical( const path& p, const path& base, error_code& ec );
```

Converte o path p para um path absoluto canônico, ou seja, um path absoluto que não possui elementos de ponto, ponto-ponto ou links simbólicos.

Se p não for um path absoluto, a função se comporta como se fosse primeiro tornado absoluto por absolute(p, base) ou absolute(p) para (2).

O path p deve existir.

### Parâmetros

- **p** — um path que pode ser absoluto ou relativo a base, e que deve ser um path existente
- **base** — path base a ser usado caso p seja relativo
- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

Um path absoluto que resolve para o mesmo arquivo que absolute(p, base) (ou absolute(p) para (2)).

### Exceções

A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente, construída com p como o primeiro argumento, base como o segundo argumento, e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

Esta função é modelada a partir do POSIX [realpath](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html>).

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = fs::path("..") / ".." / "AppData";
        std::cout << "Current path is " << fs::current_path() << '\n'
                  << "Canonical path for " << p << " is " << fs::canonical(p) << '\n';
    }
```

Saída possível:
```
    Current path is "C:\Users\abcdef\AppData\Local\Temp"
    Canonical path for "..\..\AppData" is "C:\Users\abcdef\AppData"
```

### Veja também

[ path](<#/doc/experimental/fs/path>) | representa um path
(classe)
[ absolutesystem_complete](<#/doc/experimental/fs/absolute>) | compõe um path absoluto
converte um path para um path absoluto replicando o comportamento específico do SO
(função)