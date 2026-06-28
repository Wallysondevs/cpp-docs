# std::experimental::ostream_joiner

Definido no cabeçalho `[<experimental/iterator>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/iterator&action=edit&redlink=1> "cpp/header/experimental/iterator \(page does not exist\)")`

```c
template<
class DelimT,
class CharT = char,
class Traits = std::char_traits<CharT>
>
class ostream_joiner;
```

`std::experimental::ostream_joiner` é um [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) de passagem única que escreve objetos sucessivos no objeto [std::basic_ostream](<#/doc/io/basic_ostream>) para o qual foi construído, usando `operator<<`, separados por um delimitador. O delimitador é escrito no stream de saída entre cada dois objetos que são escritos. A operação de escrita é realizada quando o iterator (seja desreferenciado ou não) recebe uma atribuição. Incrementar o `ostream_joiner` é uma no-op (operação nula).

Em uma implementação típica, os únicos membros de dados de `ostream_joiner` são um ponteiro para o [std::basic_ostream](<#/doc/io/basic_ostream>) associado, o delimitador e um membro booleano que indica se a próxima escrita é para o primeiro elemento na sequência.

Comparado a [std::ostream_iterator](<#/doc/iterator/ostream_iterator>), `ostream_joiner` imprime a sequência de delimitadores uma vez a menos e não é um template baseado no tipo do objeto a ser impresso.

### Tipos Membro

Tipo Membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`
`ostream_type` | [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>
`value_type` | void
`difference_type` | void
`pointer` | void
`reference` | void
`iterator_category` | [std::output_iterator_tag](<#/doc/iterator/iterator_tags>)

### Funções Membro

[ (construtor)](<#/doc/experimental/ostream_joiner/ostream_joiner>) | constrói um novo `ostream_joiner`
(função membro pública)
(destrutor)(implicitamente declarado) | destrói um `ostream_joiner`
(função membro pública)
[ operator=](<#/>) | escreve um objeto na sequência de saída associada
(função membro pública)
[ operator*](<#/doc/experimental/ostream_joiner/operator_star_>) | no-op (operação nula)
(função membro pública)
[ operator++operator++(int)](<#/doc/experimental/ostream_joiner/operator_arith>) | no-op (operação nula)
(função membro pública)

### Funções Não-Membro

[ make_ostream_joiner](<#/doc/experimental/ostream_joiner/make_ostream_joiner>) | cria um objeto `ostream_joiner`, deduzindo os argumentos de tipo do template a partir dos argumentos da função
(template de função)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <experimental/iterator>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        int i[] = {1, 2, 3, 4, 5};
        std::copy(std::begin(i),
                  std::end(i),
                  std::experimental::make_ostream_joiner(std::cout, ", "));
    }
```

Saída:
```
    1, 2, 3, 4, 5
```

### Veja também

[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | iterator de saída que escreve em [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(template de classe)
[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | iterator de saída que escreve em [std::basic_ostream](<#/doc/io/basic_ostream>)
(template de classe)
[ istream_iterator](<#/doc/iterator/istream_iterator>) | iterator de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(template de classe)