# std::future_status

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
enum class future_status {
ready,
timeout,
deferred
};
```

Especifica o estado de um future conforme retornado pelas funções `wait_for` e `wait_until` de [std::future](<#/doc/thread/future>) e [std::shared_future](<#/doc/thread/shared_future>).

### Constantes

Nome | Explicação
---|---
`deferred` | o estado compartilhado contém uma função adiada, então o resultado será computado apenas quando explicitamente solicitado
`ready` | o estado compartilhado está pronto
`timeout` | o estado compartilhado não ficou pronto antes que a duração de timeout especificada tivesse passado

### Veja também

[ wait_for](<#/doc/thread/future/wait_for>) | aguarda o resultado, retorna se não estiver disponível pela duração de timeout especificada
(função membro pública de `std::future<T>`)
[ wait_for](<#/doc/thread/shared_future/wait_for>) | aguarda o resultado, retorna se não estiver disponível pela duração de timeout especificada
(função membro pública de `std::shared_future<T>`)
[ wait_until](<#/doc/thread/future/wait_until>) | aguarda o resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública de `std::future<T>`)
[ wait_until](<#/doc/thread/shared_future/wait_until>) | aguarda o resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública de `std::shared_future<T>`)