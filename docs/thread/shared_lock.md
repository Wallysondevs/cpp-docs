# std::shared_lock

Definido no cabeçalho `[<shared_mutex>](<#/doc/header/shared_mutex>)`

```c
template< class Mutex >
class shared_lock;
```

A classe `shared_lock` é um wrapper de propriedade de mutex compartilhado de propósito geral que permite travamento adiado, travamento temporizado e transferência de propriedade de travamento. Travar um `shared_lock` trava o mutex compartilhado associado no modo compartilhado (para travá-lo no modo exclusivo, [std::unique_lock](<#/doc/thread/unique_lock>) pode ser usado).

A classe `shared_lock` é movível, mas não copiável – ela atende aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>), mas não de [CopyConstructible](<#/doc/named_req/CopyConstructible>) ou [CopyAssignable](<#/doc/named_req/CopyAssignable>).

`shared_lock` atende aos requisitos [Lockable](<#/doc/named_req/Lockable>). Se `Mutex` atende aos requisitos [SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>), `shared_lock` também atende aos requisitos [TimedLockable](<#/doc/named_req/TimedLockable>).

Para esperar em um mutex compartilhado no modo de propriedade compartilhada, [std::condition_variable_any](<#/doc/thread/condition_variable_any>) pode ser usado ([std::condition_variable](<#/doc/thread/condition_variable>) requer [std::unique_lock](<#/doc/thread/unique_lock>) e, portanto, só pode esperar no modo de propriedade única).

### Parâmetros de template

- **Mutex** — o tipo do mutex compartilhado a ser travado. O tipo deve atender aos requisitos [SharedLockable](<#/doc/named_req/SharedLockable>)

### Tipos de membro

Tipo | Definição
---|---
`mutex_type` | `Mutex`

### Funções membro

[ (construtor)](<#/doc/thread/shared_lock/shared_lock>) | constrói um `shared_lock`, opcionalmente travando o mutex fornecido
(função membro pública)
[ (destrutor)](<#/doc/thread/shared_lock/~shared_lock>) | destrava o mutex associado
(função membro pública)
[ operator=](<#/>) | destrava o mutex, se possuído, e adquire a propriedade de outro
(função membro pública)

##### Travamento compartilhado

[ lock](<#/doc/thread/shared_lock/lock>) | trava o mutex associado
(função membro pública)
[ try_lock](<#/doc/thread/shared_lock/try_lock>) | tenta travar o mutex associado
(função membro pública)
[ try_lock_for](<#/doc/thread/shared_lock/try_lock_for>) | tenta travar o mutex associado, pela duração especificada
(função membro pública)
[ try_lock_until](<#/doc/thread/shared_lock/try_lock_until>) | tenta travar o mutex associado, até um ponto no tempo especificado
(função membro pública)
[ unlock](<#/doc/thread/shared_lock/unlock>) | destrava o mutex associado
(função membro pública)

##### Modificadores

[ swap](<#/doc/thread/shared_lock/swap>) | troca os membros de dados com outro `shared_lock`
(função membro pública)
[ release](<#/doc/thread/shared_lock/release>) | desassocia o mutex sem destravá-lo
(função membro pública)

##### Observadores

[ mutex](<#/doc/thread/shared_lock/mutex>) | retorna um ponteiro para o mutex associado
(função membro pública)
[ owns_lock](<#/doc/thread/shared_lock/owns_lock>) | testa se o lock possui seu mutex associado
(função membro pública)
[ operator bool](<#/doc/thread/shared_lock/operator_bool>) | testa se o lock possui seu mutex associado
(função membro pública)

### Funções não-membro

[ std::swap(std::shared_lock)](<#/doc/thread/shared_lock/swap2>)(C++14) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2981](<https://cplusplus.github.io/LWG/issue2981>) | C++17 | um guia de dedução redundante de `shared_lock<Mutex>` foi fornecido | removido