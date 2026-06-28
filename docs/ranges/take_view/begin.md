# std::ranges::take_view&lt;V&gt;::begin

```cpp
constexpr auto begin() requires (!/*simple-view*/<V>);  // (1) (desde C++20)
constexpr auto begin() const requires ranges::range<const V>;  // (2) (desde C++20)
```

  
Retorna um iterator para o primeiro elemento da `take_view`. 

1) Retorna um [std::counted_iterator](<#/doc/iterator/counted_iterator>) ou um [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;V&gt;.

2) Retorna um [std::counted_iterator](<#/doc/iterator/counted_iterator>) ou um [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;const V&gt;.

A sobrecarga (1) não participa da resolução de sobrecarga se `V` for uma [simple view](<#/doc/ranges>) (isto é, se `V` e `const V` forem views com os mesmos tipos de iterator e sentinel). 

### Parâmetros

(nenhum) 

### Valor de retorno

O resultado depende dos concepts satisfeitos pelo tipo de view subjacente possivelmente qualificado com const, `_Base_`, que é `V` para ([1](<#/doc/ranges/take_view/begin>)) ou `const V` para ([2](<#/doc/ranges/take_view/begin>)). 

Seja [`_base__`](<#/doc/ranges/take_view>) a view subjacente, [`_count__`](<#/doc/ranges/take_view>) o contador subjacente (igual a 0 se `take_view` foi inicializada por padrão). 

O tipo de view subjacente  
satisfaz ...  | [`random_access_range`](<#/doc/ranges/random_access_range>)  
---|---
sim  |  não   
[`sized_range`](<#/doc/ranges/sized_range>) |  sim  | [ranges::begin](<#/doc/ranges/begin>)(base_) | [std::counted_iterator](<#/doc/iterator/counted_iterator>)([ranges::begin](<#/doc/ranges/begin>)(base_),  
[ranges::range_difference_t](<#/doc/ranges/range_size_t>)<Base_>(this->size()))  
não  | [std::counted_iterator](<#/doc/iterator/counted_iterator>)([ranges::begin](<#/doc/ranges/begin>)(base_), count_)  
  
### Exemplo

Execute este código
```
    #include <concepts>
    #include <forward_list>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <type_traits>
    using namespace std::literals;
     
    int main()
    {
        {
            static constexpr auto v = {"∀x"sv, "∃y"sv, "ε"sv, "δ"sv};
            auto view = std::ranges::take_view(v, 8);
            auto iter = view.begin();
            std::cout << *iter << '\n';
            static_assert(
                std::ranges::sized_range<decltype(v)> and
                std::ranges::random_access_range<decltype(v)> and
                std::is_same_v<decltype(iter), decltype(std::ranges::begin(v))>
            );
        }
     
        {
            std::forward_list v = {"Ax"sv, "Ey"sv, "p"sv, "q"sv};
            auto view = std::ranges::take_view(v, 8);
            auto iter = view.begin();
            std::cout << *iter << '\n';
            static_assert(
                not std::ranges::sized_range<decltype(v)> and
                not std::ranges::random_access_range<decltype(v)> and
                std::is_same_v<decltype(iter),
                    std::counted_iterator<
                        std::forward_list<std::string_view>::iterator>>
            );
        }
    }
```

Saída: 
```
    ∀x
    Ax
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2393R1](<https://wg21.link/P2393R1>) | C++20  | conversões implícitas entre tipos de classe inteira com e sem sinal podem falhar  | tornadas explícitas   
  
### Veja também

[ end](<#/doc/ranges/take_view/end>) |  retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ counted_iterator](<#/doc/iterator/counted_iterator>)(C++20) |  adaptador de iterator que rastreia a distância até o fim do range   
(template de classe)  
[ operator==](<#/doc/ranges/take_view/sentinel/operator_cmp>)(C++20) |  compara um sentinel com um iterator retornado de `take_view::begin`   
(função)