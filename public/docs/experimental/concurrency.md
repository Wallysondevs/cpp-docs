# Extensões para concorrência

As Extensões C++ para Concorrência, ISO/IEC TS 19571:2016, definem os seguintes novos componentes para a biblioteca padrão C++:

### Continuações e outras extensões para std::future

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`
---
[ future](<#/doc/experimental/future>)(concurrency TS) | uma versão de [std::future](<#/doc/thread/future>) aprimorada com continuações e outras funcionalidades
(modelo de classe)
[ shared_future](<#/doc/experimental/shared_future>)(concurrency TS) | uma versão de [std::shared_future](<#/doc/thread/shared_future>) aprimorada com continuações e outras funcionalidades
(modelo de classe)
[ promise](<#/doc/experimental/concurrency/promise>)(concurrency TS) | uma versão modificada de [std::promise](<#/doc/thread/promise>) que usa `std::experimental::future`
(modelo de classe)
[ packaged_task](<#/doc/experimental/concurrency/packaged_task>)(concurrency TS) | uma versão modificada de [std::packaged_task](<#/doc/thread/packaged_task>) que usa `std::experimental::future`
(modelo de classe)
[ when_all](<#/doc/experimental/when_all>)(concurrency TS) | produz um future que se torna pronto quando todos os futures ou `shared_futures` fornecidos estão prontos
(modelo de função)
[ when_any](<#/doc/experimental/when_any>)(concurrency TS) | produz um future que se torna pronto quando pelo menos um dos futures ou `shared_futures` fornecidos está pronto
(modelo de função)
[ make_ready_future](<#/doc/experimental/make_ready_future>)(concurrency TS) | produz um future que está pronto imediatamente e contém o valor fornecido
(modelo de função)
[ make_exceptional_future](<#/doc/experimental/make_exceptional_future>)(concurrency TS) | produz um future que está pronto imediatamente e contém a exceção fornecida
(modelo de função)

### Macros de teste de funcionalidade

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`
---
__cpp_lib_experimental_future_continuations | um valor de pelo menos 201505 indica que `future::then` e outras extensões são suportadas
(macro constante)
Definido no cabeçalho `[<experimental/latch>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/latch&action=edit&redlink=1> "cpp/header/experimental/latch \(page does not exist\)")`

```cpp
__cpp_lib_experimental_latch
(macro constante)
Definido no cabeçalho `<experimental/barrier>")`
__cpp_lib_experimental_barrier
(macro constante)
Definido no cabeçalho `<experimental/atomic>")`
__cpp_lib_experimental_atomic_smart_pointers
(macro constante)
```

## Mesclado no C++20

Os seguintes componentes do Concurrency TS foram adotados no padrão C++20.

### Latches e barriers

Definido no cabeçalho `[<experimental/latch>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/latch&action=edit&redlink=1> "cpp/header/experimental/latch \(page does not exist\)")`
---
[ latch](<#/doc/experimental/latch>)(concurrency TS) | barreira de thread de uso único
(classe)
Definido no cabeçalho `[<experimental/barrier>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/barrier&action=edit&redlink=1> "cpp/header/experimental/barrier \(page does not exist\)")`

```cpp
 barrier(concurrency TS)
(classe)
 flex_barrier(concurrency TS)
(classe)
```

### Smart pointers atômicos

Esses modelos de classe substituem as [sobrecargas de função atômicas](<#/doc/memory/shared_ptr/atomic>) de `shared_ptr`

Definido no cabeçalho `[<experimental/atomic>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/atomic&action=edit&redlink=1> "cpp/header/experimental/atomic \(page does not exist\)")`
---
[ atomic_shared_ptr](<#/doc/experimental/atomic_shared_ptr>)(concurrency TS) | versão atômica de `std::shared_ptr`
(modelo de classe)
[ atomic_weak_ptr](<#/doc/experimental/atomic_weak_ptr>)(concurrency TS) | versão atômica de `std::weak_ptr`
(modelo de classe)