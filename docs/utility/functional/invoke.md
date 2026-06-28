# std::invoke, std::invoke_r

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class F, class... Args >
std::invoke_result_t<F, Args...>
invoke( F&& f, Args&&... args ) noexcept(/* see below */);
(constexpr desde C++20)
template< class R, class F, class... Args >
constexpr R
invoke_r( F&& f, Args&&... args ) noexcept(/* see below */);
```

1) Invoca o objeto [Callable](<#/doc/named_req/Callable>) f com os parâmetros args conforme [`_INVOKE_`](<#/doc/utility/functional>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...). Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_invocable_v](<#/doc/types/is_invocable>)<F, Args...> for true.

2) Invoca o objeto [Callable](<#/doc/named_req/Callable>) f com os parâmetros args conforme [`_INVOKE <R>_`](<#/doc/utility/functional>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...). Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, F, Args...> for true.

### Parâmetros

- **f** — Objeto [Callable](<#/doc/named_req/Callable>) a ser invocado
- **args** — Argumentos a serem passados para f

### Valor de retorno

1) O valor retornado por f.

2) O valor retornado por f, implicitamente convertido para `R`, se `R` não for (possivelmente [cv-qualificado](<#/doc/language/cv>)) void. Nenhum caso contrário.

### Exceções

1)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_invocable_v](<#/doc/types/is_invocable>)<F, Args...>)

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, F, Args...>)

### Possível implementação

[invoke (1)](<#/doc/utility/functional/invoke>)
---
```cpp
    namespace detail
    {
        template<class>
        constexpr bool is_reference_wrapper_v = false;
        template<class U>
        constexpr bool is_reference_wrapper_v<std::reference_wrapper<U>> = true;
    
        template<class T>
        using remove_cvref_t = std::remove_cv_t<std::remove_reference_t<T>>;
    
        template<class C, class Pointed, class Object, class... Args>
        constexpr decltype(auto) invoke_memptr(Pointed C::* member, Object&& object,
                                               Args&&... args)
        {
            using object_t = remove_cvref_t<Object>;
            constexpr bool is_member_function = std::is_function_v<Pointed>;
            constexpr bool is_wrapped = is_reference_wrapper_v<object_t>;
            constexpr bool is_derived_object = std::is_same_v<C, object_t>
                                            || std::is_base_of_v<C, object_t>;
    
            if constexpr (is_member_function)
            {
                if constexpr (is_derived_object)
                    return (std::forward<Object>(object) .* member)
                               (std::forward<Args>(args)...);
                else if constexpr (is_wrapped)
                    return (object.get() .* member)(std::forward<Args>(args)...);
                else
                    return ((*std::forward<Object>(object)) .* member)
                               (std::forward<Args>(args)...);
            }
            else
            {
                static_assert(std::is_object_v<Pointed> && sizeof...(args) == 0);
                if constexpr (is_derived_object)
                    return std::forward<Object>(object) .* member;
                else if constexpr (is_wrapped)
                    return object.get() .* member;
                else
                    return (*std::forward<Object>(object)) .* member;
            }
        }
    } // namespace detail
    
    template<class F, class... Args>
    constexpr std::invoke_result_t<F, Args...> invoke(F&& f, Args&&... args)
        noexcept(std::is_nothrow_invocable_v<F, Args...>)
    {
        if constexpr (std::is_member_pointer_v<detail::remove_cvref_t<F>>)
            return detail::invoke_memptr(f, std::forward<Args>(args)...);
        else
            return std::forward<F>(f)(std::forward<Args>(args)...);
    }
```

[invoke_r (2)](<#/doc/utility/functional/invoke>)
```cpp
    template<class R, class F, class... Args>
        requires std::is_invocable_r_v<R, F, Args...>
    constexpr R invoke_r(F&& f, Args&&... args)
        noexcept(std::is_nothrow_invocable_r_v<R, F, Args...>)
    {
        if constexpr (std::is_void_v<R>)
            std::invoke(std::forward<F>(f), std::forward<Args>(args)...);
        else
            return std::invoke(std::forward<F>(f), std::forward<Args>(args)...);
    }
```

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_invoke`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | `std::invoke`, ([1](<#/doc/utility/functional/invoke>))
[`__cpp_lib_invoke_r`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | `std::invoke_r`, ([2](<#/doc/utility/functional/invoke>))

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <type_traits>
    
    struct Foo
    {
        Foo(int num) : num_(num) {}
        void print_add(int i) const { std::cout << num_ + i << '\n'; }
        int num_;
    };
    
    void print_num(int i)
    {
        std::cout << i << '\n';
    }
    
    struct PrintNum
    {
        void operator()(int i) const
        {
            std::cout << i << '\n';
        }
    };
    
    int main()
    {
        std::cout << "invoke a free function: ";
        std::invoke(print_num, -9);
    
        std::cout << "invoke a lambda: ";
        std::invoke({ print_num(42); });
    
        std::cout << "invoke a member function: ";
        const Foo foo(314159);
        std::invoke(&Foo::print_add, foo, 1);
    
        std::cout << "invoke (i.e., access) a data member num_: "
                  << std::invoke(&Foo::num_, foo) << '\n';
    
        std::cout << "invoke a function object: ";
        std::invoke(PrintNum(), 18);
    
    #if defined(__cpp_lib_invoke_r)
        auto add = { return x + y; };
        std::cout << "invoke a lambda converting result to float: ";
        auto ret = std::invoke_r<float>(add, 11, 22);
        static_assert(std::is_same<decltype(ret), float>());
        std::cout << std::fixed << ret << "\ninvoke print_num: ";
        std::invoke_r<void>(print_num, 44);
    #endif
    }
```

Saída possível:
```
    invoke a free function: -9
    invoke a lambda: 42
    invoke a member function: 314160
    invoke (i.e., access) a data member num_: 314159
    invoke a function object: 18
    invoke a lambda converting result to float: 33.000000
    invoke print_num: 44
```

### Veja também

[ mem_fn](<#/doc/utility/functional/mem_fn>)(C++11) | cria um objeto de função a partir de um ponteiro para um membro
(modelo de função)
[ result_ofinvoke_result](<#/doc/types/result_of>)(C++11)(removido em C++20)(C++17) | deduz o tipo de resultado da invocação de um objeto callable com um conjunto de argumentos
(modelo de classe)
[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por **std::invoke**) com os tipos de argumento fornecidos
(modelo de classe)
[ apply](<#/doc/utility/apply>)(C++17) | chama uma função com uma tupla de argumentos
(modelo de função)