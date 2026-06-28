# std::thread::native_handle

```cpp
native_handle_type native_handle();  // (desde C++11)
(nem sempre presente)
```

Retorna o handle de thread subjacente definido pela implementação.

### Parâmetros

(nenhum)

### Valor de retorno

Tipo de handle definido pela implementação que representa a thread.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Usa `native_handle` para habilitar o escalonamento em tempo real de threads C++ em um sistema POSIX.

Execute este código
```cpp
    #include <chrono>
    #include <cstring>
    #include <iostream>
    #include <mutex>
    #include <pthread.h>
    #include <thread>
    
    std::mutex iomutex;
    void f(int num)
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    
        sched_param sch;
        int policy; 
        pthread_getschedparam(pthread_self(), &policy, &sch);
        std::lock_guard<std::mutex> lk(iomutex);
        std::cout << "Thread " << num << " is executing at priority "
                  << sch.sched_priority << '\n';
    }
    
    int main()
    {
        std::thread t1(f, 1), t2(f, 2);
    
        sched_param sch;
        int policy; 
        pthread_getschedparam(t1.native_handle(), &policy, &sch);
        sch.sched_priority = 20;
        if (pthread_setschedparam(t1.native_handle(), SCHED_FIFO, &sch))
            std::cout << "Failed to setschedparam: " << std::strerror(errno) << '\n';
    
        t1.join(); t2.join();
    }
```

Saída:
```
    Thread 2 is executing at priority 0
    Thread 1 is executing at priority 20
```