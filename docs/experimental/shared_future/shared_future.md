# std::experimental::shared_future&lt;T&gt;::shared_future

```cpp
shared_future() noexcept;  // (1)
shared_future( std::experimental::shared_future<T>&& f ) noexcept;  // (2)
shared_future( const std::experimental::shared_future<T>& f );  // (3)
shared_future( std::experimental::future<std::experimental::shared_future<T>> && other ) noexcept;  // (4)
shared_future( std::experimental::future<T>&& f ) noexcept;  // (5)
```

1) Construtor padrão. Constrói um objeto `shared_future` vazio que não se refere a um estado compartilhado.

2) Constrói um objeto `shared_future`, transferindo o estado compartilhado mantido por f, se houver. Após a construção, f.valid() é false.

3) Constrói um shared future que se refere ao mesmo estado compartilhado que f, se houver.

4) Construtor de desempacotamento (unwrapping). Constrói um objeto `shared_future` a partir do estado compartilhado referido por other, se houver. Se other.valid() == false antes desta chamada, o objeto `shared_future` construído é vazio. Caso contrário, o objeto `shared_future` resultante fica pronto quando um dos seguintes ocorre:

  * other e other.get() estão ambos prontos. O valor ou exceção de other.get() é armazenado no estado compartilhado associado ao objeto `shared_future` resultante.
  * other está pronto, mas other.get() é inválido. Uma exceção do tipo [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::broken_promise](<#/doc/thread/future_errc>) é armazenada no estado compartilhado associado ao objeto `shared_future` resultante.

Após o retorno deste construtor, valid() é igual ao valor de other.valid() antes desta chamada, e other.valid() == false.

5) Constrói um objeto `shared_future`, transferindo o estado compartilhado mantido por f, se houver. Após a construção, f.valid() é false.

### Parâmetros

- **f** — outro objeto future para inicializar com
- **other** — um objeto `std::experimental::future` para desempacotar

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2697](<https://cplusplus.github.io/LWG/issue2697>) | Concurrency TS | o comportamento do construtor de desempacotamento é incerto com um `future` inválido | constrói um `future` vazio

### Veja também

[ (construtor)](<#/doc/thread/shared_future/shared_future>) | constrói o objeto future
(função membro pública de `std::shared_future<T>`)