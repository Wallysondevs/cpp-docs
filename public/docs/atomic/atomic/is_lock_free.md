# std::atomic&lt;T&gt;::is_lock_free

```cpp
bool is_lock_free() const noexcept;  // (1) (desde C++11)
bool is_lock_free() const volatile noexcept;  // (2) (desde C++11)
```

Verifica se as operações atômicas em todos os objetos deste tipo são lock-free.

### Parâmetros

(nenhum)

### Valor de retorno

true se as operações atômicas nos objetos deste tipo são lock-free, false caso contrário.

### Observações

Todos os tipos atômicos, exceto [std::atomic_flag](<#/doc/atomic/atomic_flag>), podem ser implementados usando mutexes ou outras operações de travamento, em vez de usar as instruções de CPU atômicas lock-free. Tipos atômicos também podem ser _às vezes_ lock-free, por exemplo, se apenas acessos de memória alinhados são naturalmente atômicos em uma dada arquitetura, objetos desalinhados do mesmo tipo devem usar locks.

O padrão C++ recomenda (mas não exige) que as operações atômicas lock-free também sejam address-free, ou seja, adequadas para comunicação entre processos usando memória compartilhada.

### Exemplo

Execute este código
```
    #include <atomic>
    #include <iostream>
    #include <utility>
    
    struct A { int a[100]; };
    struct B { int x, y; };
    
    int main()
    {
        std::cout << std::boolalpha
                  << "std::atomic<A> is lock free? "
                  << std::atomic<A>{}.is_lock_free() << '\n'
                  << "std::atomic<B> is lock free? "
                  << std::atomic<B>{}.is_lock_free() << '\n';
    }
```

Saída possível:
```
    std::atomic<A> is lock free? false
    std::atomic<B> is lock free? true
```

### Veja também

[ atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(C++11) | verifica se as operações do tipo atômico são lock-free
(modelo de função)
[ atomic_is_lock_free(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>) | especializa operações atômicas para [std::shared_ptr](<#/doc/memory/shared_ptr>)
(modelo de função)
[ is_always_lock_free](<#/doc/atomic/atomic/is_always_lock_free>)[static] (C++17) | indica que o tipo é sempre lock-free
(constante membro estática pública)