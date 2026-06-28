# std::pmr::monotonic_buffer_resource

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
class monotonic_buffer_resource : public std::pmr::memory_resource;
```

A classe `std::pmr::monotonic_buffer_resource` é uma classe de recurso de memória de propósito especial que libera a memória alocada apenas quando o recurso é destruído. Ela é destinada a alocações de memória muito rápidas em situações onde a memória é usada para construir alguns objetos e então é liberada de uma só vez.

`monotonic_buffer_resource` pode ser construída com um buffer inicial. Se não houver um buffer inicial, ou se o buffer estiver esgotado, buffers adicionais são obtidos de um _recurso de memória upstream_ fornecido na construção. O tamanho dos buffers obtidos segue uma progressão geométrica.

`monotonic_buffer_resource` não é thread-safe.

### Funções membro

[ (construtor)](<#/doc/memory/monotonic_buffer_resource/monotonic_buffer_resource>) | constrói um `monotonic_buffer_resource`
(função membro pública)
[ (destrutor)](<#/doc/memory/monotonic_buffer_resource/~monotonic_buffer_resource>)[virtual] | destrói um `monotonic_buffer_resource`, liberando toda a memória alocada
(função membro pública virtual)
operator=[deleted] | o operador de atribuição de cópia é deletado. `monotonic_buffer_resource` não é copiável por atribuição
(função membro pública)

##### Funções membro públicas

[ release](<#/doc/memory/monotonic_buffer_resource/release>) | libera toda a memória alocada
(função membro pública)
[ upstream_resource](<#/doc/memory/monotonic_buffer_resource/upstream_resource>) | retorna um ponteiro para o recurso de memória upstream
(função membro pública)

##### Funções membro protegidas

[ do_allocate](<#/doc/memory/monotonic_buffer_resource/do_allocate>)[virtual] | aloca memória
(função membro protegida virtual)
[ do_deallocate](<#/doc/memory/monotonic_buffer_resource/do_deallocate>)[virtual] | no-op
(função membro protegida virtual)
[ do_is_equal](<#/doc/memory/monotonic_buffer_resource/do_is_equal>)[virtual] | compara por igualdade com outro [std::pmr::memory_resource](<#/doc/memory/memory_resource>)
(função membro protegida virtual)

### Exemplo

O programa mede o tempo de criação de grandes listas duplamente encadeadas usando os seguintes alocadores:

*   alocador padrão default,
*   alocador `pmr` default,
*   alocador `pmr` com recurso monotônico, mas sem buffer de memória explícito,
*   alocador `pmr` com recurso monotônico e buffer de memória externo (na stack).

Execute este código
```cpp
    #include <array>
    #include <chrono>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <list>
    #include <memory_resource>
    
    template<typename Func>
    auto benchmark(Func test_func, int iterations)
    {
        const auto start = std::chrono::system_clock::now();
        while (iterations-- > 0)
            test_func();
        const auto stop = std::chrono::system_clock::now();
        const auto secs = std::chrono::duration<double>(stop - start);
        return secs.count();
    }
    
    int main()
    {
        constexpr int iterations{100};
        constexpr int total_nodes{2'00'000};
    
        auto default_std_alloc = [total_nodes]
        {
            std::list<int> list;
            for (int i{}; i != total_nodes; ++i)
                list.push_back(i);
        };
    
        auto default_pmr_alloc = [total_nodes]
        {
            std::pmr::list<int> list;
            for (int i{}; i != total_nodes; ++i)
                list.push_back(i);
        };
    
        auto pmr_alloc_no_buf = [total_nodes]
        {
            std::pmr::monotonic_buffer_resource mbr;
            std::pmr::polymorphic_allocator<int> pa{&mbr};
            std::pmr::list<int> list{pa};
            for (int i{}; i != total_nodes; ++i)
                list.push_back(i);
        };
    
        auto pmr_alloc_and_buf = [total_nodes]
        {
            std::array<std::byte, total_nodes * 32> buffer; // enough to fit in all nodes
            std::pmr::monotonic_buffer_resource mbr{buffer.data(), buffer.size()};
            std::pmr::polymorphic_allocator<int> pa{&mbr};
            std::pmr::list<int> list{pa};
            for (int i{}; i != total_nodes; ++i)
                list.push_back(i);
        };
    
        const double t1 = benchmark(default_std_alloc, iterations);
        const double t2 = benchmark(default_pmr_alloc, iterations);
        const double t3 = benchmark(pmr_alloc_no_buf , iterations);
        const double t4 = benchmark(pmr_alloc_and_buf, iterations);
    
        std::cout << std::fixed << std::setprecision(3)
                  << "t1 (default std alloc): " << t1 << " sec; t1/t1: " << t1/t1 << '\n'
                  << "t2 (default pmr alloc): " << t2 << " sec; t1/t2: " << t1/t2 << '\n'
                  << "t3 (pmr alloc  no buf): " << t3 << " sec; t1/t3: " << t1/t3 << '\n'
                  << "t4 (pmr alloc and buf): " << t4 << " sec; t1/t4: " << t1/t4 << '\n';
    }
```

Saída possível:
```
    t1 (default std alloc): 0.720 sec; t1/t1: 1.000
    t2 (default pmr alloc): 0.915 sec; t1/t2: 0.787
    t3 (pmr alloc  no buf): 0.370 sec; t1/t3: 1.945
    t4 (pmr alloc and buf): 0.247 sec; t1/t4: 2.914
```
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão