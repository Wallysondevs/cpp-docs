# std::coroutine_handle&lt;Promise&gt;::destroy

```cpp
Membro de outras especializações
void destroy() const;  // (1) (desde C++20)
Membro da especialização `std::coroutine_handle<std::noop_coroutine_promise>`
constexpr void destroy() const noexcept;  // (2) (desde C++20)
```

1) Destrói o estado da coroutine à qual *this se refere, ou não faz nada se a coroutine for uma no-op coroutine.

2) Não faz nada.

O comportamento é indefinido se a destruição for necessária e *this não se referir a uma coroutine suspensa.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator()resume](<#/doc/coroutine/coroutine_handle/resume>) | retoma a execução da coroutine
(função membro pública)