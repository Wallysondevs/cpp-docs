# std::counted_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::input_or_output_iterator I >
class counted_iterator;
```

`std::counted_iterator` é um adaptador de iterator que se comporta exatamente como o iterator subjacente, exceto que ele rastreia a distância até o final de seu range. Este iterator é igual a [std::default_sentinel](<#/doc/iterator/default_sentinel>) se e somente se sua contagem atingir zero.

### Tipos de membro

Tipo de membro | Definição
---|---
`iterator_type` | `I`
`value_type`
(presente condicionalmente) | [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt; se `I` modela [`indirectly_readable`](<#/doc/iterator/indirectly_readable>); caso contrário, não definido
---|---
`difference_type` | [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;
`iterator_concept`
(presente condicionalmente) | `I::iterator_concept` se presente; caso contrário, não definido
`iterator_category`
(presente condicionalmente) | `I::iterator_category` se presente; caso contrário, não definido

### Objetos de membro

Nome do membro | Definição
---|---
`_current_` (privado) | o iterator subjacente que [`base()`](<#/doc/iterator/counted_iterator/base>) acessa
(objeto membro apenas para exposição*)
`_length_` (privado) | a distância entre o iterator subjacente e o final de seu range
(objeto membro apenas para exposição*)

### Funções de membro

[ (construtor)](<#/doc/iterator/counted_iterator/counted_iterator>)(C++20) | constrói um novo adaptador de iterator
(função membro pública)
[ operator=](<#/>)(C++20) | atribui outro adaptador de iterator
(função membro pública)
[ base](<#/doc/iterator/counted_iterator/base>)(C++20) | acessa o iterator subjacente
(função membro pública)
[ count](<#/doc/iterator/counted_iterator/count>)(C++20) | retorna a distância até o final
(função membro pública)
[ operator*operator->](<#/doc/iterator/counted_iterator/operator_star_>)(C++20) | acessa o elemento apontado
(função membro pública)
[ operator[]](<#/doc/iterator/counted_iterator/operator_at>)(C++20) | acessa um elemento por índice
(função membro pública)
[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/counted_iterator/operator_arith>)(C++20) | avança ou decrementa o iterator
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/iterator/counted_iterator/operator_cmp>)(C++20) | compara as distâncias até o final
(modelo de função)
[ operator==(std::default_sentinel)](<#/doc/iterator/counted_iterator/operator_cmp2>)(C++20) | verifica se a distância até o final é igual a `​0​`
(modelo de função)
[ operator+](<#/>)(C++20) | avança o iterator
(modelo de função)
[ operator-](<#/doc/iterator/counted_iterator/operator->)(C++20) | calcula a distância entre dois adaptadores de iterator
(modelo de função)
[ operator-(std::default_sentinel_t)](<#/doc/iterator/counted_iterator/operator-2>)(C++20) | calcula a distância com sinal até o final
(modelo de função)
[ iter_move](<#/doc/iterator/counted_iterator/iter_move>)(C++20) | converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado
(função)
[ iter_swap](<#/doc/iterator/counted_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iterators subjacentes
(modelo de função)

### Classes auxiliares

[ std::iterator_traits<std::counted_iterator>](<#/doc/iterator/counted_iterator/iterator_traits>)(C++20) | fornece uma interface uniforme para as propriedades do tipo **std::counted_iterator**
(especialização de modelo de classe)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    using std::operator""s;
    
    void print(auto const remark, auto const& v)
    {
        const auto size = std::ssize(v);
        std::cout << remark << '[' << size << "] { ";
        for (auto it = std::counted_iterator{std::cbegin(v), size};
             it != std::default_sentinel; ++it)
            std::cout << *it << (it.count() > 1 ? ", " : " ");
        std::cout << "}\n";
    }
    
    int main()
    {
        const auto src = {"Arcturus"s, "Betelgeuse"s, "Canopus"s, "Deneb"s, "Elnath"s};
        print("src", src);
        std::vector<decltype(src)::value_type> dst;
        std::ranges::copy(std::counted_iterator{src.begin(), 3},
                          std::default_sentinel,
                          std::back_inserter(dst));
        print("dst", dst);
    }
```

Saída:
```
    src[5] { Arcturus, Betelgeuse, Canopus, Deneb, Elnath }
    dst[3] { Arcturus, Betelgeuse, Canopus }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[P2259R1](<https://wg21.link/P2259R1>) | C++20 | typedefs de membro não são fornecidos [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)
é especializado para `counted_iterator` | typedefs de membro são adicionados para considerar a correção de [`iterator_traits`](<#/doc/iterator/counted_iterator/iterator_traits>)
a especialização redundante de [std::incrementable_traits](<#/doc/iterator/incrementable_traits>) é removida

### Veja também

[ default_sentinel_t](<#/doc/iterator/default_sentinel>)(C++20) | sentinela padrão para uso com iterators que conhecem o limite de seu range
(classe)
[ views::counted](<#/doc/ranges/counted_view>)(C++20) | cria um sub-range a partir de um iterator e uma contagem
(objeto de ponto de customização)
[ ranges::take_viewviews::take](<#/doc/ranges/take_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo dos primeiros N elementos de outra [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)