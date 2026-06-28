# std::coroutine_handle&lt;Promise&gt;::operator(), std::coroutine_handle&lt;Promise&gt;::resume

```cpp
Membro de outras especializações
void operator()() const;
void resume() const;  // (1) (desde C++20)
Membro da especialização `std::coroutine_handle<std::noop_coroutine_promise>`
constexpr void operator()() const noexcept;
constexpr void resume() const noexcept;  // (2) (desde C++20)
```

1) Retoma a execução da coroutine à qual *this se refere, ou não faz nada se a coroutine for uma coroutine no-op.

2) Não faz nada.

O comportamento é indefinido se *this não se referir a uma coroutine suspensa, ou se a coroutine não for uma coroutine no-op e estiver suspensa em seu ponto de suspensão final. Uma retomada concorrente da coroutine pode resultar em uma condição de corrida (data race).

A retomada de uma coroutine em um agente de execução diferente daquele em que foi suspensa tem comportamento definido pela implementação, a menos que cada agente de execução seja um thread representado por [std::thread](<#/doc/thread/thread>) ou [std::jthread](<#/doc/thread/jthread>), ou seja o thread executando `main`.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Se uma exceção for lançada a partir da execução da coroutine, a exceção é capturada e `unhandled_exception` é chamada no objeto promise da coroutine. Se a chamada para `unhandled_exception` lançar ou relançar uma exceção, essa exceção é propagada.

### Observações

Uma coroutine que é retomada em um agente de execução diferente deve evitar depender de uma identidade de thread consistente em toda a sua execução, como manter um objeto mutex através de um ponto de suspensão.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ destroy](<#/doc/coroutine/coroutine_handle/destroy>) | destrói uma coroutine
(função membro pública)