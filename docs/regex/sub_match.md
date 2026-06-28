# std::sub_match

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class BidirIt >
class sub_match;
```

O template de classe `std::sub_match` é usado pelo motor de expressões regulares para denotar sequências de caracteres correspondidas por subexpressões marcadas. Uma correspondência é um par `[`begin`, `end`)` dentro do intervalo alvo correspondido pela expressão regular, mas com funções observadoras adicionais para aumentar a clareza do código.

Apenas o construtor padrão é publicamente acessível. Instâncias de `std::sub_match` são normalmente construídas e preenchidas como parte de um container [std::match_results](<#/doc/regex/match_results>) durante o processamento de um dos algoritmos de regex.

As funções membro retornam valores padrão definidos, a menos que o membro [`matched`](<#/doc/regex/sub_match>) seja true.

`std::sub_match` herda de [std::pair](<#/doc/utility/pair>)<BidirIt, BidirIt>, embora não possa ser tratado como um objeto [std::pair](<#/doc/utility/pair>) porque funções membro como atribuição não funcionarão como esperado.

### Requisitos de tipo

-`BidirIt` deve atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
---

### Especializações

Várias especializações para tipos comuns de sequência de caracteres são fornecidas:

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`
---
Tipo | Definição
---|---
`std::csub_match` | std::sub_match&lt;const char*&gt;
`std::wcsub_match` | std::sub_match&lt;const wchar_t*&gt;
`std::ssub_match` | std::sub_match<std::string::const_iterator>
`std::wssub_match` | std::sub_match<std::wstring::const_iterator>

### Tipos aninhados

Tipo | Definição
---|---
`iterator` | `BidirIt`
`value_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;BidirIt&gt;::value_type
`difference_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;BidirIt&gt;::difference_type
`string_type` | [std::basic_string](<#/doc/string/basic_string>)<value_type>

### Membros de dados

Membro | Descrição
---|---
bool `matched` | se esta correspondência foi bem-sucedida
(objeto membro público)

## Herdado de [std::pair](<#/doc/utility/pair>)

BidirIt first | início da sequência de correspondência
(objeto membro público)
BidirIt second | um-depois-do-fim da sequência de correspondência
(objeto membro público)

### Funções membro

[ (construtor)](<#/doc/regex/sub_match/sub_match>) | constrói o objeto de correspondência
(função membro pública)

##### Observadores

[ length](<#/doc/regex/sub_match/length>) | retorna o comprimento da correspondência (se houver)
(função membro pública)
[ stroperator string_type](<#/doc/regex/sub_match/str>) | converte para o tipo de string subjacente
(função membro pública)
[ compare](<#/doc/regex/sub_match/compare>) | compara a subsequência correspondida (se houver)
(função membro pública)

##### Modificadores

[ swap](<#/doc/regex/sub_match/swap>) | troca os conteúdos
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/regex/sub_match/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara um `sub_match` com outro `sub_match`, uma string ou um caractere
(template de função)
[ operator<<](<#/doc/regex/sub_match/operator_ltlt>) | imprime a subsequência de caracteres correspondida
(template de função)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::string sentence{"Friday the thirteenth."};
        const std::regex re{"([A-z]+) ([a-z]+) ([a-z]+)"};
        std::smatch words;
        std::regex_search(sentence, words, re);
        std::cout << std::boolalpha;
        for (const auto& m : words)
        {
            assert(m.matched);
            std::cout << "m: [" << m << "], m.length(): " << m.length() << ", "
                         "*m.first: '" << *m.first << "', "
                         "*m.second: '" << *m.second << "'\n";
        }
    }
```

Saída:
```
    m: [Friday the thirteenth], m.length(): 21, *m.first: 'F', *m.second: '.'
    m: [Friday], m.length(): 6, *m.first: 'F', *m.second: ' '
    m: [the], m.length(): 3, *m.first: 't', *m.second: ' '
    m: [thirteenth], m.length(): 10, *m.first: 't', *m.second: '.'
```

### Veja também

[ regex_token_iterator](<#/doc/regex/regex_token_iterator>)(C++11) | itera pelas subexpressões especificadas dentro de todas as correspondências de regex em uma dada string ou por substrings não correspondidas
(template de classe)