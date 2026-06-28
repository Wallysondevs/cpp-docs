# std::regex_search

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class BidirIt, class Alloc, class CharT, class Traits >
bool regex_search( BidirIt first, BidirIt last,
std::match_results<BidirIt, Alloc>& m,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class BidirIt, class CharT, class Traits >
bool regex_search( BidirIt first, BidirIt last,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class CharT, class Alloc, class Traits >
bool regex_search( const CharT* str,
std::match_results<const CharT*, Alloc>& m,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class CharT, class Traits >
bool regex_search( const CharT* str, const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class STraits, class SAlloc, class Alloc,
class CharT, class Traits >
bool regex_search
( const std::basic_string<CharT, STraits, SAlloc>& s,
std::match_results
<typename std::basic_string<CharT, STraits, SAlloc>::const_iterator,
Alloc>& m,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class STraits, class SAlloc, class CharT, class Traits >
bool regex_search( const std::basic_string<CharT, STraits, SAlloc>& s,
const std::basic_regex<CharT, Traits>& e,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class STraits, class SAlloc, class Alloc,
class CharT, class Traits >
bool regex_search
( const std::basic_string<CharT, STraits, SAlloc>&&,
std::match_results
<typename std::basic_string<CharT, STraits, SAlloc>::const_iterator,
Alloc>&,
const std::basic_regex<CharT, Traits>&,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default ) = delete;
```

Determina se há uma correspondência entre a expressão regular e e alguma subsequência na sequência de caracteres alvo. O resultado detalhado da correspondência é armazenado em m (se presente).

1,2) A sequência de caracteres alvo é representada pelo range `[`first`, `last`)`. Se `BidirIt` não satisfizer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), o comportamento é indefinido. | (até C++23)
---|---
Se `BidirIt` não modelar [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>), o comportamento é indefinido. | (desde C++23)

3,4) A sequência de caracteres alvo é representada pelo range `[`str`, `str + [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;::length(str)`)`.

5,6) A sequência de caracteres alvo é representada pela string s.

7) A sequência de caracteres alvo não pode ser representada por um rvalue de [std::string](<#/doc/string/basic_string>).

Se uma correspondência não existir, as seguintes expressões envolvendo m (se existir) devem produzir os valores especificados:

Expressão | Valor
---|---
m.[`ready`](<#/doc/regex/match_results/ready>)() | true
m.[`size`](<#/doc/regex/match_results/size>)() | ​0​
m.[`empty`](<#/doc/regex/match_results/empty>)() | true

Se uma correspondência existir, dado qualquer inteiro em `(`​0`, `m.size()`)` como n, as seguintes expressões envolvendo m devem produzir os valores especificados para cada sobrecarga listada abaixo:

```cpp
Expressão | Valor
Sobrecarga (1) | Sobrecarga (3) | Sobrecarga (5)
m.`ready`() | true
m.`size`() | 1 + e.`mark_count`()
m.`empty`() | false
m.`prefix`().first | first | str | s.begin()
m.`prefix`().second | m[0].first
m.`prefix`().matched | m.prefix().first != m.prefix().second
m.`suffix`().first | m[0].second
m.`suffix`().second | last | std::char_traits<CharT>::
length(str) + str | s.end()
m.`suffix`().matched | m.suffix().first != m.suffix().second
m[`[0]`](<#/doc/regex/match_results/operator_at>).first | o início da sequência que correspondeu a e
m[`[0]`](<#/doc/regex/match_results/operator_at>).second | o fim da sequência que correspondeu a e
m[`[0]`](<#/doc/regex/match_results/operator_at>).matched | true
m[`[n]`](<#/doc/regex/match_results/operator_at>).first
```
  * last se a [subexpressão marcada](<#/doc/regex/ecmascript>) n não participou da correspondência
  * o início da sequência que correspondeu à subexpressão n, caso contrário
```cpp
m[`[n]`](<#/doc/regex/match_results/operator_at>).second
```
  * last se a [subexpressão marcada](<#/doc/regex/ecmascript>) n não participou da correspondência
  * o fim da sequência que correspondeu à subexpressão n, caso contrário
```cpp
m[`[n]`](<#/doc/regex/match_results/operator_at>).matched
```
  * false se a [subexpressão marcada](<#/doc/regex/ecmascript>) n não participou da correspondência
  * true, caso contrário

### Parâmetros

- **first, last** — o range de caracteres alvo
- **str** — a string estilo C terminada em nulo alvo
- **s** — a [std::basic_string](<#/doc/string/basic_string>) alvo
- **m** — os resultados da correspondência
- **e** — a expressão regular
- **flags** — flags usadas para determinar como a correspondência será realizada

### Valor de retorno

Retorna true se uma correspondência existir, false caso contrário.

### Observações

Para examinar todas as correspondências dentro da sequência alvo, `std::regex_search` pode ser chamado em um loop, reiniciando a cada vez a partir de m[0].second da chamada anterior. [std::regex_iterator](<#/doc/regex/regex_iterator>) oferece uma interface fácil para esta iteração.

### Exemplo

Run this code
```cpp
    #include <cstddef>
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::string lines[] = {"Roses are #ff0000",
                               "violets are #0000ff",
                               "all of my base are belong to you"};
    
        std::regex color_regex("#([a-f0-9]{2})"
                                "([a-f0-9]{2})"
                                "([a-f0-9]{2})");
    
        // simple match
        for (const auto& line : lines)
            std::cout << line << ": " << std::boolalpha
                      << std::regex_search(line, color_regex) << '\n';
        std::cout << '\n';
    
        // show contents of marked subexpressions within each match
        std::smatch color_match;
        for (const auto& line : lines)
            if (std::regex_search(line, color_match, color_regex))
            {
                std::cout << "matches for '" << line << "'\n";
                std::cout << "Prefix: '" << color_match.prefix() << "'\n";
                for (std::size_t i = 0; i < color_match.size(); ++i) 
                    std::cout << i << ": " << color_match[i] << '\n';
                std::cout << "Suffix: '" << color_match.suffix() << "\'\n\n";
            }
    
        // repeated search (see also std::regex_iterator)
        std::string log(R"(
            Speed:	366
            Mass:	35
            Speed:	378
            Mass:	32
            Speed:	400
    	Mass:	30)");
        std::regex r(R"(Speed:\t\d*)");
        for (std::smatch sm; regex_search(log, sm, r);)
        {
            std::cout << sm.str() << '\n';
            log = sm.suffix();
        }
    
        // C-style string demo
        std::cmatch cm;
        if (std::regex_search("this is a test", cm, std::regex("test"))) 
            std::cout << "\nFound " << cm[0] << " at position "
                      << cm.prefix().length() << '\n';
    }
```

Output:
```
    Roses are #ff0000: true
    violets are #0000ff: true
    all of my base are belong to you: false
    
    matches for 'Roses are #ff0000'
    Prefix: 'Roses are '
    0: #ff0000
    1: ff
    2: 00
    3: 00
    Suffix: ''
    
    matches for 'violets are #0000ff'
    Prefix: 'violets are '
    0: #0000ff
    1: 00
    2: 00
    3: ff
    Suffix: ''
    
    Speed:	366
    Speed:	378
    Speed:	400
    
    Found test at position 10
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2205](<https://cplusplus.github.io/LWG/issue2205>) | C++11 | n poderia ser zero na pós-condição | só pode ser positivo
[LWG 2329](<https://cplusplus.github.io/LWG/issue2329>) | C++11 | a sobrecarga (5) aceitava rvalues de `basic_string`, o que poderia resultar em iteradores pendentes | rejeitado via sobrecarga deletada (7)

### Veja também

[ basic_regex](<#/doc/regex/basic_regex>)(C++11) | objeto de expressão regular (modelo de classe)
---|---
[ match_results](<#/doc/regex/match_results>)(C++11) | identifica uma correspondência de expressão regular, incluindo todas as correspondências de subexpressão (modelo de classe)
[ regex_match](<#/doc/regex/regex_match>)(C++11) | tenta corresponder uma expressão regular a uma sequência de caracteres inteira (modelo de função)