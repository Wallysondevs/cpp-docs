# std::match_results

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template<
class BidirIt,
class Alloc = std::allocator<std::sub_match<BidirIt>>
> class match_results;
namespace pmr {
template <class BidirIt>
using match_results = std::match_results<BidirIt,
std::pmr::polymorphic_allocator<
std::sub_match<BidirIt>>>;
}
```

O modelo de classe `std::match_results` contém uma coleção de sequências de caracteres que representam o resultado de uma correspondência de expressão regular.

Este é um container especializado ciente de allocator. Ele só pode ser criado por padrão, obtido de [std::regex_iterator](<#/doc/regex/regex_iterator>), ou modificado por [std::regex_search](<#/doc/regex/regex_search>) ou [std::regex_match](<#/doc/regex/regex_match>). Como `std::match_results` contém [std::sub_match](<#/doc/regex/sub_match>)es, cada um dos quais é um par de iteradores para a sequência de caracteres original que foi correspondida, é comportamento indefinido examinar `std::match_results` se a sequência de caracteres original foi destruída ou se os iteradores para ela foram invalidados por outras razões.

O primeiro [std::sub_match](<#/doc/regex/sub_match>) (índice 0) contido em um `std::match_result` sempre representa a correspondência completa dentro de uma sequência alvo feita por uma regex, e os [std::sub_match](<#/doc/regex/sub_match>)es subsequentes representam correspondências de sub-expressão correspondendo em sequência ao parêntese esquerdo que delimita a sub-expressão na regex.

`std::match_results` atende aos requisitos de um [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>) e de um [SequenceContainer](<#/doc/named_req/SequenceContainer>), exceto que apenas atribuição por cópia, atribuição por movimento e operações definidas para containers constantes são suportadas, e que a semântica das funções de comparação é diferente daquelas exigidas para um container.

### Requisitos de tipo

*   `BidirIt` deve atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
*   `Alloc` deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>).

### Especializações

Várias especializações para tipos de sequência de caracteres comuns são fornecidas:

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`
---
Tipo | Definição
---|---
`std::cmatch` | std::match_results&lt;const char*&gt;
`std::wcmatch` | std::match_results&lt;const wchar_t*&gt;
`std::smatch` | std::match_results<std::string::const_iterator>
`std::wsmatch` | std::match_results<std::wstring::const_iterator>
`std::pmr::cmatch` (desde C++17) | std::pmr::match_results&lt;const char*&gt;
`std::pmr::wcmatch` (desde C++17) | std::pmr::match_results&lt;const wchar_t*&gt;
`std::pmr::smatch` (desde C++17) | std::pmr::match_results<std::string::const_iterator>
`std::pmr::wsmatch` (desde C++17) | std::pmr::match_results<std::wstring::const_iterator>

### Tipos de membros

Tipo de membro | Definição
---|---
`allocator_type` | `Allocator`
`value_type` | [std::sub_match](<#/doc/regex/sub_match>)&lt;BidirIt&gt;
`const_reference` | const value_type&
`reference` | `value_type&`
`const_iterator` | _definido pela implementação_ (depende do container subjacente)
`iterator` | `const_iterator`
`difference_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;BidirIt&gt;::difference_type
`size_type` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::size_type
`char_type` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;BidirIt&gt;::value_type
`string_type` | [std::basic_string](<#/doc/string/basic_string>)<char_type>

### Funções membro

[ (constructor)](<#/doc/regex/match_results/match_results>) | constrói o objeto
(função membro pública)
[ (destructor)](<#/doc/regex/match_results/~match_results>) | destrói o objeto
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[ get_allocator](<#/doc/regex/match_results/get_allocator>) | retorna o allocator associado
(função membro pública)

##### Estado

[ ready](<#/doc/regex/match_results/ready>) | verifica se os resultados estão disponíveis
(função membro pública)

##### Tamanho

[ empty](<#/doc/regex/match_results/empty>) | verifica se a correspondência foi bem-sucedida
(função membro pública)
[ size](<#/doc/regex/match_results/size>) | retorna o número de correspondências em um estado de resultado totalmente estabelecido
(função membro pública)
[ max_size](<#/doc/regex/match_results/max_size>) | retorna o número máximo possível de sub-correspondências
(função membro pública)

##### Acesso a elementos

[ length](<#/doc/regex/match_results/length>) | retorna o comprimento da sub-correspondência específica
(função membro pública)
[ position](<#/doc/regex/match_results/position>) | retorna a posição do primeiro caractere da sub-correspondência específica
(função membro pública)
[ str](<#/doc/regex/match_results/str>) | retorna a sequência de caracteres para a sub-correspondência específica
(função membro pública)
[ operator[]](<#/doc/regex/match_results/operator_at>) | retorna a sub-correspondência especificada
(função membro pública)
[ prefix](<#/doc/regex/match_results/prefix>) | retorna a sub-sequência entre o início da sequência alvo e o início da correspondência completa
(função membro pública)
[ suffix](<#/doc/regex/match_results/suffix>) | retorna a sub-sequência entre o fim da correspondência completa e o fim da sequência alvo
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/regex/match_results/begin>) | retorna um iterador para o início da lista de sub-correspondências
(função membro pública)
[ endcend](<#/doc/regex/match_results/end>) | retorna um iterador para o fim da lista de sub-correspondências
(função membro pública)

##### Formato

[ format](<#/doc/regex/match_results/format>) | formata os resultados da correspondência para saída
(função membro pública)

##### Modificadores

[ swap](<#/doc/regex/match_results/swap>) | troca o conteúdo
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/regex/match_results/operator_cmp>)(removido em C++20) | compara lexicograficamente os valores nos dois resultados de correspondência
(modelo de função)
[ std::swap(std::match_results)](<#/doc/regex/match_results/swap2>)(desde C++11) | especializa o algoritmo [`std::swap`](<#/doc/utility/swap>)
(modelo de função)