# std::atomic&lt;T&gt;::wait

```cpp
void wait( T old, std::memory_order order =  
std::memory_order_seq_cst ) const noexcept; |  (1) | (desde C++20)   
(constexpr desde C++26)  
---|---|---  
void wait( T old,  
std::memory_order order =  
std::memory_order_seq_cst ) const volatile noexcept; |  (2)  |  (desde C++20)  
| |   
```
Executa operações de espera atômicas. Comporta-se como se executasse repetidamente os seguintes passos:

  * Compara a [representação de valor](<#/doc/language/objects>) de this->load(order) com a de old.
    * Se forem iguais, então bloqueia até que *this seja notificado por notify_one() ou notify_all(), ou o thread seja desbloqueado espuriamente.
    * Caso contrário, retorna.

Essas funções têm garantia de retornar somente se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie espuriamente.

Se order não for [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

old  |  \-  |  o valor para verificar se o objeto `atomic` não contém mais   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Observações

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

Devido ao [problema ABA](<https://en.wikipedia.org/wiki/ABA_problem> "enwiki:ABA problem"), mudanças transitórias de old para outro valor e de volta para old podem ser perdidas, e não desbloquear.

A comparação é bit a bit (similar a [std::memcmp](<#/doc/string/byte/memcmp>)); nenhum operador de comparação é usado. Bits de preenchimento que nunca participam da representação de valor de um objeto são ignorados.

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <chrono>
    #include <future>
    #include <iostream>
    #include <thread>
     
    using namespace std::literals;
     
    int main()
    {
        std::atomic<bool> all_tasks_completed{false};
        std::atomic<unsigned> completion_count{};
        std::future<void> task_futures[16];
        std::atomic<unsigned> outstanding_task_count{16};
     
        // Spawn several tasks which take different amounts of
        // time, then decrement the outstanding task count.
        for (std::future<void>& task_future : task_futures)
            task_future = std::async([&]
            {
                // This sleep represents doing real work...
                std::this_thread::sleep_for(50ms);
     
                ++completion_count;
                --outstanding_task_count;
     
                // When the task count falls to zero, notify
                // the waiter (main thread in this case).
                if (outstanding_task_count.load() == 0)
                {
                    all_tasks_completed = true;
                    all_tasks_completed.notify_one();
                }
            });
     
        all_tasks_completed.wait(false);
     
        std::cout << "Tasks completed = " << completion_count.load() << '\n';
    }
```

Saída: 
```
    Tasks completed = 16
```

### Veja também

[ notify_one](<#/doc/atomic/atomic/notify_one>)(desde C++20) | notifica pelo menos um thread esperando no objeto atômico   
(função membro pública)  
[ notify_all](<#/doc/atomic/atomic/notify_all>)(desde C++20) | notifica todos os threads bloqueados esperando no objeto atômico   
(função membro pública)  
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(desde C++20) | notifica um thread bloqueado em atomic_wait   
(template de função)  
[ atomic_notify_all](<#/doc/atomic/atomic_notify_all>)(desde C++20) | notifica todos os threads bloqueados em atomic_wait   
(template de função)