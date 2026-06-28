# std::ranges::chunk_view&lt;V&gt;::inner-iterator

```cpp
class /*inner-iterator*/  // (desde C++23)
(apenas para exposição*)
```

O tipo de retorno de [`chunk_view::_outer-iterator_ ::value_type::begin`](<#/doc/ranges/chunk_view/outer_iterator/value_type>) se `V` modela [`input_range`](<#/doc/ranges/input_range>).

### Tipos membro

Tipo membro | Definição
---|---
`iterator_concept` | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)
`difference_type` | [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;
`value_type` | [ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;V&gt;

### Membros de dados

Objeto membro | Definição
---|---
`_parent__` (private) | Um ponteiro para o "objeto pai" do tipo [ranges::chunk_view](<#/doc/ranges/chunk_view>)*.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/chunk_view/inner_iterator/inner_iterator>)(C++23) | constrói um iterator
(função membro pública)
[ operator=](<#/>)(C++23) | move-atribui outro iterator
(função membro pública)
[ base](<#/doc/ranges/chunk_view/inner_iterator/base>)(C++23) | retorna um iterator para o elemento atual
(função membro pública)
[ operator*](<#/doc/ranges/chunk_view/inner_iterator/operator_star_>)(C++23) | acessa o elemento
(função membro pública)
[ operator++](<#/doc/ranges/chunk_view/inner_iterator/operator_inc>)(C++23) | incrementa o iterator
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/ranges/chunk_view/inner_iterator/operator_cmp>)(C++23) | compara o iterator com [default sentinel](<#/doc/iterator/default_sentinel>)
(função)
[ operator-](<#/doc/ranges/chunk_view/inner_iterator/operator->)(C++23) | calcula o número restante de elementos
(função)
[ iter_move](<#/doc/ranges/chunk_view/inner_iterator/iter_move>)(C++23) | converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado
(função)
[ iter_swap](<#/doc/ranges/chunk_view/inner_iterator/iter_swap>)(C++23) | troca os objetos apontados por dois iterators subjacentes
(função)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <sstream>
    
    int main()
    {
        auto letters = std::istringstream("ABCDEFGHIJK");
    
        auto chunks = std::ranges::istream_view<char>(letters)
                    | std::views::chunk(4);
    
        for (auto chunk : chunks)
        {
            // chunk is an object of type chunk_view::outer_iterator::value_type
            std::cout << '[';
            for (auto inner_iter = chunk.begin(); inner_iter != std::default_sentinel;
                 ++inner_iter)
                std::cout << *inner_iter;
            std::cout << "] ";
        }
        std::cout << '\n';
    }
```

Saída:
```
    [ABCD] [EFGH] [IJK]
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 26.7.28.5 Class chunk_view::_inner-iterator_ [range.chunk.inner.iter]

### Veja também
  
---