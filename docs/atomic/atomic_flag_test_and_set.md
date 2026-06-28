# std::atomic_flag_test_and_set, std::atomic_flag_test_and_set_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
bool atomic_flag_test_and_set( volatile std::atomic_flag* obj ) noexcept;
bool atomic_flag_test_and_set( std::atomic_flag* obj ) noexcept;
bool atomic_flag_test_and_set_explicit( volatile std::atomic_flag* obj,
std::memory_order order ) noexcept;
bool atomic_flag_test_and_set_explicit( std::atomic_flag* obj,
std::memory_order order ) noexcept;
```

Altera atomicamente o estado de um [std::atomic_flag](<#/doc/atomic/atomic_flag>) apontado por obj para set (true) e retorna o valor que ele continha anteriormente.

1,2) A ordem de sincronização de memória é [std::memory_order_seq_cst](<#/doc/atomic/memory_order>).

3,4) A ordem de sincronização de memória é order.

### Parâmetros

- **obj** — ponteiro para [std::atomic_flag](<#/doc/atomic/atomic_flag>) a ser acessado
- **order** — a ordem de sincronização de memória

### Valor de retorno

O valor anteriormente contido pela flag apontada por obj.

### Observações

`std::atomic_flag_test_and_set` e `std::atomic_flag_test_and_set_explicit` podem ser implementados como obj->test_and_set() e obj->test_and_set(order) respectivamente.

### Exemplo

Um mutex spinlock pode ser implementado no userspace usando um `std::atomic_flag`.

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <thread>
    #include <vector>
    
    std::atomic_flag lock = ATOMIC_FLAG_INIT;
    
    void f(int n)
    {
        for (int cnt = 0; cnt < 100; ++cnt)
        {
            while (std::atomic_flag_test_and_set_explicit(&lock, std::memory_order_acquire))
                ; // spin until the lock is acquired
            std::cout << "Output from thread " << n << '\n';
            std::atomic_flag_clear_explicit(&lock, std::memory_order_release);
        }
    }
    
    int main()
    {
        std::vector<std::thread> v;
        for (int n = 0; n < 10; ++n)
            v.emplace_back(f, n);
        for (auto& t : v)
            t.join();
    }
```

Saída:
```
    Output from thread 2
    Output from thread 6
    Output from thread 7
    ...<exactly 1000 lines>...
```

### Veja também

[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) | o tipo atômico booleano lock-free
(classe)
[ atomic_flag_clearatomic_flag_clear_explicit](<#/doc/atomic/atomic_flag_clear>)(C++11)(C++11) | define atomicamente o valor da flag para false
(função)
[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[Documentação C](<#/>) para atomic_flag_test_and_set, atomic_flag_test_and_set_explicit