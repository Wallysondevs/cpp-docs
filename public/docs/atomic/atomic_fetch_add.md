# std::atomic_fetch_add, std::atomic_fetch_add_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_fetch_add( std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg ) noexcept;
template< class T >
T atomic_fetch_add( volatile std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg ) noexcept;
template< class T >
T atomic_fetch_add_explicit( std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg,
std::memory_order order ) noexcept;
template< class T >
T atomic_fetch_add_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg,
std::memory_order order ) noexcept;
```

Realiza adição atômica. Adiciona atomicamente `arg` ao valor apontado por `obj` e retorna o valor que `obj` continha anteriormente. A operação é realizada como se o seguinte fosse executado:

1,2) obj->fetch_add(arg)

3,4) obj->fetch_add(arg, order)

Se `std::atomic<T>` não possui o membro `fetch_add` (este membro é fornecido apenas para tipos [integrais](<#/doc/atomic/atomic>), [de ponto flutuante](<#/doc/atomic/atomic>)(desde C++20) e [ponteiro](<#/doc/atomic/atomic>), exceto `bool`), o programa é malformado.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser modificado
- **arg** — o valor a ser adicionado ao valor armazenado no objeto atômico
- **order** — a ordenação de sincronização de memória

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de `*obj`.

### Exemplo

Um lock de escritor único/múltiplos leitores pode ser feito com `std::atomic_fetch_add`. Note que esta implementação simplista não é livre de inanição.

Execute este código
```cpp
    #include <atomic>
    #include <chrono>
    #include <iostream>
    #include <string>
    #include <thread>
    #include <vector>
    
    using namespace std::chrono_literals;
    
    // significado de cnt:
    //  5: leitores e escritor estão em corrida. Não há leitores ou escritores ativos.
    //  4...0: há 1...5 leitores ativos, O escritor está bloqueado.
    // -1: o escritor venceu a corrida e os leitores estão bloqueados.
    
    const int N = 5; // quatro leitores concorrentes são permitidos
    std::atomic<int> cnt(N);
    
    std::vector<int> data;
    
    void reader(int id)
    {
        for (;;)
        {
            // lock
            while (std::atomic_fetch_sub(&cnt, 1) <= 0)
                std::atomic_fetch_add(&cnt, 1);
    
            // leitura
            if (!data.empty())
                std::cout << ("reader " + std::to_string(id) +
                              " sees " + std::to_string(*data.rbegin()) + '\n');
            if (data.size() == 25)
                break;
    
            // unlock
            std::atomic_fetch_add(&cnt, 1);
    
            // pausa
            std::this_thread::sleep_for(1ms);
        }
    }
    
    void writer()
    {
        for (int n = 0; n < 25; ++n)
        {
            // lock
            while (std::atomic_fetch_sub(&cnt, N + 1) != N)
                std::atomic_fetch_add(&cnt, N + 1);
    
            // escrita
            data.push_back(n);
            std::cout << "writer pushed back " << n << '\n';
    
            // unlock
            std::atomic_fetch_add(&cnt, N + 1);
    
            // pausa
            std::this_thread::sleep_for(1ms);
        }
    }
    
    int main()
    {
        std::vector<std::thread> v;
        for (int n = 0; n < N; ++n)
            v.emplace_back(reader, n);
        v.emplace_back(writer);
    
        for (auto& t : v)
            t.join();
    }
```

Saída:
```
    writer pushed back 0
    reader 2 sees 0
    reader 3 sees 0
    reader 1 sees 0
    <...>
    reader 2 sees 24
    reader 4 sees 24
    reader 1 sees 24
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência exata de tipo era exigida porque `T` era deduzido de múltiplos argumentos | `T` é deduzido apenas de `obj`

### Veja também

[ fetch_add](<#/doc/atomic/atomic/fetch_add>) | adiciona atomicamente o argumento ao valor armazenado no objeto atômico e obtém o valor contido anteriormente
(função membro pública de `std::atomic<T>`)
[ atomic_fetch_subatomic_fetch_sub_explicit](<#/doc/atomic/atomic_fetch_sub>)(C++11)(C++11) | subtrai um valor não atômico de um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[Documentação C](<#/>) para atomic_fetch_add, atomic_fetch_add_explicit