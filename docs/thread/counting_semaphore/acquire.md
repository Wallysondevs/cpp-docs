# std::counting_semaphore&lt;LeastMaxValue&gt;::acquire

```cpp
void acquire();  // (desde C++20)
```

  
Decrementa atomicamente o contador interno em 1 se ele for maior que 0; caso contrário, bloqueia até que seja maior que 0 e possa decrementar com sucesso o contador interno.

### Pré-condições

(nenhuma)

### Parâmetros

(nenhum)

### Exceções

Pode lançar [std::system_error](<#/doc/error/system_error>).

### Exemplo

O exemplo visualiza o trabalho concorrente de várias threads aleatórias quando não mais que N (N é o valor _desejado_ do semáforo) das funções de thread estão ativas, enquanto as outras podem esperar pelo semáforo.

Execute este código
```cpp
    #include <array>
    #include <chrono>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <mutex>
    #include <new>
    #include <random>
    #include <semaphore>
    #include <thread>
    #include <vector>
    
    using namespace std::literals;
    
    constexpr std::size_t max_threads{10U}; // change and see the effect
    constexpr std::ptrdiff_t max_sema_threads{3}; // {1} for binary semaphore
    std::counting_semaphore semaphore{max_sema_threads};
    constexpr auto time_tick{10ms};
    
    unsigned rnd()
    {
        static std::uniform_int_distribution<unsigned> distribution{2U, 9U}; // [delays]
        static std::random_device engine;
        static std::mt19937 noise{engine()};
        return distribution(noise);
    }
    
    class alignas(std::hardware_destructive_interference_size) Guide
    {
        inline static std::mutex cout_mutex;
        inline static std::chrono::time_point<std::chrono::high_resolution_clock> started_at;
        unsigned delay{rnd()}, occupy{rnd()}, wait_on_sema{};
    
    public:
        static void start_time() { started_at = std::chrono::high_resolution_clock::now(); }
    
        void initial_delay() { std::this_thread::sleep_for(delay * time_tick); }
    
        void occupy_sema()
        {
            wait_on_sema =
                static_cast<unsigned>(std::chrono::duration_cast<std::chrono::milliseconds>(
                    std::chrono::high_resolution_clock::now() - started_at -
                    delay * time_tick).count() / time_tick.count());
            std::this_thread::sleep_for(occupy * time_tick);
        }
    
        void visualize(unsigned id, unsigned x_scale = 2) const
        {
            auto cout_n = =
            {
                for (n *= x_scale; n-- > 0; std::cout << str)
                    ;
            };
            std::lock_guard lk{cout_mutex};
            std::cout << '#' << std::setw(2) << id << ' ';
            cout_n("░", delay);
            cout_n("▒", wait_on_sema);
            cout_n("█", occupy);
            std::cout << '\n';
        }
    
        static void show_info()
        {
            std::cout << "\nThreads: " << max_threads << ", Throughput: " << max_sema_threads
                      << " │ Legend: initial delay ░░ │ wait state ▒▒ │ sema occupation ██ \n"
                      << std::endl;
        }
    };
    
    std::array<Guide, max_threads> guides;
    
    void workerThread(unsigned id)
    {
        guides[id].initial_delay(); // emulate some work before sema acquisition
        semaphore.acquire();        // wait until a free sema slot is available
        guides[id].occupy_sema();   // emulate some work while sema is acquired
        semaphore.release();
        guides[id].visualize(id);
    }
    
    int main()
    {
        std::vector<std::jthread> threads;
        threads.reserve(max_threads);
    
        Guide::show_info();
        Guide::start_time();
    
        for (auto id{0U}; id != max_threads; ++id)
            threads.push_back(std::jthread(workerThread, id));
    }
```

Saída possível:
```
    Default case: max_threads{10U}, max_sema_threads{3}
    
    Threads: 10, Vazão: 3 │ Legenda: atraso inicial ░░ │ estado de espera ▒▒ │ ocupação do semáforo ██ 
    
    # 1 ░░░░██████
    # 2 ░░░░████████
    # 5 ░░░░░░██████████
    # 8 ░░░░░░░░░░░░████████████
    # 9 ░░░░░░░░░░░░██████████████
    # 7 ░░░░░░░░░░░░▒▒▒▒████████████████
    # 4 ░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒████████
    # 6 ░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒██████████████████
    # 3 ░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████████████
    # 0 ░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████████████
    
    ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
    "Enough for everyone" case (no wait states!): max_threads{10U}, max_sema_threads{10}
    
    Threads: 10, Vazão: 10 │ Legenda: atraso inicial ░░ │ estado de espera ▒▒ │ ocupação do semáforo ██ 
    
    # 4 ░░░░██████
    # 5 ░░░░░░████
    # 3 ░░░░██████████
    # 1 ░░░░██████████
    # 8 ░░░░░░░░████████████
    # 6 ░░░░░░░░░░░░░░░░██████
    # 7 ░░░░░░░░░░░░░░░░██████
    # 9 ░░░░░░░░░░░░░░░░██████████
    # 0 ░░░░░░░░░░░░██████████████████
    # 2 ░░░░░░░░░░░░░░░░░░████████████
    
    ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
    Binary semaphore case: max_threads{10U}, max_sema_threads{1}
    
    Threads: 10, Vazão: 1 │ Legenda: atraso inicial ░░ │ estado de espera ▒▒ │ ocupação do semáforo ██ 
    
    # 6 ░░░░████
    # 5 ░░░░▒▒▒▒████
    # 4 ░░░░░░░░░░▒▒██████████
    # 7 ░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒████████████████
    # 2 ░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████
    # 3 ░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████████████████
    # 0 ░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████████████
    # 1 ░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████████
    # 8 ░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████
    # 9 ░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████████████
```

### Veja também

[ release](<#/doc/thread/counting_semaphore/release>) | incrementa o contador interno e desbloqueia os adquirentes   
(função membro pública)  
[ try_acquire](<#/doc/thread/counting_semaphore/try_acquire>) | tenta decrementar o contador interno sem bloquear   
(função membro pública)  
[ try_acquire_for](<#/doc/thread/counting_semaphore/try_acquire_for>) | tenta decrementar o contador interno, bloqueando por até uma duração de tempo   
(função membro pública)  
[ try_acquire_until](<#/doc/thread/counting_semaphore/try_acquire_until>) | tenta decrementar o contador interno, bloqueando até um ponto no tempo   
(função membro pública)