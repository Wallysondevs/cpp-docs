# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, usando hint como uma sugestão de onde o elemento deve ser inserido. 

Os construtores da chave e do valor mapeado são chamados com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_set/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_set/bucket_count>), um rehashing ocorre.  
Se um rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. 

### Parâmetros

hint  |  \-  |  iterator, usado como uma sugestão de onde inserir o novo elemento   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido, ou para o elemento que impediu a inserção. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexidade

Constante amortizada em média, no pior caso linear no tamanho do container. 

### Exemplo

Run this code
```
    #include <chrono>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <unordered_set>
     
    const int n_operations = 100'500'0;
     
    std::size_t set_emplace()
    {
        std::unordered_set<int> set;
        for (int i = 0; i < n_operations; ++i)
            set.emplace(i);
        return set.size();
    }
     
    std::size_t set_emplace_hint()
    {
        std::unordered_set<int> set;
        auto it = set.begin();
        for (int i = 0; i < n_operations; ++i)
        {
            set.emplace_hint(it, i);
            it = set.end();
        }
        return set.size();
    }
     
    std::size_t set_emplace_hint_wrong()
    {
        std::unordered_set<int> set;
        auto it = set.begin();
        for (int i = n_operations; i > 0; --i)
        {
            set.emplace_hint(it, i);
            it = set.end();
        }
        return set.size();
    }
     
    std::size_t set_emplace_hint_corrected()
    {
        std::unordered_set<int> set;
        auto it = set.begin();
        for (int i = n_operations; i > 0; --i)
        {
            set.emplace_hint(it, i);
            it = set.begin();
        }
        return set.size();
    }
     
    std::size_t set_emplace_hint_closest()
    {
        std::unordered_set<int> set;
        auto it = set.begin();
        for (int i = 0; i < n_operations; ++i)
            it = set.emplace_hint(it, i);
        return set.size();
    }
     
    double time_it(std::function<std::size_t()> set_test,
                   const char* what = nullptr,
                   double ratio = 0.0)
    {
        const auto start = std::chrono::system_clock::now();
        const std::size_t setsize = set_test();
        const auto stop = std::chrono::system_clock::now();
        const std::chrono::duration<double, std::milli> time = stop - start;
        if (what != nullptr && setsize > 0)
            std::cout << std::setw(8) << time << " for " << what << " (ratio: "
                      << (ratio == 0.0 ? 1.0 : ratio / time.count()) << ")\n";
        return time.count();
    }
     
    int main()
    {
        std::cout << std::fixed << std::setprecision(2);
        time_it(set_emplace); // cache warmup
        const auto x = time_it(set_emplace, "plain emplace");
        time_it(set_emplace_hint, "emplace with correct hint", x);
        time_it(set_emplace_hint_wrong, "emplace with wrong hint", x);
        time_it(set_emplace_hint_corrected, "corrected emplace", x);
        time_it(set_emplace_hint_closest, "emplace using returned iterator", x);
    }
```

Saída possível: 
```
    146.88ms for plain emplace (ratio: 1.00)
    168.20ms for emplace with correct hint (ratio: 0.87)
    168.78ms for emplace with wrong hint (ratio: 0.87)
    166.58ms for corrected emplace (ratio: 0.88)
    168.27ms for emplace using returned iterator (ratio: 0.87)
```

### Ver também

[ emplace](<#/doc/container/unordered_set/emplace>) | constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/unordered_set/insert>) | insere elementos ou nós(desde C++17)   
(função membro pública)