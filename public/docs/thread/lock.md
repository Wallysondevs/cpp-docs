# std::lock

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
template< class Lockable1, class Lockable2, class... LockableN >
void lock( Lockable1& lock1, Lockable2& lock2, LockableN&... lockn );
```

Bloqueia os objetos [Lockable](<#/doc/named_req/Lockable>) dados lock1, lock2, `...`, lockn usando um algoritmo de prevenção de deadlock para evitar deadlock.

Os objetos são bloqueados por uma série não especificada de chamadas para `lock`, `try_lock`, e `unlock`. Se uma chamada para `lock` ou `unlock` resultar em uma exceção, `unlock` é chamado para quaisquer objetos bloqueados antes de relançar a exceção.

### Parâmetros

lock1, lock2, ... , lockn | \- | os objetos [Lockable](<#/doc/named_req/Lockable>) a serem bloqueados

### Valor de retorno

(nenhum)

### Observações

[Boost fornece uma versão desta função](<https://www.boost.org/doc/libs/release/doc/html/thread/synchronization.html#thread.synchronization.lock_functions.lock_range>) que aceita uma sequência de objetos [Lockable](<#/doc/named_req/Lockable>) definidos por um par de iterators.

[`std::scoped_lock`](<#/doc/thread/scoped_lock>) oferece um wrapper [RAII](<#/doc/language/raii>) para esta função, e é geralmente preferido a uma chamada direta a `std::lock`.

### Exemplo

O exemplo a seguir usa `std::lock` para bloquear pares de mutexes sem deadlock.

Execute este código
```cpp
    #include <chrono>
    #include <functional>
    #include <iostream>
    #include <mutex>
    #include <string>
    #include <thread>
    #include <vector>
     
    struct Employee
    {
        Employee(std::string id) : id(id) {}
        std::string id;
        std::vector<std::string> lunch_partners;
        std::mutex m;
        std::string output() const
        {
            std::string ret = "Employee " + id + " has lunch partners: ";
            for (auto n{lunch_partners.size()}; const auto& partner : lunch_partners)
                ret += partner + (--n ? ", " : "");
            return ret;
        }
    };
     
    void send_mail(Employee&, Employee&)
    {
        // Simula uma operação de mensagem demorada
        std::this_thread::sleep_for(std::chrono::milliseconds(696));
    }
     
    void assign_lunch_partner(Employee& e1, Employee& e2)
    {
        static std::mutex io_mutex;
        {
            std::lock_guard<std::mutex> lk(io_mutex);
            std::cout << e1.id << " and " << e2.id << " are waiting for locks" << std::endl;
        }
     
        // Usa std::lock para adquirir dois locks sem se preocupar com 
        // outras chamadas para assign_lunch_partner nos causarem deadlock
        {
            std::lock(e1.m, e2.m);
            std::lock_guard<std::mutex> lk1(e1.m, std::adopt_lock);
            std::lock_guard<std::mutex> lk2(e2.m, std::adopt_lock);
        // Código equivalente (se unique_locks forem necessários, por exemplo, para variáveis de condição)
        //  std::unique_lock<std::mutex> lk1(e1.m, std::defer_lock);
        //  std::unique_lock<std::mutex> lk2(e2.m, std::defer_lock);
        //  std::lock(lk1, lk2);
        // Solução superior disponível em C++17
        //  std::scoped_lock lk(e1.m, e2.m);
            {
                std::lock_guard<std::mutex> lk(io_mutex);
                std::cout << e1.id << " and " << e2.id << " got locks" << std::endl;
            }
            e1.lunch_partners.push_back(e2.id);
            e2.lunch_partners.push_back(e1.id);
        }
        send_mail(e1, e2);
        send_mail(e2, e1);
    }
     
    int main()
    {
        Employee alice("Alice"), bob("Bob"), christina("Christina"), dave("Dave");
     
        // Atribui em threads paralelas porque enviar e-mails aos usuários sobre atribuições de almoço
        // leva muito tempo
        std::vector<std::thread> threads;
        threads.emplace_back(assign_lunch_partner, std::ref(alice), std::ref(bob));
        threads.emplace_back(assign_lunch_partner, std::ref(christina), std::ref(bob));
        threads.emplace_back(assign_lunch_partner, std::ref(christina), std::ref(alice));
        threads.emplace_back(assign_lunch_partner, std::ref(dave), std::ref(bob));
     
        for (auto& thread : threads)
            thread.join();
     
        std::cout << alice.output() << '\n'
                  << bob.output() << '\n'
                  << christina.output() << '\n'
                  << dave.output() << '\n';
    }
```

Saída possível:
```
    Alice and Bob are waiting for locks
    Alice and Bob got locks
    Christina and Bob are waiting for locks
    Christina and Bob got locks
    Christina and Alice are waiting for locks
    Dave and Bob are waiting for locks
    Dave and Bob got locks
    Christina and Alice got locks
    Employee Alice has lunch partners: Bob, Christina 
    Employee Bob has lunch partners: Alice, Christina, Dave 
    Employee Christina has lunch partners: Bob, Alice 
    Employee Dave has lunch partners: Bob
```

### Veja também

[ unique_lock](<#/doc/thread/unique_lock>)(C++11) | implementa um wrapper de propriedade de mutex móvel
(modelo de classe)
[ try_lock](<#/doc/thread/try_lock>)(C++11) | tenta obter a propriedade de mutexes através de chamadas repetidas a `try_lock`
(modelo de função)
[ scoped_lock](<#/doc/thread/scoped_lock>)(C++17) | wrapper RAII para múltiplos mutexes que evita deadlock
(modelo de classe)