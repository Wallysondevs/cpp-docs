# std::filesystem::path::lexically_normal, std::filesystem::path::lexically_relative, std::filesystem::path::lexically_proximate

path lexically_normal() const; | (1) | (desde C++17)
---|---|---
path lexically_relative( const path& base ) const; | (2) | (desde C++17)
path lexically_proximate( const path& base ) const; | (3) | (desde C++17)

1) Retorna *this convertido para a [forma normal](<#/doc/filesystem/path>) em seu formato genérico.

2) Retorna *this tornado relativo a base.

  * Primeiro, se root_name() != base.root_name() for verdadeiro ou is_absolute() != base.is_absolute() for verdadeiro ou (!has_root_directory() && base.has_root_directory()) for verdadeiro ou qualquer nome de arquivo em relative_path() ou base.relative_path() puder ser interpretado como um root-name, retorna um path construído por padrão.
  * Caso contrário, primeiro determina o primeiro elemento diferente de *this e base como se por auto [a, b] = mismatch(begin(), end(), base.begin(), base.end()), então

  * se a == end() e b == base.end(), retorna path("."),
  * caso contrário, define N como o número de elementos de nome de arquivo não vazios que não são nem ponto nem ponto-ponto em [b, base.end()), menos o número de elementos de nome de arquivo ponto-ponto. Se N < 0, retorna um path construído por padrão,
  * caso contrário, se N = 0 e a == end() || a->empty(), retorna path("."),
  * caso contrário, retorna um objeto composto por

  * um path() construído por padrão seguido por
  * N aplicações de operator/=(path("..")), seguido por
  * uma aplicação de operator/= para cada elemento no intervalo semiaberto `[`a`, `end()`)`.

3) Se o valor de lexically_relative(base) não for um path vazio, retorna-o. Caso contrário, retorna *this.

### Parâmetros

(nenhum)

### Valor de retorno

1) A forma normal do path.

2) A forma relativa do path.

3) A forma aproximada do path.

### Exceções

Pode lançar exceções definidas pela implementação.

### Observações

Essas conversões são puramente lexicais. Elas não verificam se os paths existem, não seguem symlinks e não acessam o filesystem de forma alguma. Para contrapartes de `lexically_relative` e `lexically_proximate` que seguem symlinks, veja [`relative`](<#/doc/filesystem/relative>) e [`proximate`](<#/doc/filesystem/relative>).

No Windows, o `path` retornado possui barras invertidas (os separadores preferidos).

No POSIX, nenhum nome de arquivo em um path relativo é aceitável como um root-name.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        assert(fs::path("a/./b/..").lexically_normal() == "a/");
        assert(fs::path("a/.///b/../").lexically_normal() == "a/");
        assert(fs::path("/a/d").lexically_relative("/a/b/c") == "../../d");
        assert(fs::path("/a/b/c").lexically_relative("/a/d") == "../b/c");
        assert(fs::path("a/b/c").lexically_relative("a") == "b/c");
        assert(fs::path("a/b/c").lexically_relative("a/b/c/x/y") == "../..");
        assert(fs::path("a/b/c").lexically_relative("a/b/c") == ".");
        assert(fs::path("a/b").lexically_relative("c/d") == "../../a/b");
        assert(fs::path("a/b").lexically_relative("/a/b") == "");
        assert(fs::path("a/b").lexically_proximate("/a/b") == "a/b");
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3070](<https://cplusplus.github.io/LWG/issue3070>) | C++17 | um nome de arquivo que também pode ser um root-name pode causar um resultado surpreendente | tratado como caso de erro
[LWG 3096](<https://cplusplus.github.io/LWG/issue3096>) | C++17 | "/" e "/." finais são tratados incorretamente | corrigido

### Veja também

[ relativeproximate](<#/doc/filesystem/relative>)(C++17) | compõe um path relativo
(função)