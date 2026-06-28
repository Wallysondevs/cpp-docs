# std::filesystem::equivalent

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool equivalent( const std::filesystem::path& p1,
const std::filesystem::path& p2 );
bool equivalent( const std::filesystem::path& p1,
const std::filesystem::path& p2,
std::error_code& ec ) noexcept;
```

Verifica se os caminhos p1 e p2 se resolvem para a mesma entidade do sistema de arquivos.

Se p1 ou p2 não existir, um erro é reportado.

A sobrecarga que não lança exceções retorna `false` em caso de erros.

### Parâmetros

- **p1, p2** — caminhos para verificar equivalência
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

`true` se p1 e p2 se referem ao mesmo arquivo ou diretório e seus status de arquivo são os mesmos. `false` caso contrário.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API subjacente do SO, construída com p1 como o primeiro argumento de caminho, p2 como o segundo argumento de caminho, e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& com o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Observações

Dois caminhos são considerados como resolvendo para a mesma entidade do sistema de arquivos se as duas entidades candidatas para as quais os caminhos se resolvem estiverem localizadas no mesmo dispositivo e no mesmo local. Para POSIX, isso significa que os membros `st_dev` e `st_ino` de sua [`stat` structure](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html>) POSIX, obtidos como se por [`stat()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html>) POSIX, são iguais.

Em particular, todos os hard links para o mesmo arquivo ou diretório são equivalentes, e um symlink e seu alvo no mesmo sistema de arquivos são equivalentes.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        // hard link equivalency
        fs::path p1 = ".";
        fs::path p2 = fs::current_path();
        if (fs::equivalent(p1, p2))
            std::cout << p1 << " is equivalent to " << p2 << '\n';
    
        // symlink equivalency
        for (const fs::path lib : {"/lib/libc.so.6", "/lib/x86_64-linux-gnu/libc.so.6"})
        {
            try
            {
                p2 = lib.parent_path() / fs::read_symlink(lib);
            }
            catch (std::filesystem::filesystem_error const& ex)
            {
                std::cout << ex.what() << '\n';
                continue;
            }
    
            if (fs::equivalent(lib, p2))
                std::cout << lib << " is equivalent to " << p2 << '\n';
        }
    }
```

Saída possível:
```
    "." is equivalent to "/var/tmp/test"
    filesystem error: read_symlink: No such file or directory [/lib/libc.so.6]
    "/lib/x86_64-linux-gnu/libc.so.6" is equivalent to "/lib/x86_64-linux-gnu/libc-2.23.so"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2937](<https://cplusplus.github.io/LWG/issue2937>) | C++17 | condição de erro especificada incorretamente | corrigido

### Veja também

[ compare](<#/doc/filesystem/path/compare>) | compara as representações lexicais de dois caminhos lexicograficamente
(função membro pública de `std::filesystem::path`)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/filesystem/path/operator_cmp>)(C++17)(C++17)(até C++20)(C++17)(até C++20)(C++17)(até C++20)(C++17)(até C++20)(C++17)(até C++20)(C++20) | compara dois caminhos lexicograficamente
(função)
[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)