# std::ranges::take_view&lt;V&gt;::end

```cpp
constexpr auto end() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto end() const requires ranges::range<const V>;  // (2) (desde C++20)
```

  
Retorna um sentinel ou um iterator representando o fim da `take_view`. O fim da `take_view` é um elemento após o `count`-ésimo elemento no range subjacente, ou o fim do range subjacente se este tiver menos de `count` elementos. 

1) Retorna um take_view::/*sentinel*/&lt;false&gt;, um [std::default_sentinel_t](<#/doc/iterator/default_sentinel>), ou um [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;.

2) Retorna um take_view::/*sentinel*/&lt;true&gt;, um [std::default_sentinel_t](<#/doc/iterator/default_sentinel>), ou um [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const V&gt;.

A sobrecarga (1) não participa da resolução de sobrecarga se `V` for uma [simple view](<#/doc/ranges>) (isto é, se `V` e `const V` forem views com os mesmos tipos de iterator e sentinel). 

### Parâmetros

(nenhum) 

### Valor de retorno

O resultado depende dos concepts satisfeitos pelo tipo de view subjacente possivelmente qualificado com const `_Base_`, ou seja, `V` para ([1](<#/doc/ranges/take_view/end>)) ou `const V` para ([2](<#/doc/ranges/take_view/end>)). 

Seja [`_base__`](<#/doc/ranges/take_view>) a view subjacente. 

O tipo da view subjacente  
satisfaz ...  | [`random_access_range`](<#/doc/ranges/random_access_range>)  
---|---
sim  | não   
[`sized_range`](<#/doc/ranges/sized_range>) | sim  | [ranges::begin](<#/doc/ranges/begin>)(base_) +  
[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<Base_>(this->size()) | [std::default_sentinel](<#/doc/iterator/default_sentinel>)  
não  |  1) /*sentinel*/&lt;false&gt;{[ranges::end](<#/doc/ranges/end>)(base_)} 2) /*sentinel*/&lt;true&gt;{[ranges::end](<#/doc/ranges/end>)(base_)}  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <ranges>
    #include <type_traits>
    namespace ranges = std::ranges;
    namespace views = std::views;
    
    int main()
    {
        const auto list1 = {3, 1, 4, 1, 5};
        const auto seq1{list1 | views::take(4)};
        static_assert(ranges::sized_range<decltype(seq1)> and
                      ranges::random_access_range<decltype(seq1)> and
                      std::is_same_v<decltype(seq1.end()), decltype(list1.end())>);
        for (auto it = seq1.begin(); it != seq1.end(); ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
    
        std::list list2{2, 7, 1, 8, 2};
        const auto seq2{list2 | views::take(4)};
        static_assert(ranges::sized_range<decltype(seq2)> and
                      not ranges::random_access_range<decltype(seq2)> and
                      std::is_same_v<decltype(seq2.end()), std::default_sentinel_t>);
        for (auto it = seq2.begin(); it != std::default_sentinel; ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    3 1 4 1
    2 7 1 8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente aos padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2393R1](<https://wg21.link/P2393R1>) | C++20  | conversões implícitas entre tipos inteiros com e sem sinal podem falhar  | tornadas explícitas   
  
### Veja também

[ begin](<#/doc/ranges/take_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ counted_iterator](<#/doc/iterator/counted_iterator>)(C++20) |  adaptador de iterator que rastreia a distância até o fim do range   
(modelo de classe)  
[ operator==](<#/doc/ranges/take_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de [`take_view::begin`](<#/doc/ranges/take_view/begin>)   
(função)