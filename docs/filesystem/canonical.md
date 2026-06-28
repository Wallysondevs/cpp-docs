# std::filesystem::canonical, std::filesystem::weakly_canonical

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
path canonical( const std::filesystem::path& p );
path canonical( const std::filesystem::path& p,
std::error_code& ec );
path weakly_canonical( const std::filesystem::path& p );
path weakly_canonical( const std::filesystem::path& p,
std::error_code& ec );
```

1,2) Converte o path p para um caminho absoluto canônico, ou seja, um caminho absoluto que não possui elementos de ponto, ponto-ponto ou links simbólicos em sua representação de formato genérico. Se p não for um caminho absoluto, a função se comporta como se fosse primeiro tornado absoluto por `std::filesystem::absolute(p)`. O caminho p deve existir.

3,4) Retorna um caminho composto por `operator/=` a partir do resultado da chamada de `canonical()` com um argumento de caminho composto pelos elementos iniciais de p que existem (conforme determinado por `status(p)` ou `status(p, ec)`), se houver, seguido pelos elementos de p que não existem. O caminho resultante está em [forma normal](<#/doc/filesystem/path>).

### Parâmetros

- **p** — um caminho que pode ser absoluto ou relativo; para `canonical` ele deve ser um caminho existente
- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

1,2) Um caminho absoluto que resolve para o mesmo arquivo que `std::filesystem::absolute(p)`.

3,4) Um caminho normal na forma `canonical(x)/y`, onde x é um caminho composto pela sequência mais longa de elementos iniciais em p que existem, e y é um caminho composto pelos elementos finais restantes e não existentes de p.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar `std::bad_alloc` se a alocação de memória falhar.

1,3) Lança `std::filesystem::filesystem_error` em erros da API do sistema operacional subjacente, construído com p como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento do código de erro.

2,4) Define um parâmetro `std::error_code`& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer.

### Notas

A função `canonical()` é modelada a partir de `realpath` do POSIX.

A função `weakly_canonical()` foi introduzida para simplificar a semântica operacional de `relative()`.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
     
    int main()
    {
        /* configura diretórios sandbox:
         a
         └── b
             ├── c1
             │   └── d <== caminho atual
             └── c2
                 └── e
        */
        auto old = std::filesystem::current_path();
        auto tmp = std::filesystem::temp_directory_path();
        std::filesystem::current_path(tmp);
        auto d1 = tmp / "a/b/c1/d";
        auto d2 = tmp / "a/b/c2/e";
        std::filesystem::create_directories(d1);
        std::filesystem::create_directories(d2);
        std::filesystem::current_path(d1);
     
        auto p1 = std::filesystem::path("../../c2/./e");
        auto p2 = std::filesystem::path("../no-such-file");
        std::cout << "Current path is "
                  << std::filesystem::current_path() << '\n'
                  << "Canonical path for " << p1 << " is "
                  << std::filesystem::canonical(p1) << '\n'
                  << "Weakly canonical path for " << p2 << " is "
                  << std::filesystem::weakly_canonical(p2) << '\n';
        try
        {
            [[maybe_unused]] auto x_x = std::filesystem::canonical(p2);
            // NOT REACHED
        }
        catch (const std::exception& ex)
        {
            std::cout << "Canonical path for " << p2 << " threw exception:\n"
                      << ex.what() << '\n';
        }
     
        // cleanup
        std::filesystem::current_path(old);
        const auto count = std::filesystem::remove_all(tmp / "a");
        std::cout << "Deleted " << count << " files or directories.\n";
    }
```

Saída possível:
```
    Current path is "/tmp/a/b/c1/d"
    Canonical path for "../../c2/./e" is "/tmp/a/b/c2/e"
    Weakly canonical path for "../no-such-file" is "/tmp/a/b/c1/no-such-file"
    Canonical path for "../no-such-file" threw exception:
    filesystem error: in canonical: No such file or directory [../no-such-file] [/tmp/a/b/c1/d]
    Deleted 6 files or directories.
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2956](<https://cplusplus.github.io/LWG/issue2956>) | C++17 | `canonical` tem um parâmetro `base` espúrio | removido

### Veja também

[ path](<#/doc/filesystem/path>)(C++17) | representa um caminho
(class)
[ absolute](<#/doc/filesystem/absolute>)(C++17) | compõe um caminho absoluto
(function)
[ relativeproximate](<#/doc/filesystem/relative>)(C++17) | compõe um caminho relativo
(function)