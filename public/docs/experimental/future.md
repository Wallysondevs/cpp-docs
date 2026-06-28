# std::experimental::future

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class T > class future;
template< class T > class future<T&>;
template<> class future<void>;
```

O template de classe `std::experimental::future` estende [std::future](<#/doc/thread/future>) com as seguintes operações:

*   um _construtor de desempacotamento_ (unwrapping constructor) de `future<future<T>>`;
*   uma função membro `is_ready` para consultar se o estado compartilhado associado está pronto; e
*   uma função membro `then` para anexar uma continuação ao future.

No entanto, não há interoperabilidade entre `std::experimental::future` e [std::future](<#/doc/thread/future>).

### Funções membro

[ (construtor)](<#/doc/experimental/future/future>) | constrói um objeto `future`
(função membro pública)
[ is_ready](<#/doc/experimental/future/is_ready>) | verifica se o estado compartilhado está pronto
(função membro pública)
[ then](<#/doc/experimental/future/then>) | anexa uma continuação a um future
(função membro pública)
[ operator=](<#/>) | move o objeto future
(função membro pública)

## Membros idênticos a std::future

### Funções membro

Note que `share()` retorna um std::experimental::shared_future&lt;T&gt;. O comportamento é idêntico em outros aspectos.

[ (destrutor)](<#/doc/thread/future/~future>) | destrói o objeto future
(função membro pública de `std::future<T>`)
[ share](<#/doc/thread/future/share>) | transfere o estado compartilhado de *this para um [`shared_future`](<#/doc/thread/shared_future>) e o retorna
(função membro pública de `std::future<T>`)

##### Obtendo o resultado

[ get](<#/doc/thread/future/get>) | retorna o resultado
(função membro pública de `std::future<T>`)

##### Estado

[ valid](<#/doc/thread/future/valid>) | verifica se o future possui um estado compartilhado
(função membro pública de `std::future<T>`)
[ wait](<#/doc/thread/future/wait>) | espera o resultado ficar disponível
(função membro pública de `std::future<T>`)
[ wait_for](<#/doc/thread/future/wait_for>) | espera pelo resultado, retorna se não estiver disponível pela duração de timeout especificada
(função membro pública de `std::future<T>`)
[ wait_until](<#/doc/thread/future/wait_until>) | espera pelo resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública de `std::future<T>`)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ shared_future](<#/doc/experimental/shared_future>)(concurrency TS) | uma versão de [std::shared_future](<#/doc/thread/shared_future>) aprimorada com continuações e outras funcionalidades
(template de classe)