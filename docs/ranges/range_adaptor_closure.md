# std::ranges::range_adaptor_closure

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class D >
requires std::is_object_v<D> && std::same_as<D, std::remove_cv_t<D>>
class range_adaptor_closure {};
```

`std::ranges::range_adaptor_closure` é um modelo de classe auxiliar para definir um [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>).

Seja t o objeto do tipo `T`, a implementação garante que t é um objeto de closure de adaptador de range se todos os requisitos forem atendidos:

  * t é um objeto de função unário que recebe um argumento [`range`](<#/doc/ranges/range>).
  * `T` possui exatamente uma classe base pública `ranges::range_adaptor_closure<T>`, e `T` não possui classes base do tipo `ranges::range_adaptor_closure<U>` para qualquer outro tipo `U`.
  * `T` não satisfaz [`range`](<#/doc/ranges/range>).

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::range_adaptor_closure`

### Exemplo

Execute este código
```
    #include <ranges>
    #include <string_view>
    
    // Define Slice as a range adaptor closure
    struct Slice : std::ranges::range_adaptor_closure<Slice>
    {
        std::size_t start = 0;
        std::size_t end = std::string_view::npos;
    
        constexpr std::string_view operator()(std::string_view sv) const
        {
            return sv.substr(start, end - start);
        }
    };
    
    int main()
    {
        constexpr std::string_view str = "01234567";
    
        constexpr Slice slicer{.start = 1, .end = 6};
    
        // use slicer as a normal function object
        constexpr auto sv1 = slicer(str);
        static_assert(sv1 == "12345");
    
        // use slicer as a range adaptor closure object
        constexpr auto sv2 = str | slicer;
        static_assert(sv2 == "12345");
    
        // range adaptor closures can be composed
        constexpr auto slice_and_drop = slicer | std::views::drop(2);
        static_assert(std::string_view(str | slice_and_drop) == "345");
    }
```