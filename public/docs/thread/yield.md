# std::this_thread::yield

Definido no header `[<thread>](<#/doc/header/thread>)`

```cpp
void yield() noexcept;  // (desde C++11)
```

Fornece uma dica para a implementação reagendar a execução de threads, permitindo que outras threads sejam executadas.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Observações

O comportamento exato desta função depende da implementação, em particular dos mecanismos do escalonador do sistema operacional em uso e do estado do sistema. Por exemplo, um escalonador em tempo real first-in-first-out (`SCHED_FIFO` no Linux) suspenderia a thread atual e a colocaria no final da fila de threads de mesma prioridade que estão prontas para serem executadas, e se não houver outras threads com a mesma prioridade, `yield` não terá efeito.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <thread>
    
    // "busy sleep" enquanto sugere que outras threads sejam executadas
    // por um curto período de tempo
    void little_sleep(std::chrono::microseconds us)
    {
        auto start = std::chrono::high_resolution_clock::now();
        auto end = start + us;
        do
        {
            std::this_thread::yield();
        }
        while (std::chrono::high_resolution_clock::now() < end);
    }
    
    int main()
    {
        auto start = std::chrono::high_resolution_clock::now();
    
        little_sleep(std::chrono::microseconds(100));
    
        auto elapsed = std::chrono::high_resolution_clock::now() - start;
        std::cout << "waited for "
                  << std::chrono::duration_cast<std::chrono::microseconds>(elapsed).count()
                  << " microseconds\n";
    }
```

Saída possível:
```
    waited for 128 microseconds
```

### Veja também

[documentação C](<#/>) para thrd_yield
---