# std::condition_variable_any::notify_all

```cpp
void notify_all() noexcept;  // (desde C++11)
```

  
Desbloqueia todas as threads atualmente esperando por *this.

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Notas

Os efeitos de `notify_one()`/`notify_all()` e cada uma das três partes atômicas de `wait()`/`wait_for()`/`wait_until()` (desbloquear+esperar, despertar e travar) ocorrem em uma única ordem total que pode ser vista como a [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para esta variável de condição individual. Isso torna impossível para `notify_one()`, por exemplo, ser atrasado e desbloquear uma thread que começou a esperar logo após a chamada para `notify_one()` ter sido feita.

A thread notificadora não precisa manter a trava no mesmo mutex que o mantido pela(s) thread(s) em espera. Fazer isso pode ser uma pessimimização, já que a thread notificada bloquearia imediatamente novamente, esperando que a thread notificadora libere a trava, embora algumas implementações reconheçam o padrão e não tentem despertar a thread que é notificada sob trava.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <thread>
    
    std::condition_variable_any cv;
    std::mutex cv_m; // This mutex is used for three purposes:
                     // 1) to synchronize accesses to i
                     // 2) to synchronize accesses to std::cerr
                     // 3) for the condition variable cv
    int i = 0;
    
    void waits()
    {
        std::unique_lock<std::mutex> lk(cv_m);
        std::cerr << "Waiting... \n";
        cv.wait(lk, []{ return i == 1; });
        std::cerr << "...finished waiting. i == 1\n";
    }
    
    void signals()
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        {
            std::lock_guard<std::mutex> lk(cv_m);
            std::cerr << "Notifying...\n";
        }
        cv.notify_all();
    
        std::this_thread::sleep_for(std::chrono::seconds(1));
    
        {
            std::lock_guard<std::mutex> lk(cv_m);
            i = 1;
            std::cerr << "Notifying again...\n";
        }
        cv.notify_all();
    }
    
    int main()
    {
        std::thread t1(waits), t2(waits), t3(waits), t4(signals);
        t1.join(); 
        t2.join(); 
        t3.join();
        t4.join();
    }
```

Saída possível: 
```
    Waiting...
    Waiting...
    Waiting...
    Notifying...
    Notifying again...
    ...finished waiting. i == 1
    ...finished waiting. i == 1
    ...finished waiting. i == 1
```

### Veja também

[ notify_one](<#/doc/thread/condition_variable_any/notify_one>) |  notifica uma thread em espera   
(função membro pública)  
[Documentação C](<#/>) para cnd_broadcast