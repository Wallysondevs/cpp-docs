# std::is_function

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_function;
```

`std::is_function` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo de função. Tipos como [std::function](<#/doc/utility/functional/function>), lambdas, classes com `operator()` sobrecarregado e ponteiros para funções não são considerados tipos de função. Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de função. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_function` ou `std::is_function_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_function_v = is_function<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de função, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

`std::is_function` pode ser implementado de maneiras muito mais simples. Implementações semelhantes à seguinte são usadas por novas versões de [libc++](<https://github.com/llvm-mirror/libcxx/blob/master/include/type_traits#L889>), [libstdc++](<https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/std/type_traits#L538>) e [MS STL](<https://github.com/microsoft/STL/pull/460>):
```cpp
    template<class T>
    struct is_function : std::integral_constant<
        bool,
        !std::is_const<const T>::value && !std::is_reference<T>::value
    > {};
```

A implementação mostrada abaixo é para fins pedagógicos, pois exibe a miríade de tipos de função.

### Implementação possível
```cpp
    // primary template
    template<class>
    struct is_function : std::false_type {};
    
    // specialization for regular functions
    template<class Ret, class... Args>
    struct is_function<Ret(Args...)> : std::true_type {};
    
    // specialization for variadic functions such as std::printf
    template<class Ret, class... Args>
    struct is_function<Ret(Args......)> : std::true_type {};
    
    // specialization for function types that have cv-qualifiers
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) volatile> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const volatile> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) volatile> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const volatile> : std::true_type {};
    
    // specialization for function types that have ref-qualifiers
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) volatile &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const volatile &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) volatile &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const volatile &> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) volatile &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const volatile &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) volatile &&> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const volatile &&> : std::true_type {};
    
    // specializations for noexcept versions of all the above (C++17 and later)
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) volatile noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const volatile noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) volatile noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const volatile noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) volatile & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const volatile & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) volatile & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const volatile & noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) volatile && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args...) const volatile && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) volatile && noexcept> : std::true_type {};
    template<class Ret, class... Args>
    struct is_function<Ret(Args......) const volatile && noexcept> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <type_traits>
    
    int f();
    static_assert(std::is_function_v<decltype(f)>);
    
    static_assert(std::is_function_v<int(int)>);
    static_assert(!std::is_function_v<int>);
    static_assert(!std::is_function_v<decltype([]{})>);
    static_assert(!std::is_function_v<std::function<void()>>);
    
    struct O { void operator()() {} };
    static_assert(std::is_function_v<O()>);
    
    struct A
    {
        static int foo();
        int fun() const&;
    };
    static_assert(!std::is_function_v<A>);
    static_assert(std::is_function_v<decltype(A::foo)>);
    static_assert(!std::is_function_v<decltype(&A::fun)>);
    
    template<typename>
    struct PM_traits {};
    template<class T, class U>
    struct PM_traits<U T::*> { using member_type = U; };
    
    int main()
    {
        using T = PM_traits<decltype(&A::fun)>::member_type; // T is int() const&
        static_assert(std::is_function_v<T>);
    }
```

### Veja também

[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos
(template de classe)
[ is_object](<#/doc/types/is_object>)(C++11) | verifica se um tipo é um tipo de objeto
(template de classe)
[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-união
(template de classe)