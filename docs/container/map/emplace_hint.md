# std::map&lt;Key,T,Compare,Allocator&gt;::emplace_hint

```cpp
template< class... Args >
iterator emplace_hint( const_iterator hint, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container o mais próximo possível da posição imediatamente anterior a hint. 

O construtor do tipo do elemento (`value_type`, ou seja, [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;) é chamado com exatamente os mesmos argumentos fornecidos à função, encaminhados com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

Nenhum iterator ou referência é invalidado. 

### Parâmetros

hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido, ou para o elemento que impediu a inserção. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexidade

Logarítmica no tamanho do container em geral, mas constante amortizada se o novo elemento for inserido imediatamente antes de hint. 

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <cstddef>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <map>
     
    const int n_operations = 100'500'0;
     
    std::size_t map_emplace()
    {
        std::map<int, char> map;
        for (int i = 0; i < n_operations; ++i)
            map.emplace(i, 'a');
        return map.size();
    }
     
    std::size_t map_emplace_hint()
    {
        std::map<int, char> map;
        auto it = map.begin();
        for (int i = 0; i < n_operations; ++i)
        {
            map.emplace_hint(it, i, 'b');
            it = map.end();
        }
        return map.size();
    }
     
    std::size_t map_emplace_hint_wrong()
    {
        std::map<int, char> map;
        auto it = map.begin();
        for (int i = n_operations; i > 0; --i)
        {
            map.emplace_hint(it, i, 'c');
            it = map.end();
        }
        return map.size();
    }
     
    std::size_t map_emplace_hint_corrected()
    {
        std::map<int, char> map;
        auto it = map.begin();
        for (int i = n_operations; i > 0; --i)
        {
            map.emplace_hint(it, i, 'd');
            it = map.begin();
        }
        return map.size();
    }
     
    std::size_t map_emplace_hint_closest()
    {
        std::map<int, char> map;
        auto it = map.begin();
        for (int i = 0; i < n_operations; ++i)
            it = map.emplace_hint(it, i, 'e');
        return map.size();
    }
     
    double time_it(std::function<std::size_t()> map_test,
                   std::string what = "", double ratio = 0.0)
    {
        const auto start = std::chrono::system_clock::now();
        const std::size_t map_size = map_test();
        const auto stop = std::chrono::system_clock::now();
        std::chrono::duration<double, std::milli> time = stop - start;
        if (what.size() && map_size)
            std::cout << std::setw(8) << time << " for " << what << " (ratio: "
                      << (ratio == 0.0 ? 1.0 : ratio / time.count()) << ")\n";
        return time.count();
    }
     
    int main()
    {
        std::cout << std::fixed << std::setprecision(2);
        time_it(map_emplace); // cache warmup
        const auto x = time_it(map_emplace, "plain emplace");
        time_it(map_emplace_hint, "emplace with correct hint", x);
        time_it(map_emplace_hint_wrong, "emplace with wrong hint", x);
        time_it(map_emplace_hint_corrected, "corrected emplace", x);
        time_it(map_emplace_hint_closest, "emplace using returned iterator", x);
    }
```

Saída possível: 
```
    365.08ms for plain emplace (ratio: 1.00)
     96.54ms for emplace with correct hint (ratio: 3.78)
    409.40ms for emplace with wrong hint (ratio: 0.89)
     85.57ms for corrected emplace (ratio: 4.27)
     84.31ms for emplace using returned iterator (ratio: 4.33)
```

### Veja também

[ emplace](<#/doc/container/map/emplace>)(C++11) | constrói o elemento no local   
(função membro pública)  
[ insert](<#/doc/container/map/insert>) | insere elementos ou nós(desde C++17)   
(função membro pública)