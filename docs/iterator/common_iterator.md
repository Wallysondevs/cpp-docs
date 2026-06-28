# std::common_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::input_or_output_iterator I, std::sentinel_for<I> S >
requires ( !std::same_as<I, S> && std::copyable<I> )
class common_iterator;
```

`std::common_iterator` é um adaptador de iterator `I` / sentinel `S` que pode representar um range não comum (onde os tipos de `I` e `S` diferem) como um [`common_range`](<#/doc/ranges/common_range>), contendo um iterator ou um sentinel, e definindo os operadores de comparação de igualdade `operator==` apropriados.

`std::common_iterator` pode ser usado como uma "ponte" entre sequências representadas por um par iterator/sentinel e funções legadas que esperam sequências do tipo [`common_range`](<#/doc/ranges/common_range>).

### Membros de dados

Nome do membro | Definição
---|---
`_var_` | um objeto do tipo [std::variant](<#/doc/utility/variant>)<I, S>
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/iterator/common_iterator/common_iterator>)(C++20) | constrói um novo adaptador de iterator
(função membro pública)
[ operator=](<#/>)(C++20) | atribui outro adaptador de iterator
(função membro pública)
[ operator*operator->](<#/doc/iterator/common_iterator/operator_star_>)(C++20) | acessa o elemento apontado
(função membro pública)
[ operator++operator++(int)](<#/doc/iterator/common_iterator/operator_arith>)(C++20) | avança o adaptador de iterator
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/iterator/common_iterator/operator_cmp>)(C++20) | compara os iterators ou sentinels subjacentes
(modelo de função)
[ operator-](<#/doc/iterator/common_iterator/operator->)(C++20) | calcula a distância entre dois adaptadores de iterator
(modelo de função)
[ iter_move](<#/doc/iterator/common_iterator/iter_move>)(C++20) | converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado
(função)
[ iter_swap](<#/doc/iterator/common_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iterators subjacentes
(modelo de função)

### Classes auxiliares

[ std::incrementable_traits<std::common_iterator>](<#/doc/iterator/common_iterator/incrementable_traits>)(C++20) | calcula o tipo de diferença associado do tipo **std::common_iterator**
(especialização de modelo de classe)
[ std::iterator_traits<std::common_iterator>](<#/doc/iterator/common_iterator/iterator_traits>)(C++20) | fornece uma interface uniforme para as propriedades do tipo **std::common_iterator**
(especialização de modelo de classe)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <string>
    
    template<class ForwardIter>
    void fire(ForwardIter first, ForwardIter last)
    {
        std::copy(first, last, std::ostream_iterator<std::string>{std::cout, " "});    
    }
    
    int main()
    {
        std::list<std::string> stars{"Pollux", "Arcturus", "Mira", "Aldebaran", "Sun"};
    
        using IT = std::common_iterator<
                       std::counted_iterator<std::list<std::string>::iterator>,
                       std::default_sentinel_t>;
    
        fire(IT(std::counted_iterator(stars.begin(), stars.size() - 1)),
             IT(std::default_sentinel));
    }
```

Saída:
```
    Pollux Arcturus Mira Aldebaran
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 23.5.5 Common iterators [iterators.common]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 23.5.4 Common iterators [iterators.common]

### Veja também

[ ranges::common_range](<#/doc/ranges/common_range>)(C++20) | especifica que um range possui tipos de iterator e sentinel idênticos
(conceito)
[ ranges::common_viewviews::common](<#/doc/ranges/common_view>)(C++20) | converte um [`view`](<#/doc/ranges/view>) em um [`common_range`](<#/doc/ranges/common_range>)
(modelo de classe) (objeto adaptador de range)