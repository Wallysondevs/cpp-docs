# std::bind_front, std::bind_back

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
`std::bind_front`
template< class F, class... Args >
constexpr /* unspecified */ bind_front( F&& f, Args&&... args );
template< auto ConstFn, class... Args >
constexpr /* unspecified */ bind_front( Args&&... args );
`std::bind_back`
template< class F, class... Args >
constexpr /* unspecified */ bind_back( F&& f, Args&&... args );
template< auto ConstFn, class... Args >
constexpr /* unspecified */ bind_back( Args&&... args );
```

Os function templates `std::bind_front` e `std::bind_back` geram um *call wrapper* de *perfect forwarding* que permite invocar o alvo *callable* com seus (1,2) primeiros ou (3,4) últimos parâmetros `sizeof...(Args)` vinculados a `args`.

1,3) O *call wrapper* mantém uma cópia do objeto *callable* alvo `f`.

2,4) O *call wrapper* não mantém um alvo *callable* (ele é determinado estaticamente).

1) `std::bind_front(f, bound_args...)(call_args...)` é [expression-equivalent](<#/doc/language/expressions>) a

`[std::invoke](<#/doc/utility/functional/invoke>)(f, bound_args..., call_args...)`.

2) `std::bind_front<ConstFn>(bound_args...)(call_args...)` é [expression-equivalent](<#/doc/language/expressions>) a

`[std::invoke](<#/doc/utility/functional/invoke>)(ConstFn, bound_args..., call_args...)`.

3) `std::bind_back(f, bound_args...)(call_args...)` é [expression-equivalent](<#/doc/language/expressions>) a

`[std::invoke](<#/doc/utility/functional/invoke>)(f, call_args..., bound_args...)`.

4) `std::bind_back<ConstFn>(bound_args...)(call_args...)` é [expression-equivalent](<#/doc/language/expressions>) a

`[std::invoke](<#/doc/utility/functional/invoke>)(ConstFn, call_args..., bound_args...)`.

As seguintes condições devem ser verdadeiras, caso contrário o programa é malformado:

*   (1,3) `[std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)<F>, F>`,
*   (1,3) `[std::is_move_constructible_v](<#/doc/types/is_move_constructible>)<[std::decay_t](<#/doc/types/decay>)<F>>`,
*   (2,4) Se `decltype(ConstFn)` é um ponteiro ou um ponteiro para membro, então `ConstFn` não é um ponteiro nulo,
*   (`[std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)<Args>, Args>` && ...),
*   (`[std::is_move_constructible_v](<#/doc/types/is_move_constructible>)<[std::decay_t](<#/doc/types/decay>)<Args>>` && ...).

### Parâmetros

- **f** — Objeto *callable* (objeto de função, ponteiro para função, referência para função, ponteiro para função membro, ou ponteiro para membro de dados) que será vinculado a alguns argumentos
- **args** — lista dos argumentos a serem vinculados aos ([1,2](<#/doc/utility/functional/bind_front>)) primeiros ou ([3,4](<#/doc/utility/functional/bind_front>)) últimos parâmetros `sizeof...(Args)` do alvo *callable*
Requisitos de tipo
-`[std::decay_t](<#/doc/types/decay>)<F>` deve satisfazer os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>).
-`[std::decay_t](<#/doc/types/decay>)<Args>...` deve satisfazer os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>).
-`decltype(ConstFn)` deve satisfazer os requisitos de [Callable](<#/doc/named_req/Callable>).

### Valor de retorno

Um objeto de função (o *call wrapper*) do tipo `T` que é não especificado, exceto que os tipos de objetos retornados por duas chamadas a `std::bind_front` ou `std::bind_back` com os mesmos argumentos são os mesmos.

Seja `_bind-partial_` `std::bind_front` ou `std::bind_back`.

O objeto retornado possui as seguintes propriedades:

## _tipo de retorno de _bind-partial_

#### Objetos membro

O objeto retornado se comporta como se contivesse:

1,3) Um objeto membro `fd` do tipo `[std::decay_t](<#/doc/types/decay>)<F>` inicializado diretamente sem lista a partir de `[std::forward](<#/doc/utility/forward>)<F>(f)`, e

1-4) Um objeto `[std::tuple](<#/doc/utility/tuple>)` `tup` construído com `[std::tuple](<../tuple.tuple>)<[std::decay_t](<#/doc/types/decay>)<Args>...>([std::forward](<#/doc/utility/forward>)<Args>(args)...)`, exceto que o comportamento de atribuição do objeto retornado é não especificado e os nomes são apenas para exposição.

#### Construtores

O tipo de retorno de `_bind-partial_` se comporta como se seus construtores de cópia/movimento realizassem uma cópia/movimento membro a membro. Ele é [CopyConstructible](<#/doc/named_req/CopyConstructible>) se todos os seus objetos membro (especificados acima) são CopyConstructible, e é [MoveConstructible](<#/doc/named_req/MoveConstructible>) caso contrário.

#### Função membro `operator()`

Dado um objeto `G` obtido de uma chamada anterior a ([1,3](<#/doc/utility/functional/bind_front>)) `_bind-partial_(f, args...)` ou ([2,4](<#/doc/utility/functional/bind_front>)) `_bind-partial_ <ConstFn>(args...)`, quando um *glvalue* `g` designando `G` é invocado em uma expressão de chamada de função `g(call_args...)`, uma invocação do objeto armazenado ocorre, como se por:

1) `[std::invoke](<#/doc/utility/functional/invoke>)(g.fd, std::get<Ns>(g.tup)..., call_args...)`, quando `_bind-partial_` é `std::bind_front`,

2) `[std::invoke](<#/doc/utility/functional/invoke>)(ConstFn, std::get<Ns>(g.tup)..., call_args...)`, quando `_bind-partial_` é `std::bind_front`,

3) `[std::invoke](<#/doc/utility/functional/invoke>)(g.fd, call_args..., std::get<Ns>(g.tup)...)`, quando `_bind-partial_` é `std::bind_back`,

4) `[std::invoke](<#/doc/utility/functional/invoke>)(ConstFn, call_args..., std::get<Ns>(g.tup)...)`, quando `_bind-partial_` é `std::bind_back`,

onde

*   `Ns` é um *integer pack* `0, 1, ..., (sizeof...(Args) - 1)`,
*   `g` é um *lvalue* na expressão `[std::invoke](<#/doc/utility/functional/invoke>)` se for um *lvalue* na expressão de chamada, e é um *rvalue* caso contrário. Assim, `std::move(g)(call_args...)` pode mover os argumentos vinculados para a chamada, onde `g(call_args...)` faria uma cópia.

O programa é malformado se `g` tiver um tipo qualificado como `volatile`.

O membro `operator()` é [`noexcept`](<#/doc/language/noexcept>) se a expressão `[std::invoke](<#/doc/utility/functional/invoke>)` que ele chama for `noexcept` (em outras palavras, ele preserva a especificação de exceção do operador de chamada subjacente).

### Exceções

1,3) Lança qualquer exceção lançada ao chamar o construtor do objeto de função armazenado.

1-4) Lança qualquer exceção lançada ao chamar o construtor de qualquer um dos argumentos vinculados.

### Notas

Esses *function templates* são destinados a substituir `[std::bind](<#/doc/utility/functional/bind>)`. Ao contrário de `std::bind`, eles não suportam o rearranjo arbitrário de argumentos e não possuem tratamento especial para expressões de *bind* aninhadas ou `[std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)`s. Por outro lado, eles prestam atenção à categoria de valor do objeto *call wrapper* e propagam a especificação de exceção do operador de chamada subjacente.

Conforme descrito em `[std::invoke](<#/doc/utility/functional/invoke>)`, ao invocar um ponteiro para função membro não estática ou ponteiro para membro de dados não estático, o primeiro argumento deve ser uma referência ou ponteiro (incluindo, possivelmente, *smart pointers* como `[std::shared_ptr](<#/doc/memory/shared_ptr>)` e `[std::unique_ptr](<#/doc/memory/unique_ptr>)`) para um objeto cujo membro será acessado.

Os argumentos para `std::bind_front` ou `std::bind_back` são copiados ou movidos, e nunca são passados por referência, a menos que sejam envolvidos em `[std::ref](<#/doc/utility/functional/ref>)` ou `[std::cref](<#/doc/utility/functional/ref>)`.

Tipicamente, vincular argumentos a uma função ou função membro usando ([1](<#/doc/utility/functional/bind_front>)) `std::bind_front` e ([3](<#/doc/utility/functional/bind_front>)) `std::bind_back` requer armazenar um ponteiro de função junto com os argumentos, mesmo que a linguagem saiba precisamente qual função chamar sem a necessidade de desreferenciar o ponteiro. Para garantir "custo zero" nesses casos, C++26 introduz as versões ([2,4](<#/doc/utility/functional/bind_front>)) (que aceitam o objeto *callable* como um argumento para [parâmetro de template não-tipo](<#/doc/language/template_parameters>)).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_bind_front`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::bind_front`, ([1](<#/doc/utility/functional/bind_front>))
[`202306L`](<#/>) | (C++26) | Permite passar objetos *callable* como argumentos de *template* não-tipo para `std::bind_front`, ([2](<#/doc/utility/functional/bind_front>))
[`__cpp_lib_bind_back`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::bind_back`, ([3](<#/doc/utility/functional/bind_front>))
[`202306L`](<#/>) | (C++26) | Permite passar objetos *callable* como argumentos de *template* não-tipo para `std::bind_back`, ([4](<#/doc/utility/functional/bind_front>))

### Possível implementação

[(2) bind_front](<#/doc/utility/functional/bind_front>)
```cpp
    namespace detail
    {
        template<class T, class U>
        struct copy_const
            : std::conditional<std::is_const_v<T>, U const, U> {};
    
        template<class T, class U,
                 class X = typename copy_const<std::remove_reference_t<T>, U>::type>
        struct copy_value_category
            : std::conditional<std::is_lvalue_reference_v<T&&>, X&, X&&> {};
    
        template <class T, class U>
        struct type_forward_like
            : copy_value_category<T, std::remove_reference_t<U>> {};
    
        template <class T, class U>
        using type_forward_like_t = typename type_forward_like<T, U>::type;
    }
    
    template<auto ConstFn, class... Args>
    constexpr auto bind_front(Args&&... args)
    {
        using F = decltype(ConstFn);
    
        if constexpr (std::is_pointer_v<F> or std::is_member_pointer_v<F>)
            static_assert(ConstFn != nullptr);
    
        return
            [... bound_args(std::forward<Args>(args))]<class Self, class... T>
            (
                this Self&&, T&&... call_args
            )
            noexcept
            (
                std::is_nothrow_invocable_v<F,
                    detail::type_forward_like_t<Self, std::decay_t<Args>>..., T...>
            )
            -> std::invoke_result_t<F,
                    detail::type_forward_like_t<Self, std::decay_t<Args>>..., T...>
            {
                return std::invoke(ConstFn, std::forward_like<Self>(bound_args)...,
                                   std::forward<T>(call_args)...);
            };
    }
```

[(4) bind_back](<#/doc/utility/functional/bind_front>)
```cpp
    namespace detail { /* é o mesmo que acima */ }
    
    template<auto ConstFn, class... Args>
    constexpr auto bind_back(Args&&... args)
    {
        using F = decltype(ConstFn);
    
        if constexpr (std::is_pointer_v<F> or std::is_member_pointer_v<F>)
            static_assert(ConstFn != nullptr);
    
        return
            [... bound_args(std::forward<Args>(args))]<class Self, class... T>
            (
                this Self&&, T&&... call_args
            )
            noexcept
            (
                std::is_nothrow_invocable_v<F,
                    detail::type_forward_like_t<Self, T..., std::decay_t<Args>>...>
            )
            -> std::invoke_result_t<F,
                    detail::type_forward_like_t<Self, T..., std::decay_t<Args>>...>
            {
                return std::invoke(ConstFn, std::forward<T>(call_args)...,
                                   std::forward_like<Self>(bound_args)...);
            };
    }
```

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <functional>
    
    int minus(int a, int b)
    {
        return a - b;
    }
    
    struct S
    {
        int val;
        int minus(int arg) const noexcept { return val - arg; }
    };
    
    int main()
    {
        auto fifty_minus = std::bind_front(minus, 50);
        assert(fifty_minus(3) == 47); // equivalente a: minus(50, 3) == 47
    
        auto member_minus = std::bind_front(&S::minus, S{50});
        assert(member_minus(3) == 47); //: S tmp{50}; tmp.minus(3) == 47
    
        // A especificação noexcept é preservada:
        static_assert(!noexcept(fifty_minus(3)));
        static_assert(noexcept(member_minus(3)));
    
        // Vinculação de uma lambda:
        auto plus =  { return a + b; };
        auto forty_plus = std::bind_front(plus, 40);
        assert(forty_plus(7) == 47); // equivalente a: plus(40, 7) == 47
    
    #if __cpp_lib_bind_front >= 202306L
        auto fifty_minus_cpp26 = std::bind_front<minus>(50);
        assert(fifty_minus_cpp26(3) == 47);
    
        auto member_minus_cpp26 = std::bind_front<&S::minus>(S{50});
        assert(member_minus_cpp26(3) == 47);
    
        auto forty_plus_cpp26 = std::bind_front<plus>(40);
        assert(forty_plus(7) == 47);
    #endif
    
    #if __cpp_lib_bind_back >= 202202L
        auto madd =  { return a * b + c; };
        auto mul_plus_seven = std::bind_back(madd, 7);
        assert(mul_plus_seven(4, 10) == 47); //: madd(4, 10, 7) == 47
    #endif
    
    #if __cpp_lib_bind_back >= 202306L
        auto mul_plus_seven_cpp26 = std::bind_back<madd>(7);
        assert(mul_plus_seven_cpp26(4, 10) == 47);
    #endif
    }
```

### Referências

*   Padrão C++26 (ISO/IEC 14882:2026):

    *   TBD Function templates bind_front and bind_back [func.bind.partial]

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   22.10.14 Function templates bind_front and bind_back [func.bind.partial]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   20.14.14 Function template bind_front [func.bind.front]

### Veja também

[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(function template)
[ mem_fn](<#/doc/utility/functional/mem_fn>)(C++11) | cria um objeto de função a partir de um ponteiro para um membro
(function template)