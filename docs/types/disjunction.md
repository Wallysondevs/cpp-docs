# std::disjunction

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class... B >
struct disjunction;
```

Forma a [disjunção lógica](<https://en.wikipedia.org/wiki/Logical_disjunction> "enwiki:Logical disjunction") dos type traits B..., realizando efetivamente um OR lógico na sequência de traits.

A especialização std::disjunction<B1, ..., BN> possui uma base pública e não ambígua que é

  * se sizeof...(B) == 0, [std::false_type](<#/doc/types/integral_constant>); caso contrário
  * o primeiro tipo `Bi` em `B1, ..., BN` para o qual bool(Bi::value) == true, ou `BN` se não houver tal tipo.

Os nomes dos membros da classe base, exceto `disjunction` e `operator=`, não são ocultados e estão unambiguousmente disponíveis em `disjunction`.

A disjunção é de curto-circuito: se houver um argumento de tipo de template `Bi` com bool(Bi::value) != false, então instanciar disjunction<B1, ..., BN>::value não requer a instanciação de Bj::value para `j > i`.

Se o programa adicionar especializações para `std::disjunction` ou `std::disjunction_v`, o comportamento é indefinido.

### Parâmetros de template

- **B...** — cada argumento de template `Bi` para o qual Bi::value é instanciado deve ser utilizável como uma classe base e definir o membro `value` que seja conversível para bool

### Template de variável auxiliar

```cpp
template< class... B >
constexpr bool disjunction_v = disjunction<B...>::value;  // (desde C++17)
```

### Possível implementação
```cpp
    template<class...>
    struct disjunction : std::false_type {};
    
    template<class B1>
    struct disjunction<B1> : B1 {};
    
    template<class B1, class... Bn>
    struct disjunction<B1, Bn...>
        : std::conditional_t<bool(B1::value), B1, disjunction<Bn...>>  {};
```

---

### Notas

Uma especialização de `disjunction` não herda necessariamente de [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>): ela simplesmente herda do primeiro `B` cujo `::value`, explicitamente convertido para bool, é true, ou do último `B` quando todos eles convertem para false. Por exemplo, std::disjunction<[std::integral_constant](<#/doc/types/integral_constant>)<int, 2>, [std::integral_constant](<#/doc/types/integral_constant>)<int, 4>>::value é 2.

A instanciação de curto-circuito diferencia `disjunction` de [fold expressions](<#/doc/language/fold>): uma fold expression como (... || Bs::value) instancia cada `B` em `Bs`, enquanto std::disjunction_v<Bs...> para a instanciação assim que o valor pode ser determinado. Isso é particularmente útil se o tipo posterior for caro para instanciar ou puder causar um erro grave quando instanciado com o tipo errado.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_logical_traits`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | [Type traits de operadores lógicos](<#/doc/meta>)

### Exemplo

Run this code
```cpp
    #include <cstdint>
    #include <string>
    #include <type_traits>
    
    // values_equal<a, b, T>::value is true if and only if a == b.
    template<auto V1, decltype(V1) V2, typename T>
    struct values_equal : std::bool_constant<V1 == V2>
    {
        using type = T;
    };
    
    // default_type<T>::value is always true
    template<typename T>
    struct default_type : std::true_type
    {
        using type = T;
    };
    
    // Now we can use disjunction like a switch statement:
    template<int I>
    using int_of_size = typename std::disjunction< //
        values_equal<I, 1, std::int8_t>,           //
        values_equal<I, 2, std::int16_t>,          //
        values_equal<I, 4, std::int32_t>,          //
        values_equal<I, 8, std::int64_t>,          //
        default_type<void>                         // must be last!
        >::type;
    
    static_assert(sizeof(int_of_size<1>) == 1);
    static_assert(sizeof(int_of_size<2>) == 2);
    static_assert(sizeof(int_of_size<4>) == 4);
    static_assert(sizeof(int_of_size<8>) == 8);
    static_assert(std::is_same_v<int_of_size<13>, void>);
    
    // checking if Foo is constructible from double will cause a hard error
    struct Foo
    {
        template<class T>
        struct sfinae_unfriendly_check { static_assert(!std::is_same_v<T, double>); };
    
        template<class T>
        Foo(T, sfinae_unfriendly_check<T> = {});
    };
    
    template<class... Ts>
    struct first_constructible
    {
        template<class T, class...Args>
        struct is_constructible_x : std::is_constructible<T, Args...>
        {
            using type = T;
        };
    
        struct fallback
        {
            static constexpr bool value = true;
            using type = void; // type to return if nothing is found
        };
    
        template<class... Args>
        using with = typename std::disjunction<is_constructible_x<Ts, Args...>...,
                                               fallback>::type;
    };
    
    // OK, is_constructible<Foo, double> not instantiated
    static_assert(std::is_same_v<first_constructible<std::string, int, Foo>::with<double>,
                                 int>);
    
    static_assert(std::is_same_v<first_constructible<std::string, int>::with<>, std::string>);
    static_assert(std::is_same_v<first_constructible<std::string, int>::with<const char*>,
                                 std::string>);
    static_assert(std::is_same_v<first_constructible<std::string, int>::with<void*>, void>);
    
    int main() {}
```

### Veja também

[ negation](<#/doc/types/negation>)(C++17) | metafunção NOT lógica
(template de classe)
[ conjunction](<#/doc/types/conjunction>)(C++17) | metafunção AND lógica variádica
(template de classe)