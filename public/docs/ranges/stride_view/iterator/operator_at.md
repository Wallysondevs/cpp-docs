# std::ranges::stride_view&lt;V&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr decltype(auto) operator const
requires ranges::random_access_range<Base>  // (desde C++23)
```

  
Retorna um elemento em uma localização relativa especificada.

Equivalente a: `return *(*this + n);`.

### Parâmetros

- **n** — posição relativa à localização atual
  
### Valor de retorno

O elemento no deslocamento n em relação à localização atual.

### Exemplo

Execute este código
```cpp
    #include <ranges>
    
    int main()
    {
        constexpr static auto v = {'a', 'b', 'c', 'd', 'e'};
        constexpr auto view{v | std::views::stride(2)};
        constexpr auto iter{view.begin() + 1};
        static_assert(*iter == 'c');
        static_assert(iter[0] == 'c');
        static_assert(iter[1] == 'e');
    }
```

### Veja também

[ operator*](<#/doc/ranges/stride_view/iterator/operator_star_>)(C++23) | acessa um elemento   
(função membro pública)  