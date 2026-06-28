# std::condition_variable::notify_one

```cpp
`void notify_one() noexcept;`  // (desde C++11)
```

Se alguma thread estiver esperando por *este*, chamar `notify_one` desbloqueia uma das threads em espera.

### Parameters

(nenhum)

### Return value

(nenhum)

### Notes

Os efeitos de `notify_one()`/`notify_all()` e cada uma das três partes atômicas de `wait()`/`wait_for()`/`wait_until()` (desbloquear+esperar, despertar e bloquear) ocorrem em uma única ordem total que pode ser vista como [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para esta variável de condição individual. Isso torna impossível para `notify_one()`, por exemplo, ser atrasado e desbloquear uma thread que começou a esperar logo após a chamada para `notify_one()` ter sido feita.

A thread notificadora não precisa manter o lock no mesmo mutex que o mantido pela(s) thread(s) em espera; na verdade, fazer isso é uma pessimization, já que a thread notificada bloquearia imediatamente novamente, esperando que a thread notificadora liberasse o lock. No entanto, algumas implementações (em particular muitas implementações de pthreads) reconhecem esta situação e evitam este cenário de "apressar-se e esperar" transferindo a thread em espera da fila da variável de condição diretamente para a fila do mutex dentro da chamada de notificação, sem despertá-la.

Notificar enquanto sob o lock pode, no entanto, ser necessário quando um agendamento preciso de eventos é exigido, por exemplo, se a thread em espera sair do programa se a condição for satisfeita, causando a destruição da variável de condição da thread notificadora. Um despertar espúrio após o desbloqueio do mutex, mas antes da notificação, resultaria em `notify` sendo chamado em um objeto destruído.

### Example

Execute este código
```
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <thread>
    using namespace std::chrono_literals;
    
    std::condition_variable cv;
    std::mutex cv_m;
    int i = 0;
    bool done = false;
    
    void waits()
    {
        std::unique_lock<std::mutex> lk(cv_m);
        std::cout << "Waiting... \n";
        cv.wait(lk, []{ return i == 1; });
        std::cout << "...finished waiting; i == " << i << '\n';
        done = true;
    }
    
    void signals()
    {
        std::this_thread::sleep_for(200ms);
        std::cout << "Notifying falsely...\n";
        cv.notify_one(); // waiting thread is notified with i == 0.
                         // cv.wait wakes up, checks i, and goes back to waiting
    
        std::unique_lock<std::mutex> lk(cv_m);
        i = 1;
        while (!done)
        {
            std::cout << "Notifying true change...\n";
            lk.unlock();
            cv.notify_one(); // waiting thread is notified with i == 1, cv.wait returns
            std::this_thread::sleep_for(300ms);
            lk.lock();
        }
    }
    
    int main()
    {
        std::thread t1(waits), t2(signals);
        t1.join();
        t2.join();
    }
```

Saída possível:
```
    Waiting...
    Notifying falsely...
    Notifying true change...
    ...finished waiting; i == 1
```

### See also

[ notify_all](<#/doc/thread/condition_variable/notify_all>) | notifica todas as threads em espera
(função membro pública)
[Documentação C](<#/>) para `cnd_signal`