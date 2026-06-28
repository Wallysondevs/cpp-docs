# std::experimental::make_array

Definido no cabeçalho `[<experimental/array>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/array&action=edit&redlink=1> "cpp/header/experimental/array \(page does not exist\)")`

```c
template< class D = void, class... Types >
constexpr std::array<VT /* veja abaixo */, sizeof...(Types)> make_array( Types&&... t );
```

Cria um [std::array](<#/doc/container/array>) cujo tamanho é igual ao número de argumentos e cujos elementos são inicializados a partir dos argumentos correspondentes. Retorna [std::array](<#/doc/container/array>)<VT, sizeof...(Types)>{[std::forward](<#/doc/utility/forward>)&lt;Types&gt;(t)...}.

Se `D` for void, então o tipo deduzido `VT` é [std::common_type_t](<#/doc/types/common_type>)<Types...>. Caso contrário, é `D`.

Se `D` for void e qualquer um de [std::decay_t](<#/doc/types/decay>)&lt;Types&gt;... for uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), o programa é malformado.

### Notas

`make_array` foi removido na Library Fundamentals TS v3 porque o [deduction guide](<#/doc/container/array/deduction_guides>) para `std::array` e [`std::to_array`](<#/doc/container/array/to_array>) já estão em C++20.

### Possível implementação
```cpp
    namespace details
    {
        template<class> struct is_ref_wrapper : std::false_type{};
        template<class T> struct is_ref_wrapper<std::reference_wrapper<T>> : std::true_type{};
    
        template<class T>
        using not_ref_wrapper = std::negation<is_ref_wrapper<std::decay_t<T>>>;
    
        template<class D, class...> struct return_type_helper { using type = D; };
        template<class... Types>
        struct return_type_helper<void, Types...> : std::common_type<Types...>
        {
            static_assert(std::conjunction_v<not_ref_wrapper<Types>...>,
                          "Types cannot contain reference_wrappers when D is void");
        };
    
        template<class D, class... Types>
        using return_type = std::array<typename return_type_helper<D, Types...>::type,
                                       sizeof...(Types)>;
    }
    
    template<class D = void, class... Types>
    constexpr details::return_type<D, Types...> make_array(Types&&... t)
    {
        return {std::forward<Types>(t)...};
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <experimental/array>
    #include <iostream>
    #include <type_traits>
    
    int main()
    {
        auto arr = std::experimental::make_array(1, 2, 3, 4, 5);
        bool is_array_of_5_ints = std::is_same<decltype(arr), std::array<int, 5>>::value;
        std::cout << "Returns an array of five ints? ";
        std::cout << std::boolalpha << is_array_of_5_ints << '\n';
    }
```

Saída:
```
    Returns an array of five ints? true
```

### Veja também

[Documentação C++](<#/doc/container/array/deduction_guides>) para os deduction guides de `std::array`
---
[ to_array](<#/doc/experimental/to_array>) | cria um objeto [std::array](<#/doc/container/array>) a partir de um array embutido
(modelo de função)