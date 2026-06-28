# std::atomic_flag

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
class atomic_flag;
```

`std::atomic_flag` é um tipo booleano atômico. Ao contrário de todas as especializações de [std::atomic](<#/doc/atomic/atomic>), é garantido que seja lock-free. Ao contrário de [std::atomic](<#/doc/atomic/atomic>)&lt;bool&gt;, `std::atomic_flag` não fornece operações de leitura (load) ou escrita (store).

### Funções membro

[ (construtor)](<#/doc/atomic/atomic_flag/atomic_flag>) | constrói um atomic_flag
(função membro pública)
[ operator=](<#/>)[deleted] | o operador de atribuição (excluído)
(função membro pública)
[ clear](<#/doc/atomic/atomic_flag/clear>) | define atomicamente a flag como false
(função membro pública)
[ test_and_set](<#/doc/atomic/atomic_flag/test_and_set>) | define atomicamente a flag como true e obtém seu valor anterior
(função membro pública)
[ test](<#/doc/atomic/atomic_flag/test>)(C++20) | retorna atomicamente o valor da flag
(função membro pública)
[ wait](<#/doc/atomic/atomic_flag/wait>)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(função membro pública)
[ notify_one](<#/doc/atomic/atomic_flag/notify_one>)(C++20) | notifica pelo menos uma thread esperando no objeto atômico
(função membro pública)
[ notify_all](<#/doc/atomic/atomic_flag/notify_all>)(C++20) | notifica todas as threads bloqueadas esperando no objeto atômico
(função membro pública)

### Exemplo

Uma demonstração de mutex [spinlock](<https://en.wikipedia.org/wiki/Spinlock> "enwiki:Spinlock") pode ser implementada no userspace usando um atomic_flag. Note que mutexes spinlock são [extremamente duvidosos](<https://www.realworldtech.com/forum/?threadid=189711&curpostid=189723>) na prática.

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <mutex>
    #include <thread>
    #include <vector>
    
    class mutex
    {
        std::atomic_flag m_{};
    
      public:
        void lock() noexcept
        {
            while (m_.test_and_set(std::memory_order_acquire))
    #if defined(__cpp_lib_atomic_wait) && __cpp_lib_atomic_wait >= 201907L
                // Desde C++20, locks podem ser adquiridos apenas após notificação no unlock,
                // evitando qualquer spinning desnecessário.
                // Note que, embora wait garanta que retorna apenas depois que o valor
                // tenha mudado, o lock é adquirido após a próxima verificação de condição.
                m_.wait(true, std::memory_order_relaxed)
    #endif
                    ;
        }
        bool try_lock() noexcept
        {
            return !m_.test_and_set(std::memory_order_acquire);
        }
        void unlock() noexcept
        {
            m_.clear(std::memory_order_release);
    #if defined(__cpp_lib_atomic_wait) && __cpp_lib_atomic_wait >= 201907L
            m_.notify_one();
    #endif
        }
    };
    
    static mutex m;
    
    static int out{};
    
    void f(std::size_t n)
    {
        for (std::size_t cnt{}; cnt < 40; ++cnt)
        {
            std::lock_guard lock{m};
            std::cout << n << ((++out % 40) == 0 ? '\n' : ' ');
        }
    }
    
    int main()
    {
        std::vector<std::thread> v;
        for (std::size_t n{}; n < 10; ++n)
            v.emplace_back(f, n);
        for (auto &t : v)
            t.join();
    }
```

Saída possível:
```
    0 1 1 2 0 1 3 2 3 2 0 1 2 3 2 3 0 1 3 2 0 1 2 3 2 3 0 3 2 3 2 3 2 3 1 2 3 0 1 3
    2 3 2 0 1 2 3 0 1 2 3 2 0 1 2 3 0 1 2 3 2 3 2 3 2 0 1 2 3 2 3 0 1 3 2 3 0 2 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 3 2 0 2 3 2 3 2 3 2 3 2 3 0 3
    2 3 0 3 0 3 2 3 0 3 2 3 2 3 0 2 3 0 3 2 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
```

### Veja também

[ atomic_flag_test_and_setatomic_flag_test_and_set_explicit](<#/doc/atomic/atomic_flag_test_and_set>)(C++11)(C++11) | define atomicamente a flag como true e retorna seu valor anterior
(função)
[ atomic_flag_clearatomic_flag_clear_explicit](<#/doc/atomic/atomic_flag_clear>)(C++11)(C++11) | define atomicamente o valor da flag como false
(função)
[ atomic_flag_waitatomic_flag_wait_explicit](<#/doc/atomic/atomic_flag_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e a flag mudar
(função)
[ atomic_flag_notify_one](<#/doc/atomic/atomic_flag_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_flag_wait
(função)
[ atomic_flag_notify_all](<#/doc/atomic/atomic_flag_notify_all>)(C++20) | notifica todas as threads bloqueadas em atomic_flag_wait
(função)
[ ATOMIC_FLAG_INIT](<#/doc/atomic/ATOMIC_FLAG_INIT>)(C++11) | inicializa um **std::atomic_flag** como false
(macro constante)
[Documentação C](<#/>) para atomic_flag