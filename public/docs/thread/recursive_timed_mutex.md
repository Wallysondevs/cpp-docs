# std::recursive_timed_mutex

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
class recursive_timed_mutex;
```

A classe `recursive_timed_mutex` é uma primitiva de sincronização que pode ser usada para proteger dados compartilhados de serem acessados simultaneamente por múltiplas threads.

De maneira similar a [std::recursive_mutex](<#/doc/thread/recursive_mutex>), `recursive_timed_mutex` fornece semânticas de propriedade exclusiva e recursiva. Além disso, `recursive_timed_mutex` oferece a capacidade de tentar reivindicar a propriedade de um `recursive_timed_mutex` com um tempo limite através das funções membro [`try_lock_for`](<#/doc/thread/recursive_timed_mutex/try_lock_for>) e [`try_lock_until`](<#/doc/thread/recursive_timed_mutex/try_lock_until>).

A classe `recursive_timed_mutex` satisfaz todos os requisitos de [TimedMutex](<#/doc/named_req/TimedMutex>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Tipos de Membro

Tipo de Membro | Definição
---|---
`native_handle_type` (opcional*) | definido pela implementação

### Funções Membro

[ (construtor)](<#/doc/thread/recursive_timed_mutex/recursive_timed_mutex>) | constrói o mutex
(função membro pública)
[ (destrutor)](<#/doc/thread/recursive_timed_mutex/~recursive_timed_mutex>) | destrói o mutex
(função membro pública)
operator=[deleted] | não copiável por atribuição
(função membro pública)

##### Bloqueio

[ lock](<#/doc/thread/recursive_timed_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível
(função membro pública)
[ try_lock](<#/doc/thread/recursive_timed_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[ try_lock_for](<#/doc/thread/recursive_timed_mutex/try_lock_for>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível pela duração de tempo limite especificada
(função membro pública)
[ try_lock_until](<#/doc/thread/recursive_timed_mutex/try_lock_until>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)
[ unlock](<#/doc/thread/recursive_timed_mutex/unlock>) | desbloqueia o mutex
(função membro pública)

##### Handle nativo

[ native_handle](<#/doc/thread/recursive_timed_mutex/native_handle>) | retorna o objeto handle nativo subjacente definido pela implementação
(função membro pública)