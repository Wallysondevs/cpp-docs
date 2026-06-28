# std::atomic_fetch_or, std::atomic_fetch_or_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_fetch_or( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;
template< class T >
T atomic_fetch_or( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg ) noexcept;
template< class T >
T atomic_fetch_or_explicit( std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order ) noexcept;
template< class T >
T atomic_fetch_or_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type arg,
std::memory_order order ) noexcept;
```

Substitui atomicamente o valor apontado por obj pelo resultado do OR bit a bit entre o valor antigo de obj e arg. Retorna o valor que obj continha anteriormente.

A operação é realizada como se o seguinte fosse executado:

1,2) obj->fetch_or(arg)

3,4) obj->fetch_or(arg, order)

Se `std::atomic<T>` não tiver um membro `fetch_or` (este membro é fornecido apenas para [tipos integrais](<#/doc/atomic/atomic>), exceto bool), o programa é malformado.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser modificado
- **arg** — o valor para realizar OR bit a bit com o valor armazenado no objeto atômico
- **order** — a ordem de sincronização de memória

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de *obj.

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <chrono>
    #include <functional>
    #include <iostream>
    #include <thread>
    
    // Semáforo binário apenas para fins demonstrativos.
    // Este é um exemplo simples, mas significativo: operações atômicas
    // são desnecessárias sem threads. 
    class Semaphore
    {
        std::atomic_char m_signaled;
    public:
        Semaphore(bool initial = false)
        {
            m_signaled = initial;
        }
        // Bloqueia até que o semáforo seja sinalizado
        void take() 
        {
            while (!std::atomic_fetch_and(&m_signaled, false))
            {
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
            }
        }
    
        void put() 
        {
            std::atomic_fetch_or(&m_signaled, true);
        }
    };
    
    class ThreadedCounter
    {
        static const int N = 100;
        static const int REPORT_INTERVAL = 10;
        int m_count;
        bool m_done;
        Semaphore m_count_sem;
        Semaphore m_print_sem;
    
        void count_up() 
        {
            for (m_count = 1; m_count <= N; ++m_count)
                if (m_count % REPORT_INTERVAL == 0)
                {
                    if (m_count == N)
                        m_done = true;
                    m_print_sem.put(); // sinaliza que a impressão deve ocorrer
                    m_count_sem.take(); // espera até que a impressão seja concluída antes de prosseguir
                }
            std::cout << "count_up() done\n";
            m_done = true;
            m_print_sem.put();
        }
    
        void print_count() 
        {
            do
            {
                m_print_sem.take();
                std::cout << m_count << '\n';
                m_count_sem.put();
            }
            while (!m_done);
            std::cout << "print_count() done\n";
        }
    
    public:
        ThreadedCounter() : m_done(false) {}
        void run() 
        {
            auto print_thread = std::thread(&ThreadedCounter::print_count, this);
            auto count_thread = std::thread(&ThreadedCounter::count_up, this);
            print_thread.join();
            count_thread.join();
        }
    };
    
    int main() 
    {
        ThreadedCounter m_counter;
        m_counter.run();
    }
```

Saída:
```
    10
    20
    30
    40
    50
    60
    70
    80
    90
    100
    print_count() done
    count_up() done
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência exata de tipo era exigida porque
T era deduzido de múltiplos argumentos | T é deduzido apenas
de obj

### Veja também

[ fetch_or](<#/doc/atomic/atomic/fetch_or>) | realiza atomicamente um OR bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente
(função membro pública de `std::atomic<T>`)
[ atomic_fetch_andatomic_fetch_and_explicit](<#/doc/atomic/atomic_fetch_and>)(C++11)(C++11) | substitui o objeto atômico pelo resultado do AND bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[ atomic_fetch_xoratomic_fetch_xor_explicit](<#/doc/atomic/atomic_fetch_xor>)(C++11)(C++11) | substitui o objeto atômico pelo resultado do XOR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(modelo de função)
[Documentação C](<#/>) para atomic_fetch_or, atomic_fetch_or_explicit