# std::ostreambuf_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class CharT, class Traits = std::char_traits<CharT> >
class ostreambuf_iterator
: public std::iterator<std::output_iterator_tag, void, void, void, void>
template< class CharT, class Traits = std::char_traits<CharT> >
class ostreambuf_iterator;
```

`std::ostreambuf_iterator` é um LegacyOutputIterator de passagem única que escreve caracteres sucessivos no objeto `std::basic_streambuf` para o qual foi construído. A operação de escrita real é realizada quando o iterator (seja desreferenciado ou não) recebe uma atribuição. Incrementar o `std::ostreambuf_iterator` é uma no-op.

Em uma implementação típica, os únicos membros de dados de `std::ostreambuf_iterator` são um ponteiro para o `std::basic_streambuf` associado e um flag booleano indicando se a condição de fim de arquivo foi atingida.

### Tipos de membro

Tipo de membro | Definição
---|---
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)
`value_type` | void
`difference_type` | | void | (ate C++20)
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) | (desde C++20)
`pointer` | void
`reference` | void
`char_type` | `CharT`
`traits_type` | `Traits`
`streambuf_type` | [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>
`ostream_type` | [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>
Os tipos de membro `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` são exigidos para serem obtidos por herança de [std::iterator](<#/doc/iterator/iterator>)<[std::output_iterator_tag](<#/doc/iterator/iterator_tags>), void, void, void, void>. | (ate C++17)

### Funções membro

[ (construtor)](<#/doc/iterator/ostreambuf_iterator/ostreambuf_iterator>) | constrói um novo `ostreambuf_iterator`
(função membro pública)
(destrutor)(declarado implicitamente) | destrói um `ostreambuf_iterator`
(função membro pública)
[ operator=](<#/>) | escreve um caractere na sequência de saída associada
(função membro pública)
[ operator*](<#/doc/iterator/ostreambuf_iterator/operator_star_>) | no-op
(função membro pública)
[ operator++operator++(int)](<#/doc/iterator/ostreambuf_iterator/operator_arith>) | no-op
(função membro pública)
[ failed](<#/doc/iterator/ostreambuf_iterator/failed>) | testa se a saída falhou
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
     
    int main()
    {
        std::string s = "This is an example\n";
        std::copy(s.begin(), s.end(), std::ostreambuf_iterator<char>(std::cout));
    }
```

Saída:
```
    This is an example
```

### Veja também

[ istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) | iterator de entrada que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(modelo de classe)
[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | iterator de saída que escreve para [std::basic_ostream](<#/doc/io/basic_ostream>)
(modelo de classe)