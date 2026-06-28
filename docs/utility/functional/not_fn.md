# std::not_fn

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class F >
/* unspecified */ not_fn( F&& f );
(constexpr desde C++20)
template< auto ConstFn >
constexpr /* unspecified */ not_fn() noexcept;
```

1) Cria um wrapper de chamada de encaminhamento que retorna a negação do objeto invocável que ele contém.

2) Cria um wrapper de chamada de encaminhamento que retorna a negação do alvo invocável determinado estaticamente. O programa é malformado se `ConstFn` for um ponteiro nulo ou um ponteiro-para-membro nulo.

### Parâmetros

- **f** — o objeto a partir do qual o objeto [Callable](<#/doc/named_req/Callable>) contido pelo wrapper é construído
Requisitos de tipo
-`[std::decay_t](<#/doc/types/decay>)<F>` deve atender aos requisitos de [Callable](<#/doc/named_req/Callable>) e [MoveConstructible](<#/doc/named_req/MoveConstructible>).
-[std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, F> é exigido que seja verdadeiro.

### Valor de retorno

1) Um objeto de função de tipo `T` não especificado. Ele possui os seguintes membros.

## std::not_fn _tipo de retorno_

#### Objetos membro

O tipo de retorno de `std::not_fn` contém um objeto membro do tipo [std::decay_t](<#/doc/types/decay>)&lt;F&gt;.

#### Construtores

```cpp
explicit T( F&& f );  // (1) (desde C++17)
(constexpr desde C++20)
(apenas para exposição*)
T( T&& f ) = default;
T( const T& f ) = default;  // (2) (desde C++17)
```

1) O construtor inicializa diretamente (não por lista) o objeto membro (do tipo [std::decay_t](<#/doc/types/decay>)&lt;F&gt;) a partir de [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f). Lança qualquer exceção lançada pelo construtor selecionado.

2) Como [std::decay_t](<#/doc/types/decay>)&lt;F&gt; é exigido que seja [MoveConstructible](<#/doc/named_req/MoveConstructible>), o wrapper de chamada retornado é sempre [MoveConstructible](<#/doc/named_req/MoveConstructible>), e é [CopyConstructible](<#/doc/named_req/CopyConstructible>) se [std::decay_t](<#/doc/types/decay>)&lt;F&gt; for [CopyConstructible](<#/doc/named_req/CopyConstructible>). As definições explicitamente padronizadas tornam o tipo de retorno não atribuível. | (até C++20)
---|---
É não especificado se esses construtores são explicitamente padronizados e se o tipo de retorno é atribuível. | (desde C++20)

#### Função membro operator()

```cpp
  // (1)
template< class... Args >
auto operator()( Args&&... args ) &
-> decltype(!std::declval<
std::invoke_result_t<std::decay_t<F>&, Args...>>());
template< class... Args >
auto operator()( Args&&... args ) const&
-> decltype(!std::declval<
std::invoke_result_t<std::decay_t<F> const&, Args...>>());  // (desde C++17)
(até C++20)
template< class... Args >
constexpr auto operator()( Args&&... args ) &
noexcept(/* see below */)
-> decltype(!std::invoke(
std::declval<std::decay_t<F>&>(), std::declval<Args>()...));
template< class... Args >
constexpr auto operator()( Args&&... args ) const&
noexcept(/* see below */)
-> decltype(!std::invoke(
std::declval<std::decay_t<F> const&>(), std::declval<Args>()...));  // (desde C++20)
  // (2)
template< class... Args >
auto operator()( Args&&... args ) &&
-> decltype(!std::declval<
std::invoke_result_t<std::decay_t<F>, Args...>>());
template< class... Args >
auto operator()( Args&&... args ) const&&
-> decltype(!std::declval<
std::invoke_result_t<std::decay_t<F> const, Args...>>());  // (desde C++17)
(até C++20)
template< class... Args >
constexpr auto operator()( Args&&... args ) &&
noexcept(/* see below */)
-> decltype(!std::invoke(
std::declval<std::decay_t<F>>(), std::declval<Args>()...));
template< class... Args >
constexpr auto operator()( Args&&... args ) const&&
noexcept(/* see below */)
-> decltype(!std::invoke(
std::declval<std::decay_t<F> const>(), std::declval<Args>()...));  // (desde C++20)
```

Seja fd o objeto membro do tipo [std::decay_t](<#/doc/types/decay>)&lt;F&gt;.

1) Equivalente a return ![std::invoke](<#/doc/utility/functional/invoke>)(fd, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...); 2) Equivalente a return ![std::invoke](<#/doc/utility/functional/invoke>)(std::move(fd), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...); Ao invocar o resultado, se a substituição no tipo de retorno da sobrecarga de operator() originalmente selecionada falhar, [outra sobrecarga pode ser selecionada](<#/doc/language/sfinae>). | (desde C++17)
(até C++20)
1) [Expressão-equivalente](<#/doc/language/expressions>) a ![std::invoke](<#/doc/utility/functional/invoke>)(fd, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) 2) [Expressão-equivalente](<#/doc/language/expressions>) a ![std::invoke](<#/doc/utility/functional/invoke>)(std::move(fd), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) Ao invocar o resultado, se a substituição no tipo de retorno da sobrecarga de operator() originalmente selecionada falhar, a invocação é malformada, o que também pode ser uma [falha de substituição](<#/doc/language/sfinae>). | (desde C++20)

2) Um valor do seguinte tipo.

## std::not_fn _tipo de retorno sem estado_

O tipo de retorno é uma classe [CopyConstructible](<#/doc/named_req/CopyConstructible>) sem estado. É não especificado se o tipo de retorno é atribuível.

#### Função membro operator()

```cpp
template< class... Args >
constexpr auto operator()( Args&&... args ) const
noexcept(/* see below */)
-> decltype(!std::invoke(ConstFn, std::declval<Args>()...));  // (desde C++26)
```

[Expressão-equivalente](<#/doc/language/expressions>) a ![std::invoke](<#/doc/utility/functional/invoke>)(ConstFn, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

### Exceções

1) Não lança exceções, a menos que a construção de fd lance.

### Implementação possível

[(1) not_fn](<#/doc/utility/functional/not_fn>)
---
```cpp
    namespace detail
    {
        template<class V, class F, class... Args>
        constexpr bool negate_invocable_impl = false;
        template<class F, class... Args>
        constexpr bool negate_invocable_impl<std::void_t<decltype(
            !std::invoke(std::declval<F>(), std::declval<Args>()...))>, F, Args...> = true;
    
        template<class F, class... Args>
        constexpr bool negate_invocable_v = negate_invocable_impl<void, F, Args...>;
    
        template<class F>
        struct not_fn_t
        {
            F f;
    
            template<class... Args,
                std::enable_if_t<negate_invocable_v<F&, Args...>, int> = 0>
            constexpr decltype(auto) operator()(Args&&... args) &
                noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...)))
            {
                return !std::invoke(f, std::forward<Args>(args)...);
            }
    
            template<class... Args,
                std::enable_if_t<negate_invocable_v<const F&, Args...>, int> = 0>
            constexpr decltype(auto) operator()(Args&&... args) const&
                noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...)))
            {
                return !std::invoke(f, std::forward<Args>(args)...);
            }
    
            template<class... Args,
                std::enable_if_t<negate_invocable_v<F, Args...>, int> = 0>
            constexpr decltype(auto) operator()(Args&&... args) &&
                noexcept(noexcept(!std::invoke(std::move(f), std::forward<Args>(args)...)))
            {
                return !std::invoke(std::move(f), std::forward<Args>(args)...);
            }
    
            template<class... Args,
                std::enable_if_t<negate_invocable_v<const F, Args...>, int> = 0>
            constexpr decltype(auto) operator()(Args&&... args) const&&
                noexcept(noexcept(!std::invoke(std::move(f), std::forward<Args>(args)...)))
            {
                return !std::invoke(std::move(f), std::forward<Args>(args)...);
            }
    
            // Deleted overloads are needed since C++20
            // for preventing a non-equivalent but well-formed overload to be selected.
    
            template<class... Args,
                std::enable_if_t<!negate_invocable_v<F&, Args...>, int> = 0>
            void operator()(Args&&...) & = delete;
    
            template<class... Args,
                std::enable_if_t<!negate_invocable_v<const F&, Args...>, int> = 0>
            void operator()(Args&&...) const& = delete;
    
            template<class... Args,
                std::enable_if_t<!negate_invocable_v<F, Args...>, int> = 0>
            void operator()(Args&&...) && = delete;
    
            template<class... Args,
                std::enable_if_t<!negate_invocable_v<const F, Args...>, int> = 0>
            void operator()(Args&&...) const&& = delete;
        };
    }
    
    template<class F>
    constexpr detail::not_fn_t<std::decay_t<F>> not_fn(F&& f)
    {
        return {std::forward<F>(f)};
    }
```

[(2) not_fn](<#/doc/utility/functional/not_fn>)
```cpp
    namespace detail
    {
        template<auto ConstFn>
        struct stateless_not_fn
        {
            template<class... Args>
            constexpr auto operator()(Args&&... args) const
                noexcept(noexcept(!std::invoke(ConstFn, std::forward<Args>(args)...)))
                -> decltype(!std::invoke(ConstFn, std::forward<Args>(args)...))
            {
                return !std::invoke(ConstFn, std::forward<Args>(args)...);
            }
        };
    }
    
    template<auto ConstFn>
    constexpr detail::stateless_not_fn<ConstFn> not_fn() noexcept
    {
        if constexpr (std::is_pointer_v<decltype(ConstFn)> ||
                      std::is_member_pointer_v<decltype(ConstFn)>)
            static_assert(ConstFn != nullptr);
    
        return {};
    }
```

### Notas

`std::not_fn` destina-se a substituir os negadores da era C++03 [std::not1](<#/doc/utility/functional/not1>) e [std::not2](<#/doc/utility/functional/not2>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_not_fn`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | `std::not_fn()`, ([1](<#/doc/utility/functional/not_fn>))
[`202306L`](<#/>) | (C++26) | Permite passar objetos invocáveis como argumentos de template não-tipo para `std::not_fn`, ([2](<#/doc/utility/functional/not_fn>))

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <functional>
    
    bool is_same(int a, int b) noexcept
    {
        return a == b;
    }
    
    struct S
    {
        int val;
        bool is_same(int arg) const noexcept { return val == arg; }
    };
    
    int main()
    {
        // Usando com uma função livre:
        auto is_differ = std::not_fn(is_same);
        assert(is_differ(8, 8) == false); // equivalente a: !is_same(8, 8) == false
        assert(is_differ(6, 9) == true); // equivalente a: !is_same(8, 0) == true
    
        // Usando com uma função membro:
        auto member_differ = std::not_fn(&S::is_same);
        assert(member_differ(S{3}, 3) == false); //: S tmp{6}; !tmp.is_same(6) == false
    
        // A especificação noexcept é preservada:
        static_assert(noexcept(is_differ) == noexcept(is_same));
        static_assert(noexcept(member_differ) == noexcept(&S::is_same));
    
        // Usando com um objeto de função:
        auto same =  { return a == b; };
        auto differ = std::not_fn(same);
        assert(differ(1, 2) == true); //: !same(1, 2) == true
        assert(differ(2, 2) == false); //: !same(2, 2) == false
    
    #if __cpp_lib_not_fn >= 202306L
        auto is_differ_cpp26 = std::not_fn<is_same>();
        assert(is_differ_cpp26(8, 8) == false);
        assert(is_differ_cpp26(6, 9) == true);
    
        auto member_differ_cpp26 = std::not_fn<&S::is_same>();
        assert(member_differ_cpp26(S{3}, 3) == false);
    
        auto differ_cpp26 = std::not_fn<same>();
        static_assert(differ_cpp26(1, 2) == true);
        static_assert(differ_cpp26(2, 2) == false);
    #endif
    }
```

### Veja também

[ not1](<#/doc/utility/functional/not1>)(obsoleto em C++17)(removido em C++20) | constrói um objeto [std::unary_negate](<#/doc/utility/functional/unary_negate>) personalizado
(template de função)
[ not2](<#/doc/utility/functional/not2>)(obsoleto em C++17)(removido em C++20) | constrói um objeto [std::binary_negate](<#/doc/utility/functional/binary_negate>) personalizado
(template de função)