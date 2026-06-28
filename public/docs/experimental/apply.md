# std::experimental::apply

Definido no cabeçalho `[<experimental/tuple>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/tuple&action=edit&redlink=1> "cpp/header/experimental/tuple \(page does not exist\)")`

```c
template< class F, class Tuple >
constexpr decltype(auto) apply(F&& f, Tuple&& t);
```

Invoca o objeto [Callable](<#/doc/named_req/Callable>) f com uma tupla de argumentos.

### Parâmetros

- **f** — objeto [Callable](<#/doc/named_req/Callable>) a ser invocado
- **t** — tupla cujos elementos serão usados como argumentos para f

### Valor de retorno

O que é retornado por f.

### Possível implementação
```cpp
    namespace detail
    {
        template<class F, class Tuple, std::size_t... I>
        constexpr decltype(auto) apply_impl(F&& f, Tuple&& t, std::index_sequence<I...>)
        {
            return std::invoke(std::forward<F>(f), std::get<I>(std::forward<Tuple>(t))...);
            // Nota: std::invoke é um recurso do C++17
        }
    } // namespace detail
    
    template<class F, class Tuple>
    constexpr decltype(auto) apply(F&& f, Tuple&& t)
    {
        return detail::apply_impl(std::forward<F>(f), std::forward<Tuple>(t),
            std::make_index_sequence<std::tuple_size_v<std::decay_t<Tuple>>>{});
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <tuple>
    
    template<typename... Ts>
    void print_tuple(const std::tuple<Ts...> &tuple)
    {
        std::apply( 
        {
            ((std::cout << elem << '\n'), ...); 
        }, tuple);
    }
    
    int main()
    {
        const std::tuple<int, char> t = std::make_tuple(5, 'a');
        print_tuple(t);
    }
```

Output:
```
    5
    a
```

### Veja também

[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de [referências de encaminhamento](<#/doc/language/reference>)
(modelo de função)