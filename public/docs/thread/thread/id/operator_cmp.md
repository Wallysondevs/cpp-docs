# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::thread::id)

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
bool operator==( std::thread::id lhs, std::thread::id rhs ) noexcept;
bool operator!=( std::thread::id lhs, std::thread::id rhs ) noexcept;
(ate C++20)
bool operator< ( std::thread::id lhs, std::thread::id rhs ) noexcept;
(ate C++20)
bool operator<=( std::thread::id lhs, std::thread::id rhs ) noexcept;
(ate C++20)
bool operator> ( std::thread::id lhs, std::thread::id rhs ) noexcept;
(ate C++20)
bool operator>=( std::thread::id lhs, std::thread::id rhs ) noexcept;
(ate C++20)
std::strong_ordering operator<=>( std::thread::id lhs,
std::thread::id rhs ) noexcept;
```

Compara dois identificadores de thread.

1,2) Verifica se `lhs` e `rhs` representam a mesma thread, ou nenhuma thread.

3-7) Compara `lhs` e `rhs` em uma ordenação total não especificada.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de `operator<=>` e `operator==`, respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — identificadores de thread para comparar

### Valor de retorno

1-6) `true` se a relação correspondente for verdadeira, `false` caso contrário.

7) `std::strong_ordering::less` se `lhs` for menor que `rhs` na ordenação total; caso contrário, `std::strong_ordering::greater` se `rhs` for menor que `lhs` na ordenação total; caso contrário, `std::strong_ordering::equal`.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    #include <iostream>
    #include <thread>
    
    
    int main()
    {
        auto work = [] { std::this_thread::sleep_for(std::chrono::seconds(1)); };
        std::thread t1(work);
        std::thread t2(work);
    
        assert(t1.get_id() == t1.get_id() and
               t2.get_id() == t2.get_id() and
               t1.get_id() != t2.get_id());
    
        if (const auto cmp = t1.get_id() <=> t2.get_id(); cmp < 0)
            std::cout << "id1 < id2\n";
        else
            std::cout << "id1 > id2\n";
    
        std::cout << "id1: " << t1.get_id() << "\n"
                     "id2: " << t2.get_id() << '\n';
    
        t1.join();
        t2.join();
    }
```

Saída possível:
```
    id1 > id2
    id1: 139741717640896
    id2: 139741709248192
```

### Veja também

[Documentação C](<#/>) para `thrd_equal`
---