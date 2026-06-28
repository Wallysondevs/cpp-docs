# std::experimental::filesystem::path::concat, std::experimental::filesystem::path::operator+=

path& operator+=( const path& p ); | (1) | (filesystem TS)
---|---|---
path& operator+=( const string_type& str ); | (2) | (filesystem TS)
path& operator+=( const value_type* ptr ); | (3) | (filesystem TS)
path& operator+=( value_type x ); | (4) | (filesystem TS)
template< class Source >
path& operator+=( const Source& source ); | (5) | (filesystem TS)
template< class CharT >
path& operator+=( CharT x ); | (6) | (filesystem TS)
template< class Source >
path& concat( const Source& source ); | (7) | (filesystem TS)
template< class InputIt >
path& concat( InputIterator first, InputIterator last ); | (8) | (filesystem TS)

Concatena o caminho atual e o argumento.

1) Concatena `*this` e `p` de tal forma que o `[native()](<#/doc/experimental/fs/path/native>)` do resultado é exatamente o `[native()](<#/doc/experimental/fs/path/native>)` original concatenado com `p.native()`.

2) O mesmo que (1), exceto que o `[native()](<#/doc/experimental/fs/path/native>)` resultante é uma concatenação do `[native()](<#/doc/experimental/fs/path/native>)` original e da string `str`.

3) O mesmo que (1), exceto que o `[native()](<#/doc/experimental/fs/path/native>)` resultante é uma concatenação do `[native()](<#/doc/experimental/fs/path/native>)` original e da string terminada em nulo cujo primeiro caractere é apontado por `ptr`.

4) O mesmo que (1), exceto que o `[native()](<#/doc/experimental/fs/path/native>)` resultante é uma concatenação do `[native()](<#/doc/experimental/fs/path/native>)` original e do caractere único `x`.

5) O mesmo que (1), exceto que o `[native()](<#/doc/experimental/fs/path/native>)` resultante é uma concatenação do `[native()](<#/doc/experimental/fs/path/native>)` original e da sequência (que pode estar em formato portátil ou nativo) representada por `source`, que pode ser `[std::basic_string](<#/doc/string/basic_string>)`, uma string multi-caractere terminada em nulo, ou um input iterator apontando para uma sequência multi-caractere terminada em nulo.

6) O mesmo que (4), exceto que a conversão de caractere pode ser realizada.

7) O mesmo que (5).

8) O mesmo que (5), exceto que a sequência é representada por qualquer par de iteradores que designa uma string multi-caractere.

### Parâmetros

- **p** — caminho a anexar
- **str** — string a anexar
- **ptr** — ponteiro para o início de uma string terminada em nulo a anexar
- **x** — caractere único a anexar
- **source** — `[std::basic_string](<#/doc/string/basic_string>)`, string multi-caractere terminada em nulo, ou um input iterator apontando para uma sequência multi-caractere terminada em nulo, que representa um nome de caminho (tanto em formato portátil quanto nativo)
- **first, last** — par de `[LegacyInputIterators](<#/doc/named_req/InputIterator>)` que especificam uma sequência multi-caractere que representa um nome de caminho
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de `[LegacyInputIterator](<#/doc/named_req/InputIterator>)`.
-O tipo de valor de `InputIt` deve ser um dos tipos de caractere codificados (`char`, `wchar_t`, `char16_t` e `char32_t`).
-`CharT` deve ser um dos tipos de caractere codificados (`char`, `wchar_t`, `char16_t` e `char32_t`).

### Valor de retorno

`*this`

### Exceções

Pode lançar `[filesystem_error](<#/doc/experimental/fs/filesystem_error>)` em erros da API do sistema operacional subjacente ou `[std::bad_alloc](<#/doc/memory/new/bad_alloc>)` se a alocação de memória falhar.

### Notas

Ao contrário de `[append()](<#/doc/experimental/fs/path/append>)` ou `[operator/=](<#/doc/experimental/fs/path/append>)`, separadores de diretório adicionais nunca são introduzidos.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p1; // empty path
        p1 += "var"; // does not insert a separator
        std::cout << "\"\" + \"var\" == " << p1 << '\n';
        p1 += "lib"; // does not insert a separator
        std::cout << "\"\" + \"var\" + \"lib\" == " << p1 << '\n';
    }
```

Output:
```
    "" + "var" == "var"
    "" + "var" + "lib" == "varlib"
```

### Veja também

`[ appendoperator/=](<#/doc/experimental/fs/path/append>)` | anexa elementos ao caminho
(função membro pública)
`[ operator/](<#/doc/experimental/fs/path/operator_slash>)` | concatena dois caminhos com um separador de diretório
(função)