# std::coroutine_handle&lt;Promise&gt;::done

```cpp
Membro de outras especializações
bool done() const;  // (1) (desde C++20)
Membro da especialização `std::coroutine_handle<std::noop_coroutine_promise>`
constexpr bool done() const noexcept;  // (2) (desde C++20)
```

Verifica se uma coroutine suspensa está suspensa em seu ponto de suspensão final.

1) Retorna true se a coroutine à qual *this se refere está suspensa em seu ponto de suspensão final, ou false se a coroutine está suspensa em outros pontos de suspensão. O comportamento é indefinido se *this não se refere a uma coroutine suspensa.

2) Sempre retorna false.

### Parâmetros

(nenhum)

### Valor de retorno

1) true se a coroutine está suspensa em seu ponto de suspensão final, false se a coroutine está suspensa em outros pontos de suspensão.

2) false

### Observações

Uma coroutine no-op nunca é considerada suspensa em seu ponto de suspensão final.

Uma coroutine com objeto promise p é considerada suspensa em seu ponto de suspensão final somente se, sendo e o resultado de p.final_suspend(), e.await_ready() retornar false. Em particular, se p.final_suspend() retornar [`std::suspend_never`](<#/doc/coroutine/suspend_never>), então done() nunca retorna true.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo