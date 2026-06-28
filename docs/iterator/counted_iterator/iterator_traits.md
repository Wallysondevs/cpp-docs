# std::iterator_traits&lt;std::counted_iterator&gt;

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::input_iterator I >
requires /* veja abaixo */
struct iterator_traits<std::counted_iterator<I>> : std::iterator_traits<I> {
using pointer = std::conditional_t<std::contiguous_iterator<I>,
std::add_pointer_t<std::iter_reference_t<I>>,
void>;
};
```

Herda as propriedades de um `std::iterator_traits`&lt;I&gt; customizado (gerado a partir de uma especialização parcial padrão ou de uma especialização definida pelo programa), com o tipo membro `pointer` ajustado, onde `I` modela [`input_iterator`](<#/doc/iterator/input_iterator>).

Notavelmente, o `iterator_concept` (se presente) e `iterator_category` são herdados de [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt;.

A condição na `requires-clause` é verdadeira se e somente se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; não for gerado a partir do template primário.

### Nota

Antes de [P2259R1](<https://wg21.link/P2259R1>), esta especialização é usada mesmo que [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; seja gerado a partir do template primário. Como resultado, ao testar [std::counted_iterator](<#/doc/iterator/counted_iterator>)&lt;I&gt; contra um `iterator concept` (por exemplo, [`forward_iterator`](<#/doc/iterator/forward_iterator>)), a determinação de /*ITER_CONCEPT*/ não leva em consideração `I::iterator_concept`, e, portanto, [std::counted_iterator](<#/doc/iterator/counted_iterator>)&lt;I&gt; às vezes se comporta erroneamente como se não pudesse modelar esse `concept`. Este comportamento incorreto é implementado no libstdc++ antes da versão 10.4, e no MSVC STL antes do VS 2022 17.0 Preview 3.

A `standard library` fornece especializações parciais de [std::iterator_traits](<#/doc/iterator/iterator_traits>) para tipos de ponteiro, [std::counted_iterator](<#/doc/iterator/counted_iterator>), e [std::common_iterator](<#/doc/iterator/common_iterator>).

### Exemplo

Execute este código
```cpp
    #include <iterator>
    #include <list>
    #include <type_traits>
    #include <vector>
    
    int main()
    {
        std::vector v{1, 2, 3, 4};
        std::list l{1, 2, 3, 4};
        std::counted_iterator iv{v.begin(), 3};
        std::counted_iterator il{l.begin(), 3};
        static_assert(std::is_same<int*, std::iterator_traits<decltype(iv)>::pointer>());
        static_assert(std::is_same<void, std::iterator_traits<decltype(il)>::pointer>());
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[P2259R1](<https://wg21.link/P2259R1>) | C++20 | não há `requires-clause`
`pointer` é incondicionalmente definido como `void` | restrição adicionada

### Veja também

[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece uma interface uniforme para as propriedades de um `iterator`
(modelo de classe)