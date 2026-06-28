# std::regex_token_iterator

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template<
class BidirIt,
class CharT = typename std::iterator_traits<BidirIt>::value_type,
class Traits = std::regex_traits<CharT>
> class regex_token_iterator
```

`std::regex_token_iterator` é um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) somente leitura que acessa as sub-correspondências individuais de cada correspondência de uma expressão regular dentro da sequência de caracteres subjacente. Ele também pode ser usado para acessar as partes da sequência que não foram correspondidas pela expressão regular fornecida (por exemplo, como um tokenizador).

Na construção, ele constrói um [std::regex_iterator](<#/doc/regex/regex_iterator>) e a cada incremento ele percorre as sub-correspondências solicitadas dos match_results atuais, incrementando o [std::regex_iterator](<#/doc/regex/regex_iterator>) subjacente ao se afastar da última sub-correspondência.

O `std::regex_token_iterator` construído por padrão é o iterator de fim de sequência. Quando um `std::regex_token_iterator` válido é incrementado após atingir a última sub-correspondência da última correspondência, ele se torna igual ao iterator de fim de sequência. Desreferenciá-lo ou incrementá-lo ainda mais invoca comportamento indefinido.

Pouco antes de se tornar o iterator de fim de sequência, um `std::regex_token_iterator` pode se tornar um _suffix iterator_, se o índice -1 (fragmento não correspondido) aparecer na lista dos índices de sub-correspondência solicitados. Tal iterator, se desreferenciado, retorna um match_results correspondente à sequência de caracteres entre a última correspondência e o fim da sequência.

Uma implementação típica de `std::regex_token_iterator` mantém o [std::regex_iterator](<#/doc/regex/regex_iterator>) subjacente, um container (por exemplo, [std::vector](<#/doc/container/vector>)&lt;int&gt;) dos índices de sub-correspondência solicitados, o contador interno igual ao índice da sub-correspondência, um ponteiro para [std::sub_match](<#/doc/regex/sub_match>), apontando para a sub-correspondência atual da correspondência atual, e um objeto [std::match_results](<#/doc/regex/match_results>) contendo a última sequência de caracteres não correspondida (usado no modo tokenizador).

### Requisitos de tipo

-`BidirIt` deve atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
---

### Especializações

Várias especializações para tipos comuns de sequência de caracteres são definidas:

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`
---
Tipo | Definição
---|---
`std::cregex_token_iterator` | std::regex_token_iterator&lt;const char*&gt;
`std::wcregex_token_iterator` | std::regex_token_iterator&lt;const wchar_t*&gt;
`std::sregex_token_iterator` | std::regex_token_iterator<[std::string](<#/doc/string/basic_string>)::const_iterator>
`std::wsregex_token_iterator` | std::regex_token_iterator<[std::wstring](<#/doc/string/basic_string>)::const_iterator>

### Tipos de membro

Tipo de membro | Definição
---|---
`value_type` | [std::sub_match](<#/doc/regex/sub_match>)&lt;BidirIt&gt;
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`pointer` | const value_type*
`reference` | const value_type&
`iterator_category` | [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>)
`iterator_concept` (desde C++20) | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)
`regex_type` | [std::basic_regex](<#/doc/regex/basic_regex>)<CharT, Traits>

### Funções membro

[ (construtor)](<#/doc/regex/regex_token_iterator/regex_token_iterator>) | constrói um novo `regex_token_iterator`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói um `regex_token_iterator`, incluindo o valor em cache
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ operator==operator!=](<#/doc/regex/regex_token_iterator/operator_cmp>)(removido em C++20) | compara dois `regex_token_iterator`s
(função membro pública)
[ operator*operator->](<#/doc/regex/regex_token_iterator/operator_star_>) | acessa a sub-correspondência atual
(função membro pública)
[ operator++operator++(int)](<#/doc/regex/regex_token_iterator/operator_arith>) | avança o iterator para a próxima sub-correspondência
(função membro pública)

### Notas

É responsabilidade do programador garantir que o objeto [std::basic_regex](<#/doc/regex/basic_regex>) passado para o construtor do iterator sobreviva ao iterator. Como o iterator armazena um [std::regex_iterator](<#/doc/regex/regex_iterator>) que armazena um ponteiro para a regex, incrementar o iterator depois que a regex foi destruída resulta em comportamento indefinido.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <fstream>
    #include <iostream>
    #include <iterator>
    #include <regex>
     
    int main()
    {
        // Tokenization (non-matched fragments)
        // Note that regex is matched only two times; when the third value is obtained
        // the iterator is a suffix iterator.
        const std::string text = "Quick brown fox.";
        const std::regex ws_re("\\s+"); // whitespace
        std::copy(std::sregex_token_iterator(text.begin(), text.end(), ws_re, -1),
                  std::sregex_token_iterator(),
                  std::ostream_iterator<std::string>(std::cout, "\n"));
     
        std::cout << '\n';
     
        // Iterating the first submatches
        const std::string html = R"(<p><a href="http://google.com">google</a> )"
                                 R"(< a HREF ="http://cppreference.com">cppreference</a>\n</p>)";
        const std::regex url_re(R"!!(<\s*A\s+[^>]*href\s*=\s*"([^"]*)")!!", std::regex::icase);
        std::copy(std::sregex_token_iterator(html.begin(), html.end(), url_re, 1),
                  std::sregex_token_iterator(),
                  std::ostream_iterator<std::string>(std::cout, "\n"));
    }
```

Saída:
```
    Quick
    brown
    fox.
     
    http://google.com
    http://cppreference.com
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3698](<https://cplusplus.github.io/LWG/issue3698>)
([P2770R0](<https://wg21.link/P2770R0>)) | C++20 | `regex_token_iterator` era um [`forward_iterator`](<#/doc/iterator/forward_iterator>)
enquanto era um stashing iterator | tornou [`input_iterator`](<#/doc/iterator/input_iterator>)[1](<#/doc/regex/regex_token_iterator>)

1. [↑](<#/doc/regex/regex_token_iterator>) `iterator_category` não foi alterado pela resolução, porque alterá-lo para [std::input_iterator_tag](<#/doc/iterator/iterator_tags>) poderia quebrar muito código existente.
