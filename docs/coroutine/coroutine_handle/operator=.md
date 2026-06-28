# std::coroutine_handle&lt;Promise&gt;::operator=

```cpp
coroutine_handle& operator=( std::nullptr_t ) noexcept;  // (1) (desde C++20)
coroutine_handle& operator=( const coroutine_handle& other ) = default;  // (2) (desde C++20)
coroutine_handle& operator=( coroutine_handle&& other ) = default;  // (3) (desde C++20)
```

Substitui o endereço subjacente.

1) Substitui o endereço subjacente por um valor de ponteiro nulo. Após a atribuição, *this não se refere a uma coroutine. Este operador de atribuição não é declarado para a especialização [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>.

2,3) Substitui o endereço subjacente pelo de other. Os operadores de atribuição de cópia e de movimento são equivalentes aos declarados implicitamente.

### Parâmetros

- **other** — outra `coroutine_handle` da qual atribuir

### Valor de retorno

*this