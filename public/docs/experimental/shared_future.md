# std::experimental::shared_future

Definido no cabeçalho `[<experimental/shared_future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/shared_future&action=edit&redlink=1> "cpp/header/experimental/shared future \(page does not exist\)")`

```c
template< class T > class shared_future;
template< class T > class shared_future<T&>;
template<> class shared_future<void>;
```

O template de classe `std::experimental::shared_future` estende [std::shared_future](<#/doc/thread/shared_future>) com as seguintes operações:

*   um *construtor de unwrapping* de `future<shared_future<T>>`;
*   uma função membro `is_ready` para consultar se o estado compartilhado associado está pronto; e
*   uma função membro `then` para anexar uma continuação ao future.

Não há interoperabilidade entre `std::experimental::shared_future` e [std::shared_future](<#/doc/thread/shared_future>).

### Funções membro

[ (construtor)](<#/doc/experimental/shared_future/shared_future>) | constrói um `shared_future`
(função membro pública)
[ is_ready](<#/doc/experimental/shared_future/is_ready>) | verifica se o estado compartilhado está pronto
(função membro pública)
[ then](<#/doc/experimental/shared_future/then>) | anexa uma continuação a um `shared_future`
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)

## Membros idênticos a std::shared_future

### Funções membro

[ (destrutor)](<#/doc/thread/shared_future/~shared_future>) | destrói o objeto future
(função membro pública de `std::shared_future<T>`)

##### Obtendo o resultado

[ get](<#/doc/thread/shared_future/get>) | retorna o resultado
(função membro pública de `std::shared_future<T>`)

##### Estado

[ valid](<#/doc/thread/shared_future/valid>) | verifica se o future possui um estado compartilhado
(função membro pública de `std::shared_future<T>`)
[ wait](<#/doc/thread/shared_future/wait>) | espera que o resultado se torne disponível
(função membro pública de `std::shared_future<T>`)
[ wait_for](<#/doc/thread/shared_future/wait_for>) | espera pelo resultado, retorna se não estiver disponível pela duração de timeout especificada
(função membro pública de `std::shared_future<T>`)
[ wait_until](<#/doc/thread/shared_future/wait_until>) | espera pelo resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública de `std::shared_future<T>`)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ future](<#/doc/experimental/future>)(concurrency TS) | uma versão de [std::future](<#/doc/thread/future>) aprimorada com continuações e outras funcionalidades
(template de classe)