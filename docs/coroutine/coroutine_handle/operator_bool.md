# std::coroutine_handle&lt;Promise&gt;::operator bool

```cpp
constexpr explicit operator bool() const noexcept;  // (desde C++20)
```

Verifica se `*this` não é nulo, ou seja, o valor de `*this` é obtido do objeto promise de alguma coroutine. Equivalente a `return bool(address());`.

Se `Promise` for [std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>), esta função de conversão sempre retorna `true`.

### Parâmetros

(nenhum)

### Valor de retorno

`bool(address())`, ou `true` se `Promise` for [std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>).

### Veja também

[ address](<#/doc/coroutine/coroutine_handle/address>) | exporta o endereço subjacente, ou seja, o ponteiro que suporta a coroutine
(função membro pública)