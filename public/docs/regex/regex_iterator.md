# std::regex_iterator

Definido no cabeçalho `<regex>`

```c
template<
class BidirIt,
class CharT = typename std::iterator_traits<BidirIt>::value_type,
class Traits = std::regex_traits<CharT>
> class regex_iterator
```

`std::regex_iterator` é um iterator somente de leitura que acessa as correspondências individuais de uma expressão regular dentro da sequência de caracteres subjacente. Ele atende aos requisitos de um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), exceto que para valores desreferenciáveis a e b com a == b, *a e *b não estarão vinculados ao mesmo objeto.

Na construção, e a cada incremento, ele chama [std::regex_search](<#/doc/regex/regex_search>) e memoriza o resultado (ou seja, salva uma cópia do valor [std::match_results](<#/doc/regex/match_results>)&lt;BidirIt&gt;). O primeiro objeto pode ser lido quando o iterator é construído ou quando a primeira desreferenciação é feita. Caso contrário, a desreferenciação retorna apenas uma cópia da correspondência de regex obtida mais recentemente.

O `std::regex_iterator` construído por padrão é o iterator de fim de sequência. Quando um `std::regex_iterator` válido é incrementado após atingir a última correspondência ([std::regex_search](<#/doc/regex/regex_search>) retorna false), ele se torna igual ao iterator de fim de sequência. Desreferenciá-lo ou incrementá-lo ainda mais invoca comportamento indefinido.

Uma implementação típica de `std::regex_iterator` mantém os iterators de início e fim para a sequência subjacente (duas instâncias de `BidirIt`), um ponteiro para a expressão regular (const regex_type*), os sinalizadores de correspondência ([std::regex_constants::match_flag_type](<#/doc/regex/match_flag_type>)), e a correspondência atual ([std::match_results](<#/doc/regex/match_results>)&lt;BidirIt&gt;).

### Requisitos de tipo

-`BidirIt` deve atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
---

### Especializações

Várias especializações para tipos comuns de sequência de caracteres são definidas:

Definido no cabeçalho `<regex>`
---
Tipo | Definição
---|---
`std::cregex_iterator` | std::regex_iterator&lt;const char*&gt;
`std::wcregex_iterator` | std::regex_iterator&lt;const wchar_t*&gt;
`std::sregex_iterator` | std::regex_iterator<[std::string](<#/doc/string/basic_string>)::const_iterator>
`std::wsregex_iterator` | std::regex_iterator<[std::wstring](<#/doc/string/basic_string>)::const_iterator>

### Tipos de membros

Tipo | Definição
---|---
`value_type` | [std::match_results](<#/doc/regex/match_results>)&lt;BidirIt&gt;
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`pointer` | const value_type*
`reference` | const value_type&
`iterator_category` | [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)
`iterator_concept` (C++20) | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)
`regex_type` | [std::basic_regex](<#/doc/regex/basic_regex>)<CharT, Traits>

### Membros de dados

Membro | Descrição
---|---
`BidiIt` `_begin_` (private) | o iterator de início
(objeto membro apenas para exposição*)
`BidiIt` `_end_` (private) | o iterator de fim
(objeto membro apenas para exposição*)
const regex_type* `_pregex_` (private) | um ponteiro para uma expressão regular
(objeto membro apenas para exposição*)
regex_constants::match_flag_type `_flags_` (private) | um sinalizador
(objeto membro apenas para exposição*)
match_results&lt;BidiIt&gt; `_match_` (private) | a correspondência atual
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/regex/regex_iterator/regex_iterator>) | constrói um novo `regex_iterator`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói um `regex_iterator`, incluindo o valor em cache
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ operator==operator!=](<#/doc/regex/regex_iterator/operator_cmp>)(removido em C++20) | compara dois `regex_iterator`s
(função membro pública)
[ operator*operator->](<#/doc/regex/regex_iterator/operator_star_>) | acessa a correspondência atual
(função membro pública)
[ operator++operator++(int)](<#/doc/regex/regex_iterator/operator_arith>) | avança o iterator para a próxima correspondência
(função membro pública)

### Notas

É responsabilidade do programador garantir que o objeto [std::basic_regex](<#/doc/regex/basic_regex>) passado ao construtor do iterator sobreviva ao iterator. Como o iterator armazena um ponteiro para a regex, incrementar o iterator depois que a regex foi destruída acessa um ponteiro pendente.

Se a parte da expressão regular que correspondeu for apenas uma [asserção](<#/doc/regex/ecmascript>) (`^`, `$`, `\b`, `\B`), a correspondência armazenada no iterator é uma correspondência de comprimento zero, ou seja, match[0].first == match[0].second.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <regex>
    #include <string>
    
    int main()
    {
        const std::string s = "Quick brown fox.";
    
        std::regex words_regex("[^\\s]+");
        auto words_begin = std::sregex_iterator(s.begin(), s.end(), words_regex);
        auto words_end = std::sregex_iterator();
    
        std::cout << "Found " << std::distance(words_begin, words_end) << " words:\n";
    
        for (std::sregex_iterator i = words_begin; i != words_end; ++i)
        {
            std::smatch match = *i;
            std::string match_str = match.str();
            std::cout << match_str << '\n';
        }
    }
```

Saída:
```
    Found 3 words:
    Quick
    brown
    fox.
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 3698](<https://cplusplus.github.io/LWG/issue3698>)
([P2770R0](<https://wg21.link/P2770R0>)) | C++20 | `regex_iterator` era um [`forward_iterator`](<#/doc/iterator/forward_iterator>)
enquanto era um stashing iterator | tornou-se [`input_iterator`](<#/doc/iterator/input_iterator>)[1](<#/doc/regex/regex_iterator>)

1. [↑](<#/doc/regex/regex_iterator>) `iterator_category` não foi alterado pela resolução, porque alterá-lo para [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) poderia quebrar muito código existente.

### Veja também

[ match_results](<#/doc/regex/match_results>)(C++11) | identifica uma correspondência de expressão regular, incluindo todas as correspondências de subexpressões
(modelo de classe)
[ regex_search](<#/doc/regex/regex_search>)(C++11) | tenta corresponder uma expressão regular a qualquer parte de uma sequência de caracteres
(modelo de função)
---