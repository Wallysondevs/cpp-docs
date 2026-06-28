# std::ranges::views::keys, std::ranges::keys_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class R >
using keys_view = ranges::elements_view<R, 0>;
namespace views {
inline constexpr auto keys = ranges::elements<0>;
}
```

Recebe uma [`view`](<#/doc/ranges/view>) de valores _tuple-like_ (por exemplo, [std::tuple](<#/doc/utility/tuple>) ou [std::pair](<#/doc/utility/pair>)), e produz uma view com um _value-type_ do _primeiro_ elemento do value-type da view adaptada.

1) Um alias para [ranges::elements_view](<#/doc/ranges/elements_view>)<R, 0>.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>) (e também [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>)). A expressão `views::keys(e)` é [expression-equivalent](<#/doc/language/expressions>) a `keys_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((e))>>{e}` para qualquer subexpressão `e` adequada.

### Notas

`keys_view` pode ser útil para extrair _chaves_ de containers associativos, por exemplo.
```cpp
    std::map<std::string, int> map{{"one", 1}, {"two", 2}};
    
    for (auto const& key : std::views::keys(map))
        std::cout << key << ' ';
    // imprime: one two
```

### Exemplo

Exibe valores para cada tipo de [quark](<https://en.wikipedia.org/wiki/quark> "enwiki:quark") na física de partículas.

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <ranges>
    #include <string>
    #include <tuple>
    #include <vector>
    
    int main()
    {
        const std::vector<std::tuple<std::string, double, bool>> quark_mass_charge
        {
            // nome, MeV/c², tem carga elétrica positiva:
            {"up", 2.3, true}, {"down", 4.8, false},
            {"charm", 1275, true}, {"strange", 95, false},
            {"top", 173'210, true}, {"bottom", 4'180, false},
        };
    
        std::cout.imbue(std::locale("en_US.utf8"));
        std::cout << "Quark name:  │ ";
        for (std::string const& name : std::views::keys(quark_mass_charge))
            std::cout << std::setw(9) << name << " │ ";
    
        std::cout << "\n" "Mass MeV/c²: │ ";
        for (const double mass : std::views::values(quark_mass_charge))
            std::cout << std::setw(9) << mass << " │ ";
    
        std::cout << "\n" "E-charge:    │ ";
        for (const bool pos : std::views::elements<2>(quark_mass_charge))
            std::cout << std::setw(9) << (pos ? "+2/3" : "-1/3") << " │ ";
        std::cout << '\n';
    }
```

Saída:
```
    Quark name:  │        up │      down │     charm │   strange │       top │    bottom │
    Mass MeV/c²: │       2.3 │       4.8 │     1,275 │        95 │   173,210 │     4,180 │
    E-charge:    │      +2/3 │      -1/3 │      +2/3 │      -1/3 │      +2/3 │      -1/3 │
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3563](<https://cplusplus.github.io/LWG/issue3563>) | C++20 | `keys_view` é incapaz de participar do CTAD devido ao seu uso de views::all_t | views::all_t removido

### Veja também

[ ranges::values_viewviews::values](<#/doc/ranges/values_view>)(C++20) | recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores tipo par e produz uma [`view`](<#/doc/ranges/view>) dos segundos elementos de cada par
(modelo de classe) (objeto adaptador de range)
[ ranges::elements_viewviews::elements](<#/doc/ranges/elements_view>)(C++20) | recebe uma [`view`](<#/doc/ranges/view>) consistindo de valores [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) e um número N e produz uma [`view`](<#/doc/ranges/view>) do N-ésimo elemento de cada tupla
(modelo de classe) (objeto adaptador de range)
[ slice](<#/doc/numeric/valarray/slice>) | slice tipo BLAS de um valarray: índice inicial, comprimento, passo
(classe)