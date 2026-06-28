# std::atomic_...&lt;std::shared_ptr&gt;

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
bool atomic_is_lock_free( const std::shared_ptr<T>* p );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
std::shared_ptr<T> atomic_load( const std::shared_ptr<T>* p );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
std::shared_ptr<T> atomic_load_explicit
( const std::shared_ptr<T>* p, std::memory_order mo );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
void atomic_store( std::shared_ptr<T>* p, std::shared_ptr<T> r );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
void atomic_store_explicit
( std::shared_ptr<T>* p, std::shared_ptr<T> r,
std::memory_order mo );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
std::shared_ptr<T> atomic_exchange
( std::shared_ptr<T>* p, std::shared_ptr<T> r );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
std::shared_ptr<T> atomic_exchange_explicit
( std::shared_ptr<T>* p, std::shared_ptr<T> r,
std::memory_order mo );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
bool atomic_compare_exchange_weak
( std::shared_ptr<T>* p, std::shared_ptr<T>* expected,
std::shared_ptr<T> desired );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
bool atomic_compare_exchange_strong
( std::shared_ptr<T>* p, std::shared_ptr<T>* expected,
std::shared_ptr<T> desired );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
bool atomic_compare_exchange_strong_explicit
( std::shared_ptr<T>* p, std::shared_ptr<T>* expected,
std::shared_ptr<T> desired,
std::memory_order success, std::memory_order failure );
(obsoleto desde C++20)
(removido desde C++26)
template< class T >
bool atomic_compare_exchange_weak_explicit
( std::shared_ptr<T>* p, std::shared_ptr<T>* expected,
std::shared_ptr<T> desired,
std::memory_order success, std::memory_order failure );
(obsoleto desde C++20)
(removido desde C++26)
```

Se múltiplos threads de execução acessarem o mesmo objeto [std::shared_ptr](<#/doc/memory/shared_ptr>) sem sincronização e qualquer um desses acessos usar uma função membro não-const de `shared_ptr`, então ocorrerá uma data race, a menos que todo esse acesso seja realizado através destas funções, que são sobrecargas das funções de acesso atômico correspondentes ([std::atomic_load](<#/doc/atomic/atomic_load>), [std::atomic_store](<#/doc/atomic/atomic_store>), etc.).

Note que o bloco de controle de um `shared_ptr` é thread-safe: diferentes objetos [std::shared_ptr](<#/doc/memory/shared_ptr>) podem ser acessados usando operações mutáveis, como operator= ou `reset`, simultaneamente por múltiplos threads, mesmo quando essas instâncias são cópias e compartilham o mesmo bloco de controle internamente.

1) Determina se o acesso atômico ao shared pointer apontado por p é lock-free.

2) Equivalente a atomic_load_explicit(p, [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)).

3) Retorna o shared pointer apontado por p.

Assim como com o [std::atomic_load_explicit](<#/doc/atomic/atomic_load>) não especializado, se mo for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

4) Equivalente a atomic_store_explicit(p, r, [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)).

5) Armazena o shared pointer r no shared pointer apontado por p atomicamente, [como se](<#/doc/language/as_if>) por p->swap(r).

Assim como com o [std::atomic_store_explicit](<#/doc/atomic/atomic_store>) não especializado, se mo for [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

6) Equivalente a atomic_exchange_explicit(p, r, [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)).

7) Armazena o shared pointer r no shared pointer apontado por p e retorna o valor anteriormente apontado por p, atomicamente, [como se](<#/doc/language/as_if>) por p->swap(r) e retorna uma cópia de r após a troca.

8) Equivalente a

atomic_compare_exchange_weak_explicit
(p, expected, desired, [std::memory_order_seq_cst](<#/doc/atomic/memory_order>),
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>)).

9) Equivalente a

atomic_compare_exchange_strong_explicit
(p, expected, desired, [std::memory_order_seq_cst](<#/doc/atomic/memory_order>),
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>)).

10,11) Compara os shared pointers apontados por p e expected.

  * Se eles forem equivalentes (armazenam o mesmo valor de ponteiro, e ou compartilham a propriedade do mesmo objeto ou ambos estão vazios), atribui desired a *p usando as restrições de ordenação de memória especificadas por success e retorna true.
  * Se eles não forem equivalentes, atribui *p a *expected usando as restrições de ordenação de memória especificadas por failure e retorna false.

`atomic_compare_exchange_weak_explicit` pode falhar espuriamente.

Se expected for um ponteiro nulo, ou failure for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

Se p for um ponteiro nulo, os comportamentos dessas funções são todos indefinidos.

### Parâmetros

- **p, expected** — um ponteiro para um [std::shared_ptr](<#/doc/memory/shared_ptr>)
- **r, desired** — um [std::shared_ptr](<#/doc/memory/shared_ptr>)
- **mo, success, failure** — seletores de ordenação de memória do tipo [std::memory_order](<#/doc/atomic/memory_order>)

### Exceções

Essas funções não lançam exceções.

### Valor de retorno

1) true se o acesso atômico for implementado usando instruções lock-free.

2,3) Uma cópia do shared pointer apontado.

4,5) (nenhum)

6,7) Uma cópia do shared pointer anteriormente apontado.

8-11) true se os shared pointers eram equivalentes e a troca foi realizada, false caso contrário.

### Notas

Essas funções são tipicamente implementadas usando mutexes, armazenados em uma tabela hash global onde o valor do ponteiro é usado como chave.

O [Concurrency TS](<#/doc/experimental/concurrency>) oferece classes de smart pointer atômicos `atomic_shared_ptr` e `atomic_weak_ptr` como um substituto para o uso dessas funções.

Essas funções foram obsoletas em favor das especializações do template [std::atomic](<#/doc/atomic/atomic>): [std::atomic](<#/doc/atomic/atomic>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)> e [std::atomic](<#/doc/atomic/atomic>)<[std::weak_ptr](<#/doc/memory/weak_ptr>)>. | (desde C++20)
(até C++26)
Essas funções foram removidas em favor das especializações do template [std::atomic](<#/doc/atomic/atomic>): [std::atomic](<#/doc/atomic/atomic>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)> e [std::atomic](<#/doc/atomic/atomic>)<[std::weak_ptr](<#/doc/memory/weak_ptr>)>. | (desde C++26)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2172](<https://cplusplus.github.io/LWG/issue2172>) | C++11 | expected poderia ser um ponteiro nulo | o comportamento é indefinido neste caso
[LWG 2980](<https://cplusplus.github.io/LWG/issue2980>) | C++11 | `shared_ptr`s vazios nunca eram equivalentes | equivalentes se armazenarem o mesmo valor de ponteiro

### Veja também

[ atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(C++11) | verifica se as operações do tipo atômico são lock-free
(modelo de função)
[ atomic_storeatomic_store_explicit](<#/doc/atomic/atomic_store>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico
(modelo de função)
[ atomic_loadatomic_load_explicit](<#/doc/atomic/atomic_load>)(C++11)(C++11) | obtém atomicamente o valor armazenado em um objeto atômico
(modelo de função)
[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico e retorna o valor antigo do atômico
(modelo de função)
[ atomic_compare_exchange_weakatomic_compare_exchange_weak_explicitatomic_compare_exchange_strongatomic_compare_exchange_strong_explicit](<#/doc/atomic/atomic_compare_exchange>)(C++11)(C++11)(C++11)(C++11) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se iguais ou uma carga atômica se não
(modelo de função)