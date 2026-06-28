# std::experimental::not_fn

Definido no cabeçalho `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```c
template< class F>
/*unspecified*/ not_fn( F&& f );
```

Cria um *forwarding call wrapper* que retorna o complemento do objeto *callable* que ele contém.

### Parâmetros

- **f** — o objeto a partir do qual o objeto [Callable](<#/doc/named_req/Callable>) mantido pelo *wrapper* é construído

### Valor de retorno

Seja `FD` [std::decay_t](<#/doc/types/decay>)&lt;F&gt; e `fd` um *lvalue* do tipo `FD` construído a partir de [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f).

`not_fn` retorna um *forwarding call wrapper* `fn` de tipo não especificado tal que fn(a1, a2, ..., aN) é equivalente a !INVOKE(fd, a1, ..., aN), onde `INVOKE` é a operação descrita em [Callable](<#/doc/named_req/Callable>).

O *call wrapper* retornado é sempre [MoveConstructible](<#/doc/named_req/MoveConstructible>), e é [CopyConstructible](<#/doc/named_req/CopyConstructible>) se FD for [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Observações

Se `fd` não for [Callable](<#/doc/named_req/Callable>), ou [std::is_constructible](<#/doc/types/is_constructible>)<FD, F>::value não for `true`, o comportamento é indefinido.

### Exceções

Não lança exceções, a menos que a construção de `fd` lance.

### Possível implementação
```cpp
    namespace detail {
        template<class F>
        struct not_fn_t {
            F f;
            template<class... Args>
            auto operator()(Args&&... args)
                noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...)))
                -> decltype(!std::invoke(f, std::forward<Args>(args)...)) {
                return !std::invoke(f, std::forward<Args>(args)...);
            }
    
            // cv-qualified overload for QoI
            template<class... Args>
            auto operator()(Args&&... args) const
                noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...)))
                -> decltype(!std::invoke(f, std::forward<Args>(args)...)) {
                return !std::invoke(f, std::forward<Args>(args)...);
            }
    
            template<class... Args>
            auto operator()(Args&&... args) volatile
                noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...)))
                -> decltype(!std::invoke(f, std::forward<Args>(args)...)) {
                return !std::invoke(f, std::forward<Args>(args)...);
            }
            template<class... Args>
            auto operator()(Args&&... args) const volatile
                noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...)))
                -> decltype(!std::invoke(f, std::forward<Args>(args)...)) {
                return !std::invoke(f, std::forward<Args>(args)...);
            }
        };
    }
    
    template<class F>
    detail::not_fn_t<std::decay_t<F>> not_fn(F&& f) { return { std::forward<F>(f) }; }
```

---

### Notas

`not_fn` destina-se a substituir os negadores da era C++03 [std::not1](<#/doc/utility/functional/not1>) e [std::not2](<#/doc/utility/functional/not2>).

### Veja também

[ not_fn](<#/doc/utility/functional/not_fn>)(C++17) | cria um objeto de função que retorna o complemento do resultado do objeto de função que ele contém
(modelo de função)