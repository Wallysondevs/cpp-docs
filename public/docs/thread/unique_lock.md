# std::unique_lock

Definido no header `[<mutex>](<#/doc/header/mutex>)`

```cpp
template< class Mutex >
class unique_lock;  // (desde C++11)
```

A classe `unique_lock` é um wrapper de posse de mutex de propósito geral, permitindo travamento adiado, tentativas de travamento com restrição de tempo, travamento recursivo, transferência de posse de travamento e uso com variáveis de condição.

A classe `unique_lock` é movível, mas não copiável -- ela atende aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>), mas não de [CopyConstructible](<#/doc/named_req/CopyConstructible>) ou [CopyAssignable](<#/doc/named_req/CopyAssignable>).

A classe `unique_lock` atende aos requisitos [BasicLockable](<#/doc/named_req/BasicLockable>). Se `Mutex` atende aos requisitos [Lockable](<#/doc/named_req/Lockable>), `unique_lock` também atende aos requisitos [Lockable](<#/doc/named_req/Lockable>) (ex.: pode ser usada em [std::lock](<#/doc/thread/lock>)); se `Mutex` atende aos requisitos [TimedLockable](<#/doc/named_req/TimedLockable>), `unique_lock` também atende aos requisitos [TimedLockable](<#/doc/named_req/TimedLockable>).

### Parâmetros de template

- **Mutex** — o tipo do mutex a ser travado. O tipo deve atender aos requisitos [BasicLockable](<#/doc/named_req/BasicLockable>)

### Tipos aninhados

Tipo | Definição
---|---
`mutex_type` | `Mutex`

### Funções membro

[ (constructor)](<#/doc/thread/unique_lock/unique_lock>) | constrói um `unique_lock`, opcionalmente travando (i.e., assumindo a posse de) o mutex fornecido
(função membro pública)
[ (destructor)](<#/doc/thread/unique_lock/~unique_lock>) | destrava (i.e., libera a posse de) o mutex associado, se possuído
(função membro pública)
[ operator=](<#/>) | destrava (i.e., libera a posse de) o mutex, se possuído, e adquire a posse de outro
(função membro pública)

##### Travamento

[ lock](<#/doc/thread/unique_lock/lock>) | trava (i.e., assume a posse de) o mutex associado
(função membro pública)
[ try_lock](<#/doc/thread/unique_lock/try_lock>) | tenta travar (i.e., assume a posse de) o mutex associado sem bloquear
(função membro pública)
[ try_lock_for](<#/doc/thread/unique_lock/try_lock_for>) | tenta travar (i.e., assume a posse de) o mutex [TimedLockable](<#/doc/named_req/TimedLockable>) associado, retorna se o mutex esteve indisponível pela duração de tempo especificada
(função membro pública)
[ try_lock_until](<#/doc/thread/unique_lock/try_lock_until>) | tenta travar (i.e., assume a posse de) o mutex [TimedLockable](<#/doc/named_req/TimedLockable>) associado, retorna se o mutex esteve indisponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)
[ unlock](<#/doc/thread/unique_lock/unlock>) | destrava (i.e., libera a posse de) o mutex associado
(função membro pública)

##### Modificadores

[ swap](<#/doc/thread/unique_lock/swap>) | troca o estado com outro **std::unique_lock**
(função membro pública)
[ release](<#/doc/thread/unique_lock/release>) | desassocia o mutex associado sem destravá-lo (i.e., liberar a posse dele)
(função membro pública)

##### Observadores

[ mutex](<#/doc/thread/unique_lock/mutex>) | retorna um ponteiro para o mutex associado
(função membro pública)
[ owns_lock](<#/doc/thread/unique_lock/owns_lock>) | testa se o lock possui (i.e., travou) seu mutex associado
(função membro pública)
[ operator bool](<#/doc/thread/unique_lock/operator_bool>) | testa se o lock possui (i.e., travou) seu mutex associado
(função membro pública)

### Funções não-membro

[ std::swap(std::unique_lock)](<#/doc/thread/unique_lock/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <mutex>
    #include <thread>
    
    struct Box
    {
        explicit Box(int num) : num_things{num} {}
    
        int num_things;
        std::mutex m;
    };
    
    void transfer(Box& from, Box& to, int num)
    {
        // ainda não adquire os locks
        std::unique_lock lock1{from.m, std::defer_lock};
        std::unique_lock lock2{to.m, std::defer_lock};
    
        // trava ambos unique_locks sem deadlock
        std::lock(lock1, lock2);
    
        from.num_things -= num;
        to.num_things += num;
    
        // mutexes “from.m” e “to.m” destravados nos destrutores de unique_lock
    }
    
    int main()
    {
        Box acc1{100};
        Box acc2{50};
    
        std::thread t1{transfer, std::ref(acc1), std::ref(acc2), 10};
        std::thread t2{transfer, std::ref(acc2), std::ref(acc1), 5};
    
        t1.join();
        t2.join();
    
        std::cout << "acc1: " << acc1.num_things << "\n"
                     "acc2: " << acc2.num_things << '\n';
    }
```

Saída:
```
    acc1: 95
    acc2: 55
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2981](<https://cplusplus.github.io/LWG/issue2981>) | C++17 | guia de dedução redundante de `unique_lock<Mutex>` foi fornecido | removido

### Ver também

[ lock](<#/doc/thread/lock>)(C++11) | trava os mutexes especificados, bloqueia se algum estiver indisponível
(modelo de função)
[ lock_guard](<#/doc/thread/lock_guard>)(C++11) | implementa um wrapper de posse de mutex estritamente baseado em escopo
(modelo de classe)
[ scoped_lock](<#/doc/thread/scoped_lock>)(C++17) | wrapper RAII para múltiplos mutexes que evita deadlock
(modelo de classe)
[ mutex](<#/doc/thread/mutex>)(C++11) | fornece facilidade básica de exclusão mútua
(classe)