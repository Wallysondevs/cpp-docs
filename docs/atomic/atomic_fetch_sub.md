# std::atomic_fetch_sub, std::atomic_fetch_sub_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T atomic_fetch_sub( std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg ) noexcept;
template< class T >
T atomic_fetch_sub( volatile std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg ) noexcept;
template< class T >
T atomic_fetch_sub_explicit( std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg,
std::memory_order order ) noexcept;
template< class T >
T atomic_fetch_sub_explicit( volatile std::atomic<T>* obj,
typename std::atomic<T>::difference_type arg,
std::memory_order order ) noexcept;
```

Realiza subtração atômica. Subtrai atomicamente `arg` do valor apontado por `obj` e retorna o valor que `obj` continha anteriormente. A operação é realizada como se o seguinte fosse executado:

1,2) obj->fetch_sub(arg)

3,4) obj->fetch_sub(arg, order)

Se `std::atomic<T>` não tiver um membro `fetch_sub` (este membro é fornecido apenas para tipos [integrais](<#/doc/atomic/atomic>), de [ponto flutuante](<#/doc/atomic/atomic>)(desde C++20) e de [ponteiro](<#/doc/atomic/atomic>), exceto bool), o programa é malformado.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser modificado
- **arg** — o valor a ser subtraído do valor armazenado no objeto atômico
- **order** — a ordenação de sincronização de memória

### Valor de retorno

O valor imediatamente anterior aos efeitos desta função na [ordem de modificação](<#/doc/atomic/memory_order>) de `*obj`.

### Exemplo

Múltiplas threads podem usar `std::atomic_fetch_sub` para processar concorrentemente um container indexado.

Execute este código
```
    #include <atomic>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <thread>
    #include <vector>
    
    const int N = 50;
    std::atomic<int> cnt;
    std::vector<int> data(N);
    
    void reader(int id)
    {
        for (;;)
        {
            int idx = atomic_fetch_sub_explicit(&cnt, 1, std::memory_order_relaxed);
            if (idx >= 0)
                std::cout << "reader " << std::to_string(id) << " processed item "
                          << std::to_string(data[idx]) << '\n';
            else
            {
                std::cout << "reader " << std::to_string(id) << " done\n";
                break;
            }
        }
    }
    
    int main()
    {
        std::iota(data.begin(), data.end(), 1);
        cnt = data.size() - 1;
    
        std::vector<std::thread> v;
        for (int n = 0; n < 5; ++n)
            v.emplace_back(reader, n);
        for (auto& t : v)
            t.join();
    }
```

Saída:
```
    reader 2 processed item 50
    reader 1 processed item 44
    reader 4 processed item 46
    <....>
    reader 0 done
    reader 4 done
    reader 3 done
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência exata de tipo era exigida porque `T` era deduzido de múltiplos argumentos | `T` é deduzido apenas de `obj`

### Veja também

[ fetch_sub](<#/doc/atomic/atomic/fetch_sub>) | subtrai atomicamente o argumento do valor armazenado no objeto atômico e obtém o valor mantido anteriormente
(função membro pública de `std::atomic<T>`)
[ atomic_fetch_addatomic_fetch_add_explicit](<#/doc/atomic/atomic_fetch_add>)(C++11)(C++11) | adiciona um valor não atômico a um objeto atômico e obtém o valor anterior do atômico
(modelo de função)
[Documentação C](<#/>) para atomic_fetch_sub, atomic_fetch_sub_explicit