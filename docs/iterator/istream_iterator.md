# std::istream_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class T,
class CharT = char,
class Traits = std::char_traits<CharT>,
class Distance = std::ptrdiff_t >
class istream_iterator
: public std::iterator<std::input_iterator_tag, T, Distance, const T*, const T&>
template< class T,
class CharT = char,
class Traits = std::char_traits<CharT>,
class Distance = std::ptrdiff_t >
class istream_iterator;
```

`std::istream_iterator` é um iterator de entrada de passagem única que lê objetos sucessivos do tipo `T` do objeto [std::basic_istream](<#/doc/io/basic_istream>) para o qual foi construído, chamando o `operator>>` apropriado. A operação de leitura real é realizada quando o iterator é incrementado, não quando é desreferenciado. O primeiro objeto é lido quando o iterator é construído. A desreferenciação apenas retorna uma cópia do objeto lido mais recentemente.

O `std::istream_iterator` construído por padrão é conhecido como o iterator _fim-de-stream_. Quando um `std::istream_iterator` válido atinge o fim do stream subjacente, ele se torna igual ao iterator fim-de-stream. Desreferenciar ou incrementá-lo ainda mais invoca comportamento indefinido. Um iterator fim-de-stream permanece no estado de fim-de-stream mesmo que o stream subjacente mude de estado. Na ausência de uma reatribuição, ele não pode mais se tornar um iterator que não seja fim-de-stream.

Uma implementação típica de `std::istream_iterator` mantém dois membros de dados: um ponteiro para o objeto [std::basic_istream](<#/doc/io/basic_istream>) associado e o valor do tipo `T` lido mais recentemente.

`T` deve satisfazer os requisitos [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Tipos de membro

Tipo de membro | Definição
---|---
`iterator_category` | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)
`value_type` | T
`difference_type` | Distance
`pointer` | const T*
`reference` | const T&
`char_type` | `CharT`
`traits_type` | `Traits`
`istream_type` | [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>
Os tipos de membro `iterator_category`, `value_type`, `difference_type`, `pointer` e `reference` são exigidos para serem obtidos por herança de [std::iterator](<#/doc/iterator/iterator>)<[std::input_iterator_tag](<#/doc/iterator/iterator_tags>), T, Distance, const T*, const T&>. | (até C++17)

### Funções membro

[ (construtor)](<#/doc/iterator/istream_iterator/istream_iterator>) | constrói um novo `istream_iterator`
(função membro pública)
[ (destrutor)](<#/doc/iterator/istream_iterator/~istream_iterator>) | destrói um `istream_iterator`, incluindo o valor em cache
(função membro pública)
[ operator*operator->](<#/doc/iterator/istream_iterator/operator_star_>) | retorna o elemento atual
(função membro pública)
[ operator++operator++(int)](<#/doc/iterator/istream_iterator/operator_arith>) | avança o iterator
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/iterator/istream_iterator/operator_cmp>)(removido em C++20) | compara dois `istream_iterator`s
(modelo de função)

### Notas

Ao ler caracteres, `std::istream_iterator` ignora espaços em branco por padrão (a menos que desabilitado com [std::noskipws](<#/doc/io/manip/skipws>) ou equivalente), enquanto [std::istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) não o faz. Além disso, [std::istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) é mais eficiente, pois evita a sobrecarga de construir e destruir o objeto sentry uma vez por caractere.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <sstream>
    
    int main()
    {
        std::istringstream str("0.1 0.2 0.3 0.4");
        std::partial_sum(std::istream_iterator<double>(str),
                         std::istream_iterator<double>(),
                         std::ostream_iterator<double>(std::cout, " "));
    
        std::istringstream str2("1 3 5 7 8 9 10");
        auto it = std::find_if(std::istream_iterator<int>(str2),
                               std::istream_iterator<int>(),
                               { return i % 2 == 0; });
    
        if (it != std::istream_iterator<int>())
            std::cout << "\nThe first even number is " << *it << ".\n";
        //" 9 10" left in the stream
    }
```

Saída:
```
    0.1 0.3 0.6 1 
    The first even number is 8.
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0738R2](<https://wg21.link/P0738R2>) | C++98 | a primeira leitura pode ser adiada para a primeira desreferenciação | sempre realizada no construtor

### Veja também

[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | iterator de saída que escreve para [std::basic_ostream](<#/doc/io/basic_ostream>)
(modelo de classe)
[ istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) | iterator de entrada que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(modelo de classe)