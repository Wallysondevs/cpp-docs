# std::ranges::slide_view&lt;V&gt;::end

```cpp
constexpr auto end()
requires (!(/*simple-view*/<V> && /*slide-caches-nothing*/<const V>));  // (1) (desde C++23)
constexpr auto end() const
requires /*slide-caches-nothing*/<const V>;  // (2) (desde C++23)
```

  
Retorna um [sentinel](<#/doc/ranges/slide_view/sentinel>) ou um [iterator](<#/doc/ranges/slide_view/iterator>) representando o fim da `slide_view`. 

1) Sejam [`_base__`](<#/doc/ranges/slide_view>) e [`_n__`](<#/doc/ranges/slide_view>) os membros de dados subjacentes. Equivalente a: 

  * Se V modela `_[slide-caches-nothing](<#/doc/ranges/slide_view>)_`, retorna iterator&lt;false&gt;([ranges::begin](<#/doc/ranges/begin>)(base_) + [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;V&gt;(size()), n_);. 
  * Caso contrário, se V modela `_[slide-caches-last](<#/doc/ranges/slide_view>)_`, retorna iterator&lt;false&gt;([ranges::prev](<#/doc/iterator/ranges/prev>)([ranges::end](<#/doc/ranges/end>)(base_), n_ - 1, [ranges::begin](<#/doc/ranges/begin>)(base_)), n_);. 
  * Caso contrário, se V modela [`common_range`](<#/doc/ranges/common_range>), retorna iterator&lt;false&gt;([ranges::end](<#/doc/ranges/end>)(base_), [ranges::end](<#/doc/ranges/end>)(base_), n_);. 
  * Caso contrário, retorna sentinel([ranges::end](<#/doc/ranges/end>)(base_));.

Se V modela `_[slide-caches-last](<#/doc/ranges/slide_view>)_`, esta função armazena em cache o resultado dentro de [`_cached_end__`](<#/doc/ranges/slide_view>) para uso em chamadas subsequentes. Isso é necessário para fornecer a complexidade de tempo constante amortizada exigida pelo [`range`](<#/doc/ranges/range>).

2) Equivalente a begin() + [ranges::range_difference_t](<#/doc/ranges/range_size_t>)&lt;const V&gt;(size()).

### Parâmetros

(nenhum) 

### Valor de retorno

Um [sentinel](<#/doc/ranges/slide_view/sentinel>) ou um [iterator](<#/doc/ranges/slide_view/iterator>) representando o fim da [`slide_view`](<#/doc/ranges/slide_view>). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        static constexpr auto source = {'A', 'B', 'C', 'D'};
     
        for (const auto subrange: source | std::views::slide(3))
        {
            std::cout << "[ ";
            for (auto it = subrange.begin(); it != subrange.end(); ++it)
                std::cout << *it << ' ';
            std::cout << "]\n";
        }
    }
```

Saída: 
```
    [ A B C ]
    [ B C D ]
```

### Veja também

[ begin](<#/doc/ranges/slide_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ ranges::begin](<#/doc/ranges/begin>)(C++20) |  retorna um iterator para o início de um range  
(objeto de ponto de customização)  
[ ranges::end](<#/doc/ranges/end>)(C++20) |  retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)