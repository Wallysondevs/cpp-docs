# std::incrementable_traits&lt;std::common_iterator&gt;

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I, class S >
struct incrementable_traits<std::common_iterator<I, S>> {
using difference_type = std::iter_difference_t<I>;
};
```

Fornece a interface uniforme para o tipo de diferença associado do tipo [std::common_iterator](<#/doc/iterator/common_iterator>).

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iterator>
    #include <list>
    #include <string>
    #include <type_traits>
    
    int main()
    {
        using CI = std::common_iterator<
                       std::counted_iterator<int*>,
                       std::default_sentinel_t>;
        using CL = std::common_iterator<
                       std::counted_iterator<std::list<std::string>::iterator>,
                       std::default_sentinel_t>;
        CL cl{std::default_sentinel};
        static_assert(
            std::same_as<std::incrementable_traits<CI>::difference_type, std::ptrdiff_t> &&
            std::same_as<std::incrementable_traits<CL>::difference_type, std::ptrdiff_t> &&
            std::same_as<std::incrementable_traits<decltype(cl)>::difference_type,
                         std::ptrdiff_t;
    }
```

### Veja também

[ incrementable_traits](<#/doc/iterator/incrementable_traits>)(C++20) | calcula o tipo de diferença de um tipo [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>)
(modelo de classe)
[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterator
(modelo de alias)
[ std::iterator_traits<std::common_iterator>](<#/doc/iterator/common_iterator/iterator_traits>)(C++20) | fornece interface uniforme para as propriedades do tipo [std::common_iterator](<#/doc/iterator/common_iterator>)
(especialização de modelo de classe)