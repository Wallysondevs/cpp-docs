# std::result_of, std::invoke_result

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class >
class result_of; // not defined
```

```cpp
template< class F, class... ArgTypes >
class result_of<F(ArgTypes...)>;  // (1) (desde C++11)
(obsoleto desde C++17)
(removido em C++20)
template< class F, class... ArgTypes >
class invoke_result;  // (2) (desde C++17)
```

Deduz o tipo de retorno de uma [expressão `_INVOKE_`](<#/doc/utility/functional>) em tempo de compilação.

`F` deve ser um tipo invocável (callable type), referência a função, ou referência a tipo invocável. Invocar `F` com `ArgTypes...` deve ser uma expressão bem formada. | (desde C++11)
(até C++14)
`F` e todos os tipos em `ArgTypes` podem ser qualquer tipo completo, array de limite desconhecido, ou `void` (possivelmente cv-qualificado). | (desde C++14)

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Tipos membros

Tipo membro | Definição
---|---
`type` | o tipo de retorno do tipo [Callable](<#/doc/named_req/Callable>) `F` se invocado com os argumentos `ArgTypes...`. Definido apenas se `F` puder ser chamado com os argumentos `ArgTypes...` em um contexto não avaliado. (desde C++14)

### Tipos auxiliares

```cpp
template< class T >
using result_of_t = typename result_of<T>::type;  // (1) (desde C++14)
(obsoleto desde C++17)
(removido em C++20)
template< class F, class... ArgTypes >
using invoke_result_t = typename invoke_result<F, ArgTypes...>::type;  // (2) (desde C++17)
```

### Possível implementação
```cpp
    namespace detail
    {
        template<class T>
        struct is_reference_wrapper : std::false_type {};
        template<class U>
        struct is_reference_wrapper<std::reference_wrapper<U>> : std::true_type {};
    
        template<class T>
        struct invoke_impl
        {
            template<class F, class... Args>
            static auto call(F&& f, Args&&... args)
                -> decltype(std::forward<F>(f)(std::forward<Args>(args)...));
        };
    
        template<class B, class MT>
        struct invoke_impl<MT B::*>
        {
            template<class T, class Td = typename std::decay<T>::type,
                class = typename std::enable_if<std::is_base_of<B, Td>::value>::type>
            static auto get(T&& t) -> T&&;
    
            template<class T, class Td = typename std::decay<T>::type,
                class = typename std::enable_if<is_reference_wrapper<Td>::value>::type>
            static auto get(T&& t) -> decltype(t.get());
    
            template<class T, class Td = typename std::decay<T>::type,
                class = typename std::enable_if<!std::is_base_of<B, Td>::value>::type,
                class = typename std::enable_if<!is_reference_wrapper<Td>::value>::type>
            static auto get(T&& t) -> decltype(*std::forward<T>(t));
    
            template<class T, class... Args, class MT1,
                class = typename std::enable_if<std::is_function<MT1>::value>::type>
            static auto call(MT1 B::*pmf, T&& t, Args&&... args)
                -> decltype((invoke_impl::get(
                    std::forward<T>(t)).*pmf)(std::forward<Args>(args)...));
    
            template<class T>
            static auto call(MT B::*pmd, T&& t)
                -> decltype(invoke_impl::get(std::forward<T>(t)).*pmd);
        };
    
        template<class F, class... Args, class Fd = typename std::decay<F>::type>
        auto INVOKE(F&& f, Args&&... args)
            -> decltype(invoke_impl<Fd>::call(std::forward<F>(f),
                std::forward<Args>(args)...));
    } // namespace detail
    
    // Implementação mínima C++11:
    template<class> struct result_of;
    template<class F, class... ArgTypes>
    struct result_of<F(ArgTypes...)>
    {
        using type = decltype(detail::INVOKE(std::declval<F>(), std::declval<ArgTypes>()...));
    };
    
    // Implementação C++14 em conformidade (também é uma implementação C++11 válida):
    namespace detail
    {
        template<typename AlwaysVoid, typename, typename...>
        struct invoke_result {};
        template<typename F, typename...Args>
        struct invoke_result<
            decltype(void(detail::INVOKE(std::declval<F>(), std::declval<Args>()...))),
                F, Args...>
        {
            using type = decltype(detail::INVOKE(std::declval<F>(), std::declval<Args>()...));
        };
    } // namespace detail
    
    template<class> struct result_of;
    template<class F, class... ArgTypes>
    struct result_of<F(ArgTypes...)> : detail::invoke_result<void, F, ArgTypes...> {};
    
    template<class F, class... ArgTypes>
    struct invoke_result : detail::invoke_result<void, F, ArgTypes...> {};
```

### Notas

Conforme formulado em C++11, o comportamento de `std::result_of` é indefinido quando `INVOKE(std::declval<F>(), std::declval<ArgTypes>()...)` é malformado (por exemplo, quando F não é um tipo invocável de forma alguma). C++14 muda isso para um [SFINAE](<#/doc/language/sfinae>) (quando F não é invocável, `std::result_of<F(ArgTypes...)>` simplesmente não possui o membro `type`).

A motivação por trás de `std::result_of` é determinar o resultado da invocação de um [Callable](<#/doc/named_req/Callable>), em particular se esse tipo de resultado é diferente para diferentes conjuntos de argumentos.

`F(Args...)` é um tipo de função onde `Args...` são os tipos dos argumentos e `F` é o tipo de retorno. Como tal, `std::result_of` sofre de várias peculiaridades que levaram à sua depreciação em favor de `std::invoke_result` em C++17:

*   `F` não pode ser um tipo de função ou um tipo de array (mas pode ser uma referência a eles);
*   se qualquer um dos `Args` tiver o tipo "array de `T`" ou um tipo de função `T`, ele é automaticamente ajustado para `T*`;
*   nem `F` nem qualquer um de `Args...` pode ser um tipo de classe abstrata;
*   se qualquer um de `Args...` tiver um cv-qualificador de nível superior, ele é descartado;
*   nenhum de `Args...` pode ser do tipo `void`.

Para evitar essas peculiaridades, `result_of` é frequentemente usado com tipos de referência como `F` e `Args...`. Por exemplo:
```cpp
    template<class F, class... Args>
    std::result_of_t<F&&(Args&&...)> // em vez de std::result_of_t<F(Args...)>, que está incorreto
        my_invoke(F&& f, Args&&... args)
        {
            /* implementation */
        }
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_result_of_sfinae`](<#/doc/feature_test>) | [`201210L`](<#/>) | (C++14) | `std::result_of` e [SFINAE](<#/doc/language/sfinae>)
[`__cpp_lib_is_invocable`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | [`std::is_invocable`](<#/doc/types/is_invocable>), `std::invoke_result`

### Exemplos

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    struct S
    {
        double operator()(char, int&);
        float operator()(int) { return 1.0; }
    };
    
    template<class T>
    typename std::result_of<T(int)>::type f(T& t)
    {
        std::cout << "overload of f for callable T\n";
        return t(0);
    }
    
    template<class T, class U>
    int f(U u)
    {
        std::cout << "overload of f for non-callable T\n";
        return u;
    }
    
    int main()
    {
        // o resultado de invocar S com argumentos char e int& é double
        std::result_of<S(char, int&)>::type d = 3.14; // d tem o tipo double
        static_assert(std::is_same<decltype(d), double>::value, "");
    
        // std::invoke_result usa sintaxe diferente (sem parênteses)
        std::invoke_result<S,char,int&>::type b = 3.14;
        static_assert(std::is_same<decltype(b), double>::value, "");
    
        // o resultado de invocar S com argumento int é float
        std::result_of<S(int)>::type x = 3.14; // x tem o tipo float
        static_assert(std::is_same<decltype(x), float>::value, "");
    
        // result_of pode ser usado com um ponteiro para função membro da seguinte forma
        struct C { double Func(char, int&); };
        std::result_of<decltype(&C::Func)(C, char, int&)>::type g = 3.14;
        static_assert(std::is_same<decltype(g), double>::value, "");
    
        f<C>(1); // pode falhar na compilação em C++11; chama a sobrecarga não-invocável em C++14
    }
```

Saída:
```
    overload of f for non-callable T
```

### Ver também

[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(modelo de função)
[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos
(modelo de classe)
[ declval](<#/doc/utility/declval>)(C++11) | obtém uma referência a um objeto do argumento de tipo do template para uso em um contexto não avaliado
(modelo de função)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão