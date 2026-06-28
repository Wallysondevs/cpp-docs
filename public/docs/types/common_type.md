# std::common_type

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class... T >
struct common_type;
```

Determina o tipo comum entre todos os tipos `T...`, ou seja, o tipo para o qual todos os `T...` podem ser implicitamente convertidos. Se tal tipo existir (conforme determinado pelas regras abaixo), o membro `type` nomeia esse tipo. Caso contrário, não há membro `type`.

*   Se `sizeof...(T)` for zero, não há membro `type`.
*   Se `sizeof...(T)` for um (ou seja, `T...` contém apenas um tipo `T0`), o membro `type` nomeia o mesmo tipo que `std::common_type<T0, T0>::type` se existir; caso contrário, não há membro `type`.
*   Se `sizeof...(T)` for dois (ou seja, `T...` contém exatamente dois tipos `T1` e `T2`),

    *   Se aplicar [std::decay](<#/doc/types/decay>) a pelo menos um de `T1` e `T2` produzir um tipo diferente, o membro `type` nomeia o mesmo tipo que `std::common_type<[std::decay](<#/doc/types/decay>)<T1>::type, [std::decay](<#/doc/types/decay>)<T2>::type>::type`, se existir; caso contrário, não há membro `type`;
    *   Caso contrário, se houver uma especialização de usuário para `std::common_type<T1, T2>`, essa especialização é usada;
    *   Caso contrário, se [std::decay](<#/doc/types/decay>)<decltype(false ? [std::declval](<#/doc/utility/declval>)<T1>() : [std::declval](<#/doc/utility/declval>)<T2>())>::type for um tipo válido, o membro `type` denota esse tipo, veja [o operador condicional](<#/doc/language/operator_other>);

    *   Caso contrário, se [std::decay](<#/doc/types/decay>)<decltype(false ? [std::declval](<#/doc/utility/declval>)<CR1>() : [std::declval](<#/doc/utility/declval>)<CR2>())>::type for um tipo válido, onde `CR1` e `CR2` são `const [std::remove_reference_t](<#/doc/types/remove_reference>)<T1>&` e `const [std::remove_reference_t](<#/doc/types/remove_reference>)<T2>&` respectivamente, o membro `type` denota esse tipo;

| (desde C++20)

    *   Caso contrário, não há membro `type`.

*   Se `sizeof...(T)` for maior que dois (ou seja, `T...` consiste nos tipos `T1, T2, R...`), então se `std::common_type<T1, T2>::type` existir, o membro `type` denota `std::common_type<typename std::common_type<T1, T2>::type, R...>::type` se tal tipo existir. Em todos os outros casos, não há membro `type`.

Se qualquer tipo no parameter pack `T` não for um tipo completo, (possivelmente cv-qualified) `void`, ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

### Tipos aninhados

Nome | Definição
---|---
`type` | o tipo comum para todos `T`

### Tipos auxiliares

```cpp
template< class... T >
using common_type_t = typename common_type<T...>::type;  // (desde C++14)
```

### Especializações

Usuários podem especializar `common_type` para os tipos `T1` e `T2` se

*   Pelo menos um de `T1` e `T2` depender de um tipo definido pelo usuário, e
*   [std::decay](<#/doc/types/decay>) for uma transformação de identidade para ambos `T1` e `T2`.

Se tal especialização tiver um membro chamado `type`, ele deve ser um membro público e não ambíguo que nomeia um tipo não-referência cv-unqualified para o qual ambos `T1` e `T2` são explicitamente conversíveis. Além disso, `std::common_type<T1, T2>::type` e `std::common_type<T2, T1>::type` devem denotar o mesmo tipo.

Um programa que adiciona especializações de `common_type` em violação a essas regras tem comportamento indefinido.

Note que o comportamento de um programa que adiciona uma especialização a qualquer outro template (exceto para [`std::basic_common_reference`](<#/doc/types/common_reference>))(desde C++20) de `<type_traits>` é indefinido.

As seguintes especializações já são fornecidas pela standard library:

[ std::common_type<std::chrono::duration>](<#/doc/chrono/duration/common_type>)(C++11) | especializa o trait **std::common_type**
(especialização de template de classe)
[ std::common_type<std::chrono::time_point>](<#/doc/chrono/time_point/common_type>)(C++11) | especializa o trait **std::common_type**
(especialização de template de classe)
[ std::common_type<std::pair>](<#/doc/utility/pair/common_type>)(C++23) | determina o tipo comum de dois `pair`
(especialização de template de classe)
[ std::common_type<_tuple-like_ >](<#/doc/utility/tuple/common_type>)(C++23) | determina o tipo comum de um `tuple` e um tipo `_tuple-like_`
(especialização de template de classe)
[ std::common_type<std::basic_const_iterator>](<#/doc/iterator/basic_const_iterator/common_type>)(C++23) | determina o tipo comum de um iterator e um tipo `basic_const_iterator` adaptado
(especialização de template de classe)

### Possível implementação
```cpp
    // primary template (used for zero types)
    template<class...>
    struct common_type {};
    
    // one type
    template<class T>
    struct common_type<T> : common_type<T, T> {};
    
    namespace detail
    {
        template<class...>
        using void_t = void;
    
        template<class T1, class T2>
        using conditional_result_t = decltype(false ? std::declval<T1>() : std::declval<T2>());
    
        template<class, class, class = void>
        struct decay_conditional_result {};
        template<class T1, class T2>
        struct decay_conditional_result<T1, T2, void_t<conditional_result_t<T1, T2>>>
            : std::decay<conditional_result_t<T1, T2>> {};
    
        template<class T1, class T2, class = void>
        struct common_type_2_impl : decay_conditional_result<const T1&, const T2&> {};
    
        // C++11 implementation:
        // template<class, class, class = void>
        // struct common_type_2_impl {};
    
        template<class T1, class T2>
        struct common_type_2_impl<T1, T2, void_t<conditional_result_t<T1, T2>>>
            : decay_conditional_result<T1, T2> {};
    }
    
    // two types
    template<class T1, class T2>
    struct common_type<T1, T2> 
        : std::conditional<std::is_same<T1, typename std::decay<T1>::type>::value &&
                           std::is_same<T2, typename std::decay<T2>::type>::value,
                           detail::common_type_2_impl<T1, T2>,
                           common_type<typename std::decay<T1>::type,
                                       typename std::decay<T2>::type>>::type {};
    
    // 3+ types
    namespace detail
    {
        template<class AlwaysVoid, class T1, class T2, class... R>
        struct common_type_multi_impl {};
        template<class T1, class T2, class...R>
        struct common_type_multi_impl<void_t<typename common_type<T1, T2>::type>, T1, T2, R...>
            : common_type<typename common_type<T1, T2>::type, R...> {};
    }
    
    template<class T1, class T2, class... R>
    struct common_type<T1, T2, R...>
        : detail::common_type_multi_impl<void, T1, T2, R...> {};
```

---

### Notas

Para tipos aritméticos não sujeitos a promoção, o tipo comum pode ser visto como o tipo da expressão aritmética (possivelmente de modo misto), como `T0() + T1() + ... + Tn()`.

### Exemplos

Demonstra aritmética de modo misto em uma classe definida pelo programa:

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    template<class T>
    struct Number { T n; };
    
    template<class T, class U>
    constexpr Number<std::common_type_t<T, U>>
        operator+(const Number<T>& lhs, const Number<U>& rhs)
    {
        return {lhs.n + rhs.n};
    }
    
    void describe(const char* expr, const Number<int>& x)
    {
        std::cout << expr << "  is  Number<int>{" << x.n << "}\n";
    }
    
    void describe(const char* expr, const Number<double>& x)
    {
        std::cout << expr << "  is  Number<double>{" << x.n << "}\n";
    }
    
    int main()
    {
        Number<int> i1 = {1}, i2 = {2};
        Number<double> d1 = {2.3}, d2 = {3.5};
        describe("i1 + i2", i1 + i2);
        describe("i1 + d2", i1 + d2);
        describe("d1 + i2", d1 + i2);
        describe("d1 + d2", d1 + d2);
    }
```

Saída:
```
    i1 + i2  is  Number<int>{3}
    i1 + d2  is  Number<double>{4.5}
    d1 + i2  is  Number<double>{4.3}
    d1 + d2  is  Number<double>{5.8}
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2141](<https://cplusplus.github.io/LWG/issue2141>) | C++11 | o tipo de resultado do operador condicional não era decayed | decayed o tipo de resultado
[LWG 2408](<https://cplusplus.github.io/LWG/issue2408>) | C++11 | `common_type` não era SFINAE-friendly | tornou SFINAE-friendly
[LWG 2460](<https://cplusplus.github.io/LWG/issue2460>) | C++11 | especializações de `common_type` eram quase impossíveis de escrever | reduziu o número de especializações necessárias

### Veja também

[ common_with](<#/doc/concepts/common_with>)(C++20) | especifica que dois tipos compartilham um tipo comum
(concept)