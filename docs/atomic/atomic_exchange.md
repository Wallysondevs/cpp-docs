# std::atomic_exchange, std::atomic_exchange_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_exchange( std::atomic<T>* obj,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
T atomic_exchange( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
T atomic_exchange_explicit( std::atomic<T>* obj,
typename std::atomic<T>::value_type desired,
std::memory_order order ) noexcept;
template< class T >
T atomic_exchange_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type desired,
std::memory_order order ) noexcept;
```

1,2) Substitui atomicamente o valor apontado por obj pelo valor de desired e retorna o valor que obj continha anteriormente, como se por obj->exchange(desired).

3,4) Substitui atomicamente o valor apontado por obj pelo valor de desired e retorna o valor que obj continha anteriormente, como se por obj->exchange(desired, order).

### Parâmetros

obj | \- | ponteiro para o objeto atômico a ser modificado
---|---|---
desired | \- | o valor a ser armazenado no objeto atômico
order | \- | a ordenação de sincronização de memória

### Valor de retorno

O valor contido anteriormente pelo objeto atômico apontado por obj.

### Exemplo

Um mutex spinlock pode ser implementado no userspace usando uma operação de troca atômica, similar a [std::atomic_flag_test_and_set](<#/doc/atomic/atomic_flag_test_and_set>):

Executar este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <thread>
    #include <vector>
     
    std::atomic<bool> lock(false); // holds true when locked
                                   // holds false when unlocked
     
    int new_line{1}; // the access is synchronized via atomic lock variable
     
    void f(int n)
    {
        for (int cnt = 0; cnt < 100; ++cnt)
        {
            while (std::atomic_exchange_explicit(&lock, true, std::memory_order_acquire))
                ; // spin until acquired
            std::cout << n << (new_line++ % 80 ? "" : "\n");
            std::atomic_store_explicit(&lock, false, std::memory_order_release);
        }
    }
     
    int main()
    {
        std::vector<std::thread> v;
        for (int n = 0; n < 8; ++n)
            v.emplace_back(f, n);
        for (auto& t : v)
            t.join();
    }
```

Saída possível:
```
    02222222222222222222222002222222222222222222222222222222222222222222222222222222
    22222222200022222222202222211111111111110000011111111100000000000000110001111111
    00011111000001111110000011111100000111000000001111111111111110000010000001001111
    11011111111011111011000000000000111100000000000001111000011133333333333333333333
    33333333333333333333333333333333333333333333333333333333333333333333333333333333
    44444444444444444444444444444444444444444444444444444444444444444444444444444444
    44444444444444444444555555555555555555555555555555555555555555555555555555555555
    55555555555555555555555555555555555555556666666666666666666666666666666666666666
    66666666666666666666666666666666666666666666666666666666666677777777777777777777
    77777777777777777777777777777777777777777777777777777777777777777777777777777777
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência exata de tipo era exigida porque `T` era deduzido de múltiplos argumentos | `T` é deduzido apenas de obj

### Veja também

[ exchange](<#/doc/atomic/atomic/exchange>) | substitui atomicamente o valor do objeto atômico e obtém o valor contido anteriormente
(função membro pública de `std::atomic<T>`)
[ atomic_compare_exchange_weakatomic_compare_exchange_weak_explicitatomic_compare_exchange_strongatomic_compare_exchange_strong_explicit](<#/doc/atomic/atomic_compare_exchange>)(C++11)(C++11)(C++11)(C++11) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se iguais ou uma carga atômica se não
(modelo de função)
[ std::atomic_exchange(std::shared_ptr) std::atomic_exchange_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | especializa operações atômicas para [std::shared_ptr](<#/doc/memory/shared_ptr>)
(modelo de função)
[documentação C](<#/>) para atomic_exchange, atomic_exchange_explicit