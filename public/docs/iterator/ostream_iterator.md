# std::ostream_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class T,
class CharT = char,
class Traits = std::char_traits<CharT> >
class ostream_iterator
: public std::iterator<std::output_iterator_tag, void, void, void, void>
template< class T,
class CharT = char,
class Traits = std::char_traits<CharT> >
class ostream_iterator;
```

`std::ostream_iterator` é um [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) de passagem única que escreve objetos sucessivos do tipo `T` no objeto [std::basic_ostream](<#/doc/io/basic_ostream>) para o qual foi construído, usando `operator<<`. Uma string delimitadora opcional é escrita no stream de saída após cada operação de escrita. A operação de escrita é realizada quando o iterator (seja desreferenciado ou não) recebe uma atribuição. Incrementar o `std::ostream_iterator` é uma no-op (operação nula).

Em uma implementação típica, os únicos membros de dados de `std::ostream_iterator` são um ponteiro para o `std::basic_ostream` associado e um ponteiro para o primeiro caractere na string delimitadora.

Ao escrever caracteres, [std::ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) é mais eficiente, pois evita a sobrecarga de construir e destruir o objeto sentinela uma vez por caractere.

### Tipos de membro

Tipo de membro | Definição
---|---
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)
`value_type` | void
`difference_type` | | void | (até C++20)
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) | (desde C++20)
`pointer` | void
`reference` | void
`char_type` | `CharT`
`traits_type` | `Traits`
`ostream_type` | [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>
Os tipos de membro `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` devem ser obtidos herdando de [std::iterator](<#/doc/iterator/iterator>)<[std::output_iterator_tag](<#/doc/iterator/iterator_tags>), void, void, void, void>. | (até C++17)

### Funções membro

[ (construtor)](<#/doc/iterator/ostream_iterator/ostream_iterator>) | constrói um novo ostream_iterator
(função membro pública)
[ (destrutor)](<#/doc/iterator/ostream_iterator/~ostream_iterator>) | destrói um `ostream_iterator`
(função membro pública)
[ operator=](<#/>) | escreve um objeto na sequência de saída associada
(função membro pública)
[ operator*](<#/doc/iterator/ostream_iterator/operator_star_>) | no-op
(função membro pública)
[ operator++operator++(int)](<#/doc/iterator/ostream_iterator/operator_arith>) | no-op
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <sstream>
    
    int main()
    {
        std::istringstream str("0.11 0.22 0.33 0.44");
    
        std::partial_sum(std::istream_iterator<double>(str),
                         std::istream_iterator<double>(),
                         std::ostream_iterator<double>(std::cout, ", "));
        std::cout << '\n';
    }
```

Saída:
```
    0.11, 0.33, 0.66, 1.1,
```

### Veja também

[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | iterator de saída que escreve em [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(modelo de classe)
[ istream_iterator](<#/doc/iterator/istream_iterator>) | iterator de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(modelo de classe)
[ std::experimental::ostream_joiner](<#/doc/experimental/ostream_joiner>)(library fundamentals TS v2) | um iterator de saída que escreve elementos sucessivos em um stream de saída, separando elementos adjacentes com um delimitador
(modelo de classe)