# std::shared_timed_mutex

Definido no cabeçalho `[<shared_mutex>](<#/doc/header/shared_mutex>)`

```c
class shared_timed_mutex;
```

A classe `shared_timed_mutex` é uma primitiva de sincronização que pode ser usada para proteger dados compartilhados de serem acessados simultaneamente por múltiplas threads. Em contraste com outros tipos de mutex que facilitam o acesso exclusivo, um `shared_timed_mutex` possui dois níveis de acesso:

*   _exclusivo_ - apenas uma thread pode possuir o mutex.

*   _compartilhado_ - várias threads podem compartilhar a posse do mesmo mutex.

Mutexes compartilhados são geralmente usados em situações onde múltiplos leitores podem acessar o mesmo recurso ao mesmo tempo sem causar condições de corrida (data races), mas apenas um escritor pode fazê-lo.

De maneira similar a [`timed_mutex`](<#/doc/thread/timed_mutex>), `shared_timed_mutex` oferece a capacidade de tentar reivindicar a posse de um `shared_timed_mutex` com um tempo limite através das funções membro [`try_lock_for()`](<#/doc/thread/shared_timed_mutex/try_lock_for>), [`try_lock_until()`](<#/doc/thread/shared_timed_mutex/try_lock_until>), [`try_lock_shared_for()`](<#/doc/thread/shared_timed_mutex/try_lock_shared_for>), [`try_lock_shared_until()`](<#/doc/thread/shared_timed_mutex/try_lock_shared_until>).

A classe `shared_timed_mutex` satisfaz todos os requisitos de [SharedTimedMutex](<#/doc/named_req/SharedTimedMutex>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/thread/shared_timed_mutex/shared_timed_mutex>) | constrói o mutex
(função membro pública)
[ (destrutor)](<#/doc/thread/shared_timed_mutex/~shared_timed_mutex>) | destrói o mutex
(função membro pública)
operator=[deleted] | não atribuível por cópia
(função membro pública)

##### Bloqueio exclusivo

[ lock](<#/doc/thread/shared_timed_mutex/lock>) | bloqueia o mutex, aguarda se o mutex não estiver disponível
(função membro pública)
[ try_lock](<#/doc/thread/shared_timed_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[ try_lock_for](<#/doc/thread/shared_timed_mutex/try_lock_for>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível pela duração de tempo limite especificada
(função membro pública)
[ try_lock_until](<#/doc/thread/shared_timed_mutex/try_lock_until>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)
[ unlock](<#/doc/thread/shared_timed_mutex/unlock>) | desbloqueia o mutex
(função membro pública)

##### Bloqueio compartilhado

[ lock_shared](<#/doc/thread/shared_timed_mutex/lock_shared>) | bloqueia o mutex para posse compartilhada, aguarda se o mutex não estiver disponível
(função membro pública)
[ try_lock_shared](<#/doc/thread/shared_timed_mutex/try_lock_shared>) | tenta bloquear o mutex para posse compartilhada, retorna se o mutex não estiver disponível
(função membro pública)
[ try_lock_shared_for](<#/doc/thread/shared_timed_mutex/try_lock_shared_for>) | tenta bloquear o mutex para posse compartilhada, retorna se o mutex esteve
indisponível pela duração de tempo limite especificada
(função membro pública)
[ try_lock_shared_until](<#/doc/thread/shared_timed_mutex/try_lock_shared_until>) | tenta bloquear o mutex para posse compartilhada, retorna se o mutex esteve
indisponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)
[ unlock_shared](<#/doc/thread/shared_timed_mutex/unlock_shared>) | desbloqueia o mutex (posse compartilhada)
(função membro pública)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_shared_timed_mutex`](<#/doc/feature_test>) | [`201402L`](<#/>) | (C++14) | `std::shared_timed_mutex`

### Exemplo

| Esta seção está incompleta
Razão: construir um exemplo motivador

Um operador de atribuição por cópia para uma classe que mantém recursos que podem lidar com múltiplos leitores, mas apenas um escritor.

Execute este código
```cpp
    #include <mutex>
    #include <shared_mutex>
    
    class R
    {
        mutable std::shared_timed_mutex mut;
        /* data */
    public:
        R& operator=(const R& other)
        {
            // requer posse exclusiva para escrever em *this
            std::unique_lock<std::shared_timed_mutex> lhs(mut, std::defer_lock);
            // requer posse compartilhada para ler de other
            std::shared_lock<std::shared_timed_mutex> rhs(other.mut, std::defer_lock);
            std::lock(lhs, rhs);
            /* atribuir dados */
            return *this;
        }
    };
    
    int main()
    {
        R r;
    }
```