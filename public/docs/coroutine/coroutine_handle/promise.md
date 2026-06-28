# std::coroutine_handle&lt;Promise&gt;::promise

```cpp
Membro do template primário
Promise& promise() const;  // (desde C++20)
Membro da especialização `std::coroutine_handle<std::noop_coroutine_promise>`
std::noop_coroutine_promise& promise() const noexcept;  // (desde C++20)
```

Obtém uma referência para o objeto promise.

O comportamento é indefinido se *this não se refere a uma coroutine cujo objeto promise não foi destruído.

Esta função não é fornecida para a especialização [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<>.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o objeto promise.

### Observações

O objeto promise de uma coroutine no-op não é destruído enquanto houver algum [std::noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>) referenciando a coroutine.

### Veja também

[ from_promise](<#/doc/coroutine/coroutine_handle/from_promise>)[static] | cria um `coroutine_handle` a partir do objeto promise de uma coroutine
(função membro estática pública)