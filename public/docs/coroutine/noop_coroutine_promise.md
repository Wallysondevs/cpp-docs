# std::noop_coroutine_promise

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
struct noop_coroutine_promise {};
```

`noop_coroutine_promise` é o tipo promise de corrotinas no-op.

Uma corrotina no-op se comporta como se ela

  * não fizesse nada além do fluxo de controle de uma corrotina, e
  * fosse suspensa imediatamente após o início e a retomada, e
  * tivesse um estado de corrotina tal que destruir o estado é uma operação no-op, e
  * nunca alcançasse seu ponto de suspensão final se houver qualquer [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>) referindo-se a ela.

| Esta seção está incompleta
Razão: redação mais precisa

Corrotinas no-op podem ser iniciadas por [std::noop_coroutine](<#/doc/coroutine/noop_coroutine>), e controladas pelo coroutine handle que ela retorna. O coroutine handle retornado é do tipo [std::noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>), que é um sinônimo para [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<std::noop_coroutine_promise>.

Algumas operações de corrotinas no-op são determinadas como no-op em tempo de compilação através do tipo `std::noop_coroutine_handle`.

| Esta seção está incompleta
Razão: uso de corrotinas no-op

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ noop_coroutine](<#/doc/coroutine/noop_coroutine>)(C++20) | cria um coroutine handle que não tem efeitos observáveis quando retomado ou destruído
(função)
[ noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>)(C++20) | [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<std::noop_coroutine_promise>, destinado a referir-se a uma corrotina no-op
(typedef)