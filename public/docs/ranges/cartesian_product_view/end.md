# std::ranges::cartesian_product_view&lt;First, Vs...&gt;::end

```cpp
constexpr iterator<false> end()
requires ((!/*simple-view*/<First> || ... || !/*simple-view*/<Vs>) &&
/*cartesian-product-is-common*/<First, Vs...>);  // (1) (desde C++23)
constexpr iterator<true> end() const
requires /*cartesian-product-is-common*/<const First, const Vs...>;  // (2) (desde C++23)
constexpr std::default_sentinel_t end() const noexcept;  // (3) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/cartesian_product_view/iterator>) ou um sentinel representando o fim da [`cartesian_product_view`](<#/doc/ranges/cartesian_product_view>).

Seja [`_bases__`](<#/doc/ranges/cartesian_product_view>) a tupla subjacente de views.

1,2) Equivalente a

```cpp
auto check =  { return __begin_or_first_end(rng); };  
return iterator<__is_const>(/*tuple-transform*/(check, bases_));
```

onde:

  * `__is_const` é `true` para a sobrecarga _const-qualified_ e `false` caso contrário.
  * `__is_empty` é `true` se a expressão [ranges::empty](<#/doc/ranges/empty>)(rng) for `true` para qualquer `rng` entre os ranges subjacentes, exceto o primeiro, e `false` caso contrário.
  * `__begin_or_first_end(rng)` é [expression-equivalent](<#/doc/language/expressions>) a `__is_empty ? [ranges::begin](<#/doc/ranges/begin>)(rng) : /*cartesian-common-arg-end*/(rng)` se `rng` for o primeiro range subjacente e `[ranges::begin](<#/doc/ranges/begin>)(rng)` caso contrário.

3) Equivalente a: `return [std::default_sentinel](<#/doc/iterator/default_sentinel>);`.

### Parâmetros

(nenhum)

### Valor de retorno

Um [iterator](<#/doc/ranges/cartesian_product_view/iterator>) para o elemento que segue o último elemento, ou um sentinel que se compara como igual ao iterator de fim.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <format>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <tuple>
    using namespace std::literals;
    
    int main()
    {
        constexpr auto a = std::array{ "bool"sv, "goto"sv, "extern"sv, "long"sv }; /*
                                           ^         ^           ^         ^        */
        constexpr auto v = std::ranges::cartesian_product_view(a[0], a[1], a[2], a[3]);
    
        constexpr std::tuple<char const&,
                             char const&,
                             char const&,
                             char const&> last{*(v.end() - 1)};
    
        std::cout << std::format("{}{}{}{}{}",
                                 std::get<0>(last),
                                 std::get<1>(last),
                                 std::get<2>(last),
                                 std::get<3>(last), '\n');
    }
```

Saída:
```
    long
```

### Veja também

[ begin](<#/doc/ranges/cartesian_product_view/begin>) | retorna um iterator para o início   
(função membro pública)  
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o fim de um range  
(objeto de ponto de customização)