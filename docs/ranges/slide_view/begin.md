# std::ranges::slide_view&lt;V&gt;::begin

```cpp
constexpr auto begin()
requires (!(/*simple-view*/<V> && /*slide-caches-nothing*/<const V>));  // (1) (desde C++23)
constexpr auto begin() const
requires /*slide-caches-nothing*/<const V>;  // (2) (desde C++23)
```

  
Retorna um iterator para o primeiro elemento da `slide_view`.

1) Se V modela `_[slide-caches-first](<#/doc/ranges/slide_view>)_`, equivalente a:

return iterator&lt;false&gt;(  
[ranges::begin](<#/doc/ranges/begin>)(base_),  
[ranges::next](<#/doc/iterator/ranges/next>)([ranges::begin](<#/doc/ranges/begin>)(base_), n_ - 1, [ranges::end](<#/doc/ranges/end>)(base_)),  
n_  
);

Caso contrário, equivalente a: `return iterator<false>([ranges::begin](<#/doc/ranges/begin>)(base_), n_);`.

Se V modela `_[slide-caches-first](<#/doc/ranges/slide_view>)_`, esta função armazena em cache o resultado dentro de [`_cached_begin__`](<#/doc/ranges/slide_view>) para uso em chamadas subsequentes. Isso é necessário para fornecer a complexidade de tempo constante amortizada exigida pelo [`range`](<#/doc/ranges/range>).

2) Equivalente a: `return iterator<true>([ranges::begin](<#/doc/ranges/begin>)(base_), n_);`.

### Parâmetros

(nenhum)

### Valor de retorno

Um [iterator](<#/doc/ranges/slide_view/iterator>) para o primeiro elemento de [`slide_view`](<#/doc/ranges/slide_view>), que aponta para o sub-range de tamanho [`_n__`](<#/doc/ranges/slide_view>) do tipo de view subjacente possivelmente qualificado com `const` – V para a sobrecarga ([1](<#/doc/ranges/slide_view/begin>)) ou `const V` para a sobrecarga ([2](<#/doc/ranges/slide_view/begin>)).

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <string_view>
    using namespace std::literals;
     
    int main()
    {
        static constexpr auto source = {"∀x"sv, "∃y"sv, "ε"sv, "δ"sv};
        auto view{std::ranges::slide_view(source, 2)};
        const auto subrange{*(view.begin())};
        for (std::string_view const s : subrange)
            std::cout << s << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    ∀x ∃y
```

### Veja também

[ end](<#/doc/ranges/slide_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  
[ operator==](<#/doc/ranges/slide_view/sentinel/operator_cmp>)(desde C++23) | compara um sentinel com um iterator retornado de `slide_view::begin`   
(função)