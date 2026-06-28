# std::regex_match

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class BidirIt, class Alloc, class CharT, class Traits >
bool regex_match( BidirIt first, BidirIt last,
std::match_results<BidirIt, Alloc>& m,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class BidirIt, class CharT, class Traits >
bool regex_match( BidirIt first, BidirIt last,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class CharT, class Alloc, class Traits >
bool regex_match( const CharT* str,
std::match_results<const CharT*, Alloc>& m,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class CharT, class Traits >
bool regex_match( const CharT* str, const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class STraits, class SAlloc, class Alloc,
class CharT, class Traits >
bool regex_match
( const std::basic_string<CharT, STraits, SAlloc>& s,
std::match_results
<typename std::basic_string<CharT, STraits, SAlloc>::const_iterator,
Alloc>& m,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class STraits, class SAlloc, class CharT, class Traits >
bool regex_match( const std::basic_string<CharT, STraits, SAlloc>& s,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class STraits, class SAlloc, class Alloc,
class CharT, class Traits >
bool regex_match
( const std::basic_string<CharT, STraits, SAlloc>&&,
std::match_results
<typename std::basic_string<CharT, STraits, SAlloc>::const_iterator,
Alloc>&,
const std::basic_regex<CharT, Traits>&,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default ) = delete;
```

Determina se a expressão regular e corresponde à sequência de caracteres alvo inteira. O resultado detalhado da correspondência é armazenado em m (se presente).

1,2) A sequência de caracteres alvo é representada pelo range `[`first`, `last`)`. Se `BidirIt` não satisfizer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), o comportamento é indefinido. | (até C++23)
---|---
Se `BidirIt` não modelar [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>), o comportamento é indefinido. | (desde C++23)

3,4) A sequência de caracteres alvo é representada pelo range `[`str`, `str + [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;::length(str)`)`.

5,6) A sequência de caracteres alvo é representada pela string s.

7) A sequência de caracteres alvo não pode ser representada por um rvalue de [std::string](<#/doc/string/basic_string>).

Se a correspondência não existir, as seguintes expressões envolvendo m (se existir) devem produzir os valores especificados:

Expressão | Valor
---|---
m.[`ready`](<#/doc/regex/match_results/ready>)() | true
m.[`size`](<#/doc/regex/match_results/size>)() | ​0​
m.[`empty`](<#/doc/regex/match_results/empty>)() | true

Se a correspondência existir, dado qualquer inteiro em `(`​0`, `m.size()`)` como n, as seguintes expressões envolvendo m devem produzir os valores especificados para cada sobrecarga listada abaixo:

```cpp
Expressão | Valor
Sobrecarga (1) | Sobrecarga (3) | Sobrecarga (5)
m.`ready`() | true
m.`size`() | 1 + e.`mark_count`()
m.`empty`() | false
m.`prefix`().first | first | str | s.begin()
m.`prefix`().second
m.`prefix`().matched | false1
m.`suffix`().first | last | std::char_traits<CharT>::
length(str) + str | s.end()
m.`suffix`().second
m.`suffix`().matched | false2
m[`[0]`](<#/doc/regex/match_results/operator_at>).first | first | str | s.begin()
m[`[0]`](<#/doc/regex/match_results/operator_at>).second | last | std::char_traits<CharT>::
length(str) + str | s.end()
m[`[0]`](<#/doc/regex/match_results/operator_at>).matched | true3
m[`[n]`](<#/doc/regex/match_results/operator_at>).first
```
* last se a [sub-expressão marcada](<#/doc/regex/ecmascript>) n não participou da correspondência
* o início da sequência que corresponde à sub-expressão n, caso contrário
```cpp
m[`[n]`](<#/doc/regex/match_results/operator_at>).second
```
* last se a [sub-expressão marcada](<#/doc/regex/ecmascript>) n não participou da correspondência
* o fim da sequência que corresponde à sub-expressão n, caso contrário
```cpp
m[`[n]`](<#/doc/regex/match_results/operator_at>).matched
```
* false se a [sub-expressão marcada](<#/doc/regex/ecmascript>) n não participou da correspondência
* true caso contrário

1. [↑](<#/doc/regex/regex_match>) O prefixo da correspondência está vazio.
2. [↑](<#/doc/regex/regex_match>) O sufixo da correspondência está vazio.
3. [↑](<#/doc/regex/regex_match>) A sequência inteira é correspondida.

### Parâmetros

- **first, last** — o range de caracteres alvo
- **str** — a string estilo C alvo terminada em nulo
- **s** — a [std::basic_string](<#/doc/string/basic_string>) alvo
- **m** — os resultados da correspondência
- **e** — a expressão regular
- **flags** — flags usadas para determinar como a correspondência será realizada

### Valor de retorno

Retorna true se a sequência alvo inteira corresponder a e, false caso contrário.

### Observações

Como `regex_match` considera apenas correspondências completas, a mesma regex pode produzir correspondências diferentes entre `regex_match` e [std::regex_search](<#/doc/regex/regex_search>):
```cpp
    std::regex re("Get|GetValue");
    std::cmatch m;
    std::regex_search("GetValue", m, re);  // returns true, and m[0] contains "Get"
    std::regex_match ("GetValue", m, re);  // returns true, and m[0] contains "GetValue"
    std::regex_search("GetValues", m, re); // returns true, and m[0] contains "Get"
    std::regex_match ("GetValues", m, re); // returns false
```

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        // Simple regular expression matching
        const std::string fnames[] = {"foo.txt", "bar.txt", "baz.dat", "zoidberg"};
        const std::regex txt_regex("[a-z]+\\.txt");
    
        for (const auto& fname : fnames)
            std::cout << fname << ": " << std::regex_match(fname, txt_regex) << '\n';
    
        // Extraction of a sub-match
        const std::regex base_regex("([a-z]+)\\.txt");
        std::smatch base_match;
    
        for (const auto& fname : fnames)
            if (std::regex_match(fname, base_match, base_regex))
                // The first sub_match is the whole string; the next
                // sub_match is the first parenthesized expression.
                if (base_match.size() == 2)
                {
                    std::ssub_match base_sub_match = base_match[1];
                    std::string base = base_sub_match.str();
                    std::cout << fname << " has a base of " << base << '\n';
                }
    
        // Extraction of several sub-matches
        const std::regex pieces_regex("([a-z]+)\\.([a-z]+)");
        std::smatch pieces_match;
    
        for (const auto& fname : fnames)
            if (std::regex_match(fname, pieces_match, pieces_regex))
            {
                std::cout << fname << '\n';
                for (std::size_t i = 0; i < pieces_match.size(); ++i)
                {
                    std::ssub_match sub_match = pieces_match[i];
                    std::string piece = sub_match.str();
                    std::cout << "  submatch " << i << ": " << piece << '\n';
                }
            }
    }
```

Output:
```
    foo.txt: 1
    bar.txt: 1
    baz.dat: 0
    zoidberg: 0
    foo.txt has a base of foo
    bar.txt has a base of bar
    foo.txt
      submatch 0: foo.txt
      submatch 1: foo
      submatch 2: txt
    bar.txt
      submatch 0: bar.txt
      submatch 1: bar
      submatch 2: txt
    baz.dat
      submatch 0: baz.dat
      submatch 1: baz
      submatch 2: dat
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2205](<https://cplusplus.github.io/LWG/issue2205>) | C++11 | n poderia ser zero na pós-condição | só pode ser positivo
[LWG 2273](<https://cplusplus.github.io/LWG/issue2273>) | C++11 | não estava claro se correspondências parciais eram consideradas | considera apenas correspondências completas
[LWG 2329](<https://cplusplus.github.io/LWG/issue2329>) | C++11 | a sobrecarga (5) aceitava rvalues de `basic_string`, o que poderia resultar em iteradores pendentes | rejeitado via sobrecarga (7) deletada

### Veja também

[ basic_regex](<#/doc/regex/basic_regex>)(C++11) | objeto de expressão regular (class template)
---|---
[ match_results](<#/doc/regex/match_results>)(C++11) | identifica uma correspondência de expressão regular, incluindo todas as correspondências de sub-expressão (class template)
[ regex_search](<#/doc/regex/regex_search>)(C++11) | tenta corresponder uma expressão regular a qualquer parte de uma sequência de caracteres (function template)