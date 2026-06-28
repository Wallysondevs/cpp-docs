# std::defer_lock, std::try_to_lock, std::adopt_lock, std::defer_lock_t, std::try_to_lock_t, std::adopt_lock_t

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
struct defer_lock_t { explicit defer_lock_t() = default; };
constexpr std::defer_lock_t defer_lock {};
(inline desde C++17)
struct try_to_lock_t { explicit try_to_lock_t() = default; };
constexpr std::try_to_lock_t try_to_lock {};
(inline desde C++17)
struct adopt_lock_t { explicit adopt_lock_t() = default; };
constexpr std::adopt_lock_t adopt_lock {};
(inline desde C++17)
```

1,3,5) Os tipos de classe de tag vazios `std::defer_lock_t`, `std::try_to_lock_t` e `std::adopt_lock_t` podem ser usados na lista de parâmetros do construtor para [std::unique_lock](<#/doc/thread/unique_lock>) e [std::shared_lock](<#/doc/thread/shared_lock>) para especificar a estratégia de travamento.

2,4,6) As instâncias correspondentes `std::defer_lock`, `std::try_to_lock` e `std::adopt_lock` de (1,3,5) podem ser passadas para os construtores para indicar o tipo de estratégia de travamento.

Um dos construtores do template de classe [std::lock_guard](<#/doc/thread/lock_guard>) aceita apenas a tag `std::adopt_lock`.

Tipo | Efeito(s)
---|---
`defer_lock_t` | não adquire a posse do mutex
`try_to_lock_t` | tenta adquirir a posse do mutex sem bloquear
`adopt_lock_t` | assume que a thread chamadora já possui a posse do mutex

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    #include <thread>
     
    struct bank_account
    {
        explicit bank_account(int balance) : balance{balance} {}
        int balance;
        std::mutex m;
    };
     
    void transfer(bank_account& from, bank_account& to, int amount)
    {
        if (&from == &to) // evita deadlock em caso de auto-transferência
            return;
     
        // trava ambos os mutexes sem deadlock
        std::lock(from.m, to.m);
        // garante que ambos os mutexes já travados sejam destravados ao final do escopo
        std::lock_guard lock1{from.m, std::adopt_lock};
        std::lock_guard lock2{to.m, std::adopt_lock};
     
    // abordagem equivalente:
    //  std::unique_lock<std::mutex> lock1{from.m, std::defer_lock};
    //  std::unique_lock<std::mutex> lock2{to.m, std::defer_lock};
    //  std::lock(lock1, lock2);
     
        from.balance -= amount;
        to.balance += amount;
    }
     
    int main()
    {
        bank_account my_account{100};
        bank_account your_account{50};
     
        std::thread t1{transfer, std::ref(my_account), std::ref(your_account), 10};
        std::thread t2{transfer, std::ref(your_account), std::ref(my_account), 5};
     
        t1.join();
        t2.join();
     
        std::cout << "my_account.balance = " << my_account.balance << "\n"
                     "your_account.balance = " << your_account.balance << '\n';
    }
```

Saída:
```
    my_account.balance = 95
    your_account.balance = 55
```

### Veja também

[ (construtor)](<#/doc/thread/lock_guard/lock_guard>) | constrói um `lock_guard`, opcionalmente travando o mutex fornecido
(função membro pública de `std::lock_guard<Mutex>`)
[ (construtor)](<#/doc/thread/unique_lock/unique_lock>) | constrói um `unique_lock`, opcionalmente travando (isto é, assumindo a posse de) o mutex fornecido
(função membro pública de `std::unique_lock<Mutex>`)