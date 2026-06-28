# std::basic_string&lt;CharT,Traits,Allocator&gt;::replace_with_range

```cpp
template< container-compatible-range<CharT> R >
constexpr std::basic_string& replace_with_range( const_iterator first,
const_iterator last,
R&& rg );  // (desde C++23)
```

  
Substitui os caracteres no range `[`first`, `last`)` pelos caracteres do range rg.

Equivalente a
```cpp
    return replace(first,
                   last,
                   std::basic_string(
                       std::from_range,
                       std::forward<R>(rg),
                       get_allocator())
    );
```

### Parâmetros

first, last  |  \-  |  range de caracteres que será substituído   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>)  
  
### Valor de retorno

*this

### Complexidade

Linear no tamanho de rg.

### Exceções

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>).

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | funções membro que aceitam [range compatível com container](<#/doc/ranges/to>)  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <forward_list>
    #include <iterator>
    #include <string>
    
    int main()
    {
        using namespace std::literals;
    
        auto s{"Today is today!"s};
        constexpr auto today{"today"sv};
        constexpr auto tomorrow{"tomorrow's yesterday"sv};
        std::forward_list<char> rg;
        std::ranges::reverse_copy(tomorrow, std::front_inserter(rg));
    
        const auto pos{s.rfind(today)};
        assert(pos != s.npos);
        const auto first{std::next(s.begin(), pos)};
        const auto last{std::next(first, today.length())};
    
    #ifdef __cpp_lib_containers_ranges
        s.replace_range(first, last, rg);
    #else
        s.replace(first, last, rg.cbegin(), rg.cend());
    #endif
    
        assert("Today is tomorrow's yesterday!" == s);
    }
```

### Ver também

[ replace](<#/doc/string/basic_string/replace>) |  substitui uma porção especificada de uma string   
(função membro pública)  