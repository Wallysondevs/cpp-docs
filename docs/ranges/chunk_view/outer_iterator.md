# std::ranges::chunk_view&lt;V&gt;::outer-iterator

```cpp
class /*outer-iterator*/  // (desde C++23)
(apenas para exposição*)
```

  
O tipo de retorno de [`chunk_view::begin`](<#/doc/ranges/chunk_view/begin>) se `V` modela [`input_range`](<#/doc/ranges/input_range>). 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`iterator_concept` |  [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)  
`difference_type` |  [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;  
  
### Membros de Dados

Objeto Membro  |  Definição   
---|---
`_parent__` (private) |  Um ponteiro para o "objeto pai" do tipo [ranges::chunk_view](<#/doc/ranges/chunk_view>)*  
(objeto membro apenas para exposição*)  
  
### Funções Membro

[ (construtor)](<#/doc/ranges/chunk_view/outer_iterator/outer_iterator>)(C++23) |  constrói um iterator   
(função membro pública)  
[ operator=](<#/>)(C++23) |  atribui por move outro iterator   
(função membro pública)  
[ operator*](<#/doc/ranges/chunk_view/outer_iterator/operator_star_>)(C++23) |  acessa o elemento   
(função membro pública)  
[ operator++](<#/doc/ranges/chunk_view/outer_iterator/operator_inc>)(C++23) |  incrementa o iterator   
(função membro pública)  
  
### Funções Não-Membro

[ operator==](<#/doc/ranges/chunk_view/outer_iterator/operator_cmp>)(C++23) |  compara o iterator com [default sentinel](<#/doc/iterator/default_sentinel>)   
(função)  
[ operator-](<#/doc/ranges/chunk_view/outer_iterator/operator->)(C++23) |  calcula o número de chunks restantes   
(função)  
  
### Classes Aninhadas

[ value_type](<#/doc/ranges/chunk_view/outer_iterator/value_type>)(C++23) |  o tipo de valor de /*output-iterator*/   
(classe membro pública)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <sstream>
    
    int main()
    {
        const std::string source{"ABCDEFGHIJ"};
    
        auto letters = std::istringstream{source};
        auto chunks = std::ranges::istream_view<char>(letters)
                    | std::views::chunk(4);
    
        for (auto outer_iter = chunks.begin(); outer_iter != std::default_sentinel;
             ++outer_iter)
        {
            auto chunk = *outer_iter; // chunk is an object of type
                                      // chunk_view::outer_iterator::value_type
            std::cout << '[';
            for (auto inner_iter = chunk.begin(); inner_iter != std::default_sentinel;
                 ++inner_iter)
                std::cout << *inner_iter;
            std::cout << "] ";
        }
        std::cout << '\n';
    
        // The same output using range-for loops
        auto letters2 = std::istringstream{source};
        auto chunks2 = std::ranges::istream_view<char>(letters2)
                     | std::views::chunk(4);
        for (auto chunk : chunks2)
        {
            std::cout << '[';
            for (auto ch : chunk)
                std::cout << ch;
            std::cout << "] ";
        }
        std::cout << '\n';
    }
```

Output: 
```
    [ABCD] [EFGH] [IJ]
    [ABCD] [EFGH] [IJ]
```

### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 26.7.28.3 Class chunk_view::outer-iterator [range.chunk.outer.iter] 

### Veja também  
  
---