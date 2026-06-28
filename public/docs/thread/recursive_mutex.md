# std::recursive_mutex

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
class recursive_mutex;
```

A classe `recursive_mutex` é uma primitiva de sincronização que pode ser usada para proteger dados compartilhados de serem acessados simultaneamente por múltiplas threads.

`recursive_mutex` oferece semânticas de posse exclusiva e recursiva:

  * Uma thread chamadora _possui_ um `recursive_mutex` por um período de tempo que começa quando ela chama com sucesso [`lock`](<#/doc/thread/recursive_mutex/lock>) ou [`try_lock`](<#/doc/thread/mutex/try_lock>). Durante este período, a thread pode fazer chamadas adicionais para [`lock`](<#/doc/thread/recursive_mutex/lock>) ou [`try_lock`](<#/doc/thread/recursive_mutex/try_lock>). O período de posse termina quando a thread faz um número correspondente de chamadas para [`unlock`](<#/doc/thread/recursive_mutex/unlock>).
  * Quando uma thread possui um `recursive_mutex`, todas as outras threads serão bloqueadas (para chamadas a [`lock`](<#/doc/thread/recursive_mutex/lock>)) ou receberão um valor de retorno falso (para [`try_lock`](<#/doc/thread/recursive_mutex/try_lock>)) se tentarem reivindicar a posse do `recursive_mutex`.
  * O número máximo de vezes que um `recursive_mutex` pode ser bloqueado é não especificado, mas depois que esse número é atingido, chamadas para [`lock`](<#/doc/thread/recursive_mutex/lock>) lançarão [std::system_error](<#/doc/error/system_error>) e chamadas para [`try_lock`](<#/doc/thread/mutex/try_lock>) retornarão falso.

O comportamento de um programa é indefinido se um `recursive_mutex` for destruído enquanto ainda estiver sendo possuído por alguma thread. A classe `recursive_mutex` satisfaz todos os requisitos de [Mutex](<#/doc/named_req/Mutex>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Tipos de membros

Tipo de membro | Definição
---|---
`native_handle_type` (opcional*) | definido pela implementação

### Funções membro

[ (construtor)](<#/doc/thread/recursive_mutex/recursive_mutex>) | constrói o mutex
(função membro pública)
[ (destrutor)](<#/doc/thread/recursive_mutex/~recursive_mutex>) | destrói o mutex
(função membro pública)
operator=[deleted] | não copiável por atribuição
(função membro pública)

##### Bloqueio

[ lock](<#/doc/thread/recursive_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível
(função membro pública)
[ try_lock](<#/doc/thread/recursive_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[ unlock](<#/doc/thread/recursive_mutex/unlock>) | desbloqueia o mutex
(função membro pública)

##### Handle nativo

[ native_handle](<#/doc/thread/recursive_mutex/native_handle>) | retorna o objeto handle nativo subjacente definido pela implementação
(função membro pública)

### Exemplo

Um caso de uso para `recursive_mutex` é proteger o estado compartilhado em uma classe cujas funções membro podem chamar umas às outras.

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    #include <thread>
     
    class X
    {
        std::recursive_mutex m;
        std::string shared;
    public:
        void fun1()
        {
            std::lock_guard<std::recursive_mutex> lk(m);
            shared = "fun1";
            std::cout << "in fun1, shared variable is now " << shared << '\n';
        }
        void fun2()
        {
            std::lock_guard<std::recursive_mutex> lk(m);
            shared = "fun2";
            std::cout << "in fun2, shared variable is now " << shared << '\n';
            fun1(); // recursive lock becomes useful here
            std::cout << "back in fun2, shared variable is " << shared << '\n';
        }
    };
     
    int main() 
    {
        X x;
        std::thread t1(&X::fun1, &x);
        std::thread t2(&X::fun2, &x);
        t1.join();
        t2.join();
    }
```

Saída possível:
```
    in fun1, shared variable is now fun1
    in fun2, shared variable is now fun2
    in fun1, shared variable is now fun1
    back in fun2, shared variable is fun1
```

### Veja também

[ mutex](<#/doc/thread/mutex>)(C++11) | fornece facilidade básica de exclusão mútua
(class)